import { useTranslation } from "../../i18n";
import { supportsMessengerIsland } from "../../utils/platform";
import { QQNotificationPanel, type QQNotificationsController } from "./qq-notifications/QQNotifications";
import { WeChatReminderPanel, type WeChatRemindersController } from "./wechat/WeChatReminders";
import { MessageSourceIcon } from "./MessageSourceIcon";
import { mailBadgeCount, type MessageSource } from "./messagePreview";

export type MessageView = MessageSource;

type MessagesProps = {
  qqNotifications: QQNotificationsController;
  wechatReminders: WeChatRemindersController;
  source: MessageView;
  onSourceChange: (source: MessageView) => void;
};

export function messagePanelHeight(_source: MessageView, _readingMail = false) {
  return 350;
}

export function MessagesPanel({ qqNotifications, wechatReminders, source, onSourceChange }: MessagesProps) {
  const t = useTranslation();
  const { snapshot: qq } = qqNotifications;
  const messengersEnabled = supportsMessengerIsland();
  const navigate = (next: MessageView) => onSourceChange(next);

  if (!messengersEnabled) {
    return (
      <section className="qq-panel" aria-label={t.messages.title}>
        <div className="qq-panel__empty" role="status">
          <span>{t.qq.desktopOnly}</span>
        </div>
      </section>
    );
  }

  const navigation = (
    <div className="message-sources" role="group" aria-label={t.messages.sources}>
      <button type="button" aria-label={t.messages.qqNotifications} aria-pressed={source === "qq"} onClick={() => navigate("qq")}><MessageSourceIcon source="qq" /><span>QQ</span>{qq.items.length > 0 && <span className="message-source-count">{mailBadgeCount(qq.items.length)}</span>}</button>
      <button type="button" aria-label={t.messages.wechatReminders} aria-pressed={source === "wechat"} onClick={() => navigate("wechat")}><MessageSourceIcon source="wechat" /><span>{t.messages.wechat}</span>{wechatReminders.snapshot.pending && <span className="message-source-dot" aria-label={t.messages.newReminder} />}</button>
    </div>
  );

  if (source === "wechat") return <WeChatReminderPanel controller={wechatReminders} navigation={navigation} />;
  return <QQNotificationPanel controller={qqNotifications} navigation={navigation} />;
}
