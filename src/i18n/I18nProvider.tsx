"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, isSupportedLocale, type Dictionary, type Locale } from "./translations";

const LOCALE_STORAGE_KEY = "ui-locale";
const DEFAULT_LOCALE: Locale = "es-ES";

type I18nContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getBrowserLocale(): Locale {
  if (typeof navigator === "undefined") {
    return DEFAULT_LOCALE;
  }

  const preferred = [...navigator.languages, navigator.language]
    .filter(Boolean)
    .map((value) => value.toLowerCase());

  if (preferred.some((value) => value.startsWith("en"))) {
    return "en";
  }

  return "es-ES";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);

    if (isSupportedLocale(storedLocale)) {
      setLocaleState(storedLocale);
      return;
    }

    setLocaleState(getBrowserLocale());
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
  };

  const toggleLocale = () => {
    setLocaleState((currentLocale) => (currentLocale === "es-ES" ? "en" : "es-ES"));
  };

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dictionary: dictionaries[locale],
      setLocale,
      toggleLocale,
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }

  return context;
}
