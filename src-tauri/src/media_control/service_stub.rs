//! Non-Windows media stub: SMTC / WASAPI are Windows-only.
//! Commands still succeed so the music panel can render an empty state.

use serde::Serialize;
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct MediaSessionInfo {
    pub(super) id: String,
    pub(super) label: String,
    pub(super) playing: bool,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct MediaState {
    pub(super) available: bool,
    pub(super) audio_active: bool,
    pub(super) audio_peak: f32,
    pub(super) playback_status: &'static str,
    pub(super) title: Option<String>,
    pub(super) artist: Option<String>,
    pub(super) album: Option<String>,
    pub(super) thumbnail: Option<String>,
    pub(super) position_ms: i64,
    pub(super) duration_ms: i64,
    pub(super) can_seek: bool,
    pub(super) can_next: bool,
    pub(super) can_previous: bool,
    pub(super) shuffle_active: Option<bool>,
    pub(super) can_shuffle: bool,
    pub(super) repeat_mode: &'static str,
    pub(super) can_repeat: bool,
    pub(super) volume: f32,
    pub(super) source_app: Option<String>,
    pub(super) active_session_id: Option<String>,
    pub(super) sessions: Vec<MediaSessionInfo>,
    pub(super) updated_at: i64,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct AudioLevel {
    pub(super) active: bool,
    pub(super) peak: f32,
    pub(super) updated_at: i64,
}

#[derive(Clone, Copy)]
pub(crate) enum MediaCommand {
    PlayPause,
    Next,
    Previous,
    ToggleShuffle,
    CycleRepeat,
}

fn now_ms() -> i64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|duration| duration.as_millis() as i64)
        .unwrap_or_default()
}

fn empty_state() -> MediaState {
    MediaState {
        available: false,
        audio_active: false,
        audio_peak: 0.0,
        playback_status: "unavailable",
        title: None,
        artist: None,
        album: None,
        thumbnail: None,
        position_ms: 0,
        duration_ms: 0,
        can_seek: false,
        can_next: false,
        can_previous: false,
        shuffle_active: None,
        can_shuffle: false,
        repeat_mode: "off",
        can_repeat: false,
        volume: 0.0,
        source_app: None,
        active_session_id: None,
        sessions: Vec::new(),
        updated_at: now_ms(),
    }
}

pub(crate) fn get_state(_target: Option<String>) -> Result<MediaState, String> {
    Ok(empty_state())
}

pub(crate) fn get_audio_level() -> Result<AudioLevel, String> {
    Ok(AudioLevel {
        active: false,
        peak: 0.0,
        updated_at: now_ms(),
    })
}

pub(crate) fn run_command(
    _command: MediaCommand,
    _target: Option<String>,
) -> Result<MediaState, String> {
    Ok(empty_state())
}

pub(crate) fn seek(_position_ms: i64, _target: Option<String>) -> Result<MediaState, String> {
    Ok(empty_state())
}

pub(crate) fn set_volume(_level: f32) -> Result<MediaState, String> {
    Ok(empty_state())
}
