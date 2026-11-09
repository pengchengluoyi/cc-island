import zhCN from "../../i18n/locales/zh-CN.ts";
import type { Translations } from "../../i18n/types";

export type MessageSource = "qq" | "wechat";

export type MessagePreview = {
  source: MessageSource;
  title: string;
  body: string;
  receivedAt: number;
};

export const MESSAGE_SOURCE_LABELS: Record<MessageSource, string> = {
  qq: zhCN.messages.sourceLabels.qq,
  wechat: zhCN.messages.sourceLabels.wechat,
};

export function messagePreviewText(preview: MessagePreview, copy: Translations["messages"] = zhCN.messages): string {
  if (preview.source === "wechat") return copy.wechatPreview;
  return copy.qqPreview(preview.title.trim() || "QQ", preview.body.trim() || copy.newMessage);
}

export function latestMessagePreview(candidates: (MessagePreview | null)[], latestReceivedAt = -Infinity): MessagePreview | null {
  return candidates.reduce<MessagePreview | null>(
    (latest, candidate) => candidate && candidate.receivedAt >= latestReceivedAt
      && (!latest || candidate.receivedAt > latest.receivedAt) ? candidate : latest,
    null,
  );
}

export function mailBadgeCount(count: number): string {
  return count > 99 ? "99+" : String(count);
}
