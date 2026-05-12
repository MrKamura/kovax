import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastProvider } from "kovax-react";
import "react-day-picker/style.css";
import "./i18n/config";
import App from "./App";
import "./doc-shell.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
);
