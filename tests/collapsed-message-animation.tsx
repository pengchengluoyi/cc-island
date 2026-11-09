/** Fixture retained for manual visual checks; QQ Mail removed from the product. */
import { createRoot } from "react-dom/client";
import { I18nProvider } from "../src/i18n";
import { IslandApp } from "../src/windows/island/IslandApp";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <I18nProvider>
      <IslandApp />
    </I18nProvider>,
  );
}
