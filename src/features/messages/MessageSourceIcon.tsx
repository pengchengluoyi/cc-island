import qqIcon from "../../assets/brands/qq.png";
import wechatIcon from "../../assets/brands/wechat.png";
import type { MessageSource } from "./messagePreview";
import "./MessageSourceIcon.css";

const ICONS: Record<MessageSource, string> = {
  qq: qqIcon,
  wechat: wechatIcon,
};

type MessageSourceIconProps = {
  source: MessageSource;
  size?: number;
};

export function MessageSourceIcon({ source, size = 18 }: MessageSourceIconProps) {
  return (
    <img
      className="message-source-icon"
      src={ICONS[source]}
      alt=""
      width={size}
      height={size}
      draggable={false}
    />
  );
}
