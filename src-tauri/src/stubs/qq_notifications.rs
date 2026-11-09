//! macOS / non-Windows stub for QQ system notifications.
//! The Windows implementation uses UserNotificationListener and is not portable.

use serde::Serialize;
use serde_json::{json, Value};
use tauri::AppHandle;

#[derive(Clone, Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct QQNotification {
    id: String,
    title: String,
    body: String,
    created_at: i64,
}

#[derive(Clone, Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub enum NotificationStatus {
    Disabled,
    Waiting,
    Listening,
    PermissionDenied,
    PermissionRequired,
    Error,
}

#[derive(Clone, Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct NotificationSnapshot {
    revision: u64,
    enabled: bool,
    status: NotificationStatus,
    items: Vec<QQNotification>,
    error: Option<String>,
}

impl Default for NotificationSnapshot {
    fn default() -> Self {
        Self {
            revision: 0,
            enabled: false,
            status: NotificationStatus::Disabled,
            items: Vec::new(),
            error: Some("QQ notifications are not available on this platform.".into()),
        }
    }
}

pub fn init(_app: &AppHandle) -> Result<(), String> {
    Ok(())
}

#[tauri::command]
pub fn get_qq_notification_state() -> Result<NotificationSnapshot, String> {
    Ok(NotificationSnapshot::default())
}

#[tauri::command]
pub fn set_qq_notifications_enabled(_enabled: bool) -> Result<NotificationSnapshot, String> {
    Ok(NotificationSnapshot::default())
}

#[tauri::command]
pub fn clear_qq_notifications() -> Result<NotificationSnapshot, String> {
    Ok(NotificationSnapshot::default())
}

#[tauri::command]
pub async fn request_qq_notification_access(_app: AppHandle) -> Result<String, String> {
    Ok("denied".into())
}

#[tauri::command]
pub fn open_qq_notification_settings(_app: AppHandle, _access: bool) -> Result<(), String> {
    Err("QQ notification settings are not available on this platform.".into())
}

#[tauri::command]
pub async fn open_qq() -> Result<(), String> {
    Err("Opening QQ from fly-island is not supported on this platform.".into())
}

pub(crate) fn diagnostic_state() -> Result<Value, String> {
    Ok(json!({
        "enabled": false,
        "status": "disabled",
        "error": "unsupported-platform",
        "itemCount": 0,
    }))
}
