//! Launch at startup: Windows Run key, or a macOS LaunchAgent plist.

#[cfg(windows)]
mod windows_impl {
    use std::{os::windows::process::CommandExt, process::Command};

    use super::super::CREATE_NO_WINDOW;

    pub(super) const STARTUP_REGISTRY_KEY: &str =
        r"HKCU\Software\Microsoft\Windows\CurrentVersion\Run";
    pub(super) const STARTUP_REGISTRY_VALUE: &str = "FocuSD Island";

    pub fn get_launch_at_startup() -> Result<bool, String> {
        let mut command = Command::new("reg");
        let status = command
            .creation_flags(CREATE_NO_WINDOW)
            .args(["query", STARTUP_REGISTRY_KEY, "/v", STARTUP_REGISTRY_VALUE])
            .status()
            .map_err(|error| format!("Failed to query startup registry: {error}"))?;

        Ok(status.success())
    }

    pub fn set_launch_at_startup(enabled: bool) -> Result<(), String> {
        let status = if enabled {
            let current_exe = std::env::current_exe()
                .map_err(|error| format!("Failed to resolve current executable: {error}"))?;
            let startup_value = format!("\"{}\"", current_exe.display());

            let mut command = Command::new("reg");
            command
                .creation_flags(CREATE_NO_WINDOW)
                .args([
                    "add",
                    STARTUP_REGISTRY_KEY,
                    "/v",
                    STARTUP_REGISTRY_VALUE,
                    "/t",
                    "REG_SZ",
                    "/d",
                ])
                .arg(startup_value)
                .arg("/f")
                .status()
        } else {
            let mut command = Command::new("reg");
            command
                .creation_flags(CREATE_NO_WINDOW)
                .args([
                    "delete",
                    STARTUP_REGISTRY_KEY,
                    "/v",
                    STARTUP_REGISTRY_VALUE,
                    "/f",
                ])
                .status()
        }
        .map_err(|error| format!("Failed to update startup registry: {error}"))?;

        if status.success() {
            Ok(())
        } else {
            Err("Startup registry command failed.".to_string())
        }
    }
}

#[cfg(target_os = "macos")]
mod macos_impl {
    use std::{fs, path::PathBuf};

    const LABEL: &str = "com.focusd.island.launch-at-login";

    fn agent_plist_path() -> Result<PathBuf, String> {
        let home = crate::system::user_home_dir()?;
        Ok(home
            .join("Library")
            .join("LaunchAgents")
            .join(format!("{LABEL}.plist")))
    }

    pub fn get_launch_at_startup() -> Result<bool, String> {
        Ok(agent_plist_path()?.is_file())
    }

    pub fn set_launch_at_startup(enabled: bool) -> Result<(), String> {
        let path = agent_plist_path()?;
        if enabled {
            let current_exe = std::env::current_exe()
                .map_err(|error| format!("Failed to resolve current executable: {error}"))?;
            if let Some(parent) = path.parent() {
                fs::create_dir_all(parent).map_err(|error| {
                    format!("Failed to create LaunchAgents directory: {error}")
                })?;
            }
            let plist = format!(
                r#"<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>{LABEL}</string>
  <key>ProgramArguments</key>
  <array>
    <string>{}</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
</dict>
</plist>
"#,
                current_exe.display()
            );
            fs::write(&path, plist)
                .map_err(|error| format!("Failed to write LaunchAgent plist: {error}"))?;
        } else if path.exists() {
            fs::remove_file(&path)
                .map_err(|error| format!("Failed to remove LaunchAgent plist: {error}"))?;
        }
        Ok(())
    }
}

#[cfg(not(any(windows, target_os = "macos")))]
mod other_impl {
    pub fn get_launch_at_startup() -> Result<bool, String> {
        Ok(false)
    }

    pub fn set_launch_at_startup(_enabled: bool) -> Result<(), String> {
        Err("Launch at startup is not supported on this platform.".into())
    }
}

#[tauri::command]
pub fn get_launch_at_startup() -> Result<bool, String> {
    #[cfg(windows)]
    {
        windows_impl::get_launch_at_startup()
    }
    #[cfg(target_os = "macos")]
    {
        macos_impl::get_launch_at_startup()
    }
    #[cfg(not(any(windows, target_os = "macos")))]
    {
        other_impl::get_launch_at_startup()
    }
}

#[tauri::command]
pub fn set_launch_at_startup(enabled: bool) -> Result<(), String> {
    #[cfg(windows)]
    {
        windows_impl::set_launch_at_startup(enabled)
    }
    #[cfg(target_os = "macos")]
    {
        macos_impl::set_launch_at_startup(enabled)
    }
    #[cfg(not(any(windows, target_os = "macos")))]
    {
        other_impl::set_launch_at_startup(enabled)
    }
}
