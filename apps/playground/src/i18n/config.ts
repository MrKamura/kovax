import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import ru from "../locales/ru.json";

const STORAGE_KEY = "kovax-playground-lang";

function storedLanguage(): string {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "ru" || saved === "en" ? saved : "en";
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: storedLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

function persistLanguage(lng: string) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lng;
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    /* ignore quota / private mode */
  }
}

persistLanguage(i18n.language);

i18n.on("languageChanged", (lng) => {
  persistLanguage(lng);
});

export default i18n;
