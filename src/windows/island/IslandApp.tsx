import { useCallback, useEffect, useMemo, useState } from "react";
import { useQQNotifications } from "../../features/messages/qq-notifications/QQNotifications";
import { useWeChatReminders } from "../../features/messages/wechat/WeChatReminders";
import { MessagesPanel, type MessageView } from "../../features/messages/Messages";
import type { MessageSource } from "../../features/messages/messagePreview";
import { useIdleTuck } from "./useIslandAutomation";
import { useTranslation } from "../../i18n";
import { TodoNotebook } from "../../features/todos/TodoNotebook";
import { openSettingsWindow } from "../settings/api";
import { getAgentStatusLabel, getAgentVisualState } from "../../features/agent-status/status";
import { useAgentStatus } from "../../features/agent-status/useAgentStatus";
import { useIslandSettings } from "../../features/appearance/useIslandSettings";
import { ClipboardHistoryPanel } from "../../features/clipboard/ClipboardHistoryPanel";
import { useClipboardHistory } from "../../features/clipboard/useClipboardHistory";
import { MusicPlayerPanel } from "../../features/media/MusicPlayerPanel";
// Imported after the page panels so its CSS keeps its place in the cascade.
import { IslandShell } from "./IslandShell";
import { useMediaState } from "../../features/media/useMediaState";
import { useTodos } from "../../features/todos/useTodos";
import { useIslandWindow } from "./useIslandWindow";
import { getExpandedIslandHeight } from "./expandedHeight";
import { getIslandStageStyle } from "./stageStyle";
import { useCollapsedTodo } from "./useCollapsedTodo";
import { useIslandKeyboard } from "./useIslandKeyboard";
import { useIslandNavigation } from "./useIslandNavigation";
import { supportsMessengerIsland } from "../../utils/platform";
// Must stay the last import: IslandApp.css overrides the feature styles above.
import "./IslandApp.css";

