/** Manual i18n fixture. Translation window and QQ Mail were removed. */
import { createRoot } from "react-dom/client";
import { I18nProvider } from "../src/i18n";
import { IslandApp } from "../src/windows/island/IslandApp";
import { SettingsWindow } from "../src/windows/settings/SettingsWindow";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <I18nProvider>
      <IslandApp />
      <SettingsWindow />
    </I18nProvider>,
  );
}
