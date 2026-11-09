/** Best-effort OS detection for UI feature gates. Prefer Tauri OS plugin later. */
export function isMacOS(): boolean {
  if (typeof navigator === "undefined") {
    return false;
  }
  const platform = navigator.platform || "";
  const ua = navigator.userAgent || "";
  return /Mac|iPhone|iPad|iPod/i.test(platform) || /Macintosh/i.test(ua);
}

/** QQ / WeChat island messaging is Windows-only in this fork. */
export function supportsMessengerIsland(): boolean {
  return !isMacOS();
}