export function IslandApp() {
  const t = useTranslation();
  const {
    mode,
    isTucked,
    page,
    setPage,
    collapseIsland,
    tuckIsland,
    revealIsland,
    openIslandPage,
    toggleClipboardHistory,
  } = useIslandNavigation();
  const messengersEnabled = supportsMessengerIsland();
  const qqNotifications = useQQNotifications(mode === "collapsed" && !isTucked && messengersEnabled);
  const wechatReminders = useWeChatReminders(mode === "collapsed" && !isTucked && messengersEnabled);
  const [messageSource, setMessageSource] = useState<MessageView>("qq");
  const {
    mediaState,
    isMediaTrackChanging,
    mediaCommandError,
    musicSourcePriority,
    runMediaCommand,
    reorderMusicSource,
    removeMusicSource,
  } = useMediaState();
  const [musicSettingsOpen, setMusicSettingsOpen] = useState(false);
  const agentStatus = useAgentStatus();
  const [settings, setSettings] = useIslandSettings();

  const openSavePathSettings = useCallback(() => {
    openSettingsWindow("savePath");
  }, []);

  const { todos, activeTodoId, todoPageMode, notebookProps } = useTodos({
    carryOverIncompleteTodos: settings.carryOverIncompleteTodos,
    onStartTodo: collapseIsland,
    onMissingSaveDirectory: openSavePathSettings,
  });

  const { collapsedTaskTitle, collapsedTodoCount, collapsedIslandWidth } =
    useCollapsedTodo(
      todos,
      activeTodoId,
      settings,
      mode !== "collapsed" || isTucked || !settings.showCollapsedText ||
        Boolean(qqNotifications.preview || wechatReminders.previewReceivedAt !== null),
    );
  const expandedIslandHeight = getExpandedIslandHeight({
    page,
    todoPageMode,
    todos,
    musicSettingsOpen,
    hasMediaCommandError: Boolean(mediaCommandError),
    messageSource,
  });
  const stageStyle = useMemo(
    () => getIslandStageStyle(settings, mode, collapsedIslandWidth, expandedIslandHeight),
    [collapsedIslandWidth, expandedIslandHeight, mode, settings],
  );

  useIdleTuck(settings.autoTuck, settings.autoTuckSeconds, isTucked, `${mode}:${page}`, tuckIsland);

  const openMessages = useCallback((source: MessageSource) => {
    setMessageSource(source);
    openIslandPage("qq");
  }, [openIslandPage]);

  const {
    clipboardHistory,
    copyClipboardHistoryItem,
    toggleClipboardHistoryFavorite,
    updateClipboardHistoryItemNote,
    deleteClipboardHistoryItem,
    clearClipboardHistoryItems,
  } = useClipboardHistory(toggleClipboardHistory);

  useEffect(() => {
    if (page !== "music") {
      setMusicSettingsOpen(false);
    }
  }, [page]);

  const {
    isPositionDetached,
    nativeGlassState,
    minimizeIsland,
    startIslandDrag,
    resetIslandPosition,
  } = useIslandWindow({
    mode,
    isTucked,
    settings,
    setSettings,
    expandedIslandHeight,
    collapsedIslandWidth,
    onCollapse: collapseIsland,
  });

  useIslandKeyboard(
    clipboardHistory.settings.shortcutEnabled,
    clipboardHistory.settings.shortcut,
    toggleClipboardHistory,
    collapseIsland,
  );

  const agentVisualState = useMemo(
    () => getAgentVisualState(agentStatus),
    [agentStatus],
  );
  const agentStatusLabel = useMemo(
    () => getAgentStatusLabel(agentStatus, t),
    [agentStatus, t],
  );

  return (
    <main className={`stage stage--font-${settings.fontFamily}`} style={stageStyle}>
      <IslandShell
        qqNotifications={qqNotifications}
        wechatReminders={wechatReminders}
        messengersEnabled={messengersEnabled}
        onOpenMessages={openMessages}
        mode={mode}
        page={page}
        appearanceMode={settings.appearanceMode}
        nativeGlassState={nativeGlassState}
        isTucked={isTucked}
        isDetached={isPositionDetached || settings.marginY > 0}
        showTitle={settings.showTitle}
        showCollapsedText={settings.showCollapsedText}
        collapsedTaskTitle={collapsedTaskTitle}
        collapsedTodoCount={collapsedTodoCount}
        mediaState={mediaState}
        agentVisualState={agentVisualState}
        agentStatusLabel={agentStatusLabel}
        onOpenPage={openIslandPage}
        onWindowDragStart={startIslandDrag}
        onCollapse={collapseIsland}
        onResetPosition={resetIslandPosition}
        onMinimize={minimizeIsland}
        onOpenSettings={openSettingsWindow}
        onTuck={tuckIsland}
        onReveal={revealIsland}
        onPageChange={setPage}
      >
        {page === "qq" && (
          <div className="message-panel">
            <MessagesPanel qqNotifications={qqNotifications} wechatReminders={wechatReminders} source={messageSource} onSourceChange={openMessages} />
          </div>
        )}
        {page === "music" && (
          <MusicPlayerPanel
            mediaState={mediaState}
            isTrackChanging={isMediaTrackChanging}
            commandError={mediaCommandError}
            sourcePriority={musicSourcePriority}
            settingsOpen={musicSettingsOpen}
            onToggleSettings={() => setMusicSettingsOpen((open) => !open)}
            onPlayPause={() => void runMediaCommand("media_play_pause")}
            onNext={() => void runMediaCommand("media_next")}
            onPrevious={() => void runMediaCommand("media_previous")}
            onReorderSource={reorderMusicSource}
            onRemoveSource={removeMusicSource}
          />
        )}
        {page === "clipboard" && (
          <ClipboardHistoryPanel
            snapshot={clipboardHistory}
            onCopyItem={copyClipboardHistoryItem}
            onToggleFavorite={(id) => void toggleClipboardHistoryFavorite(id)}
            onUpdateNote={updateClipboardHistoryItemNote}
            onDeleteItem={(id) => void deleteClipboardHistoryItem(id)}
            onClear={() => void clearClipboardHistoryItems()}
          />
        )}
        {page === "todo" && (
          <TodoNotebook
            {...notebookProps}
            enableTodoReorder={settings.enableTodoReorder}
          />
        )}
      </IslandShell>
    </main>
  );
}
