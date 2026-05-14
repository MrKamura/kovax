import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { ThemeProvider, ToastProvider } from "kovax-react";
import "react-day-picker/style.css";
import "./i18n/config";
import i18n from "./i18n/config";
import App from "./App";
import "./doc-shell.css";
import { parsePathname } from "./routing/siteRoutes";

const base =
  typeof import.meta.env.BASE_URL === "string" && import.meta.env.BASE_URL.length > 0
    ? import.meta.env.BASE_URL
    : "/";

const initial = parsePathname(window.location.pathname, base);

void i18n.changeLanguage(initial.lang).then(() => {
  const el = document.getElementById("root")!;
  const tree = (
    <StrictMode>
      <ThemeProvider defaultColorMode="system">
        <ToastProvider>
          <App />
        </ToastProvider>
      </ThemeProvider>
    </StrictMode>
  );

  if (el.hasChildNodes()) {
    hydrateRoot(el, tree);
  } else {
    createRoot(el).render(tree);
  }
});
