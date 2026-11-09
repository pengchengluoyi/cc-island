//! macOS / non-Windows stub for WeChat tray-flash reminders.
//! The Windows implementation depends on Shell Hook / HSHELL_FLASH.

use serde::Serialize;
use serde_json::{json, Value};
use tauri::AppHandle;

#[derive(Clone, Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ReminderSnapshot {
    revision: u64,
    enabled: bool,
    status: String,
    pending: bool,
    last_attention_at: Option<u64>,
    error: Option<String>,
}

impl Default for ReminderSnapshot {
    fn default() -> Self {
        Self {
            revision: 0,
            enabled: false,
            status: "disabled".into(),
            pending: false,
            last_attention_at: None,
            error: Some("WeChat reminders are not available on this platform.".into()),
        }
    }
}

pub fn init(_app: &AppHandle) -> Result<(), String> {
    Ok(())
}

#[tauri::command]
pub fn get_wechat_reminder_state() -> Result<ReminderSnapshot, String> {
    Ok(ReminderSnapshot::default())
}

#[tauri::command]
pub fn set_wechat_reminders_enabled(_enabled: bool) -> Result<ReminderSnapshot, String> {
    Ok(ReminderSnapshot::default())
}

#[tauri::command]
pub async fn open_wechat() -> Result<(), String> {
    Err("Opening WeChat from fly-island is not supported on this platform.".into())
}

pub(crate) fn diagnostic_state() -> Result<Value, String> {
    Ok(json!({
        "enabled": false,
        "status": "disabled",
        "pending": false,
        "lastAttentionAt": null,
        "error": "unsupported-platform",
    }))
}
