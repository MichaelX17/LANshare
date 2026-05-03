"use client";

import { UploadModal } from "./UploadModal";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

const THEME_STORAGE_KEY = "ui-theme";

type Theme = "light" | "dark";

export function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const { locale, dictionary, toggleLocale } = useI18n();

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme: Theme = prefersDark ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-outline-variant/80 bg-surface-container-lowest/72 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 sm:gap-6">
          <div className="flex min-w-0 items-center gap-4 sm:gap-8">
            <div className="inline-flex min-w-0 items-center gap-3 rounded-full border border-outline-variant/70 bg-surface-container-low px-3 py-1.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
                <span className="material-symbols-outlined text-[18px]">bolt</span>
              </span>
              <span className="truncate text-base font-h3 text-on-surface sm:text-lg">{dictionary.header.appName}</span>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#" className="border-b-2 border-primary py-1 font-button text-button text-primary">
                {dictionary.header.allFiles}
              </a>
              <a href="#" className="rounded px-2 py-1 font-button text-button text-on-surface-variant transition-colors hover:bg-surface-container-low">
                {dictionary.common.recent}
              </a>
              <a href="#" className="rounded px-2 py-1 font-button text-button text-on-surface-variant transition-colors hover:bg-surface-container-low">
                {dictionary.common.shared}
              </a>
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2.5 font-button text-button text-on-primary shadow-lg shadow-primary/25 transition-transform duration-150 active:scale-95 sm:px-4"
            >
              <span className="material-symbols-outlined text-[20px]">upload</span>
              <span className="hidden sm:inline">{dictionary.common.uploadFile}</span>
              <span className="sm:hidden">{dictionary.header.uploadShort}</span>
            </button>

            <div className="flex gap-2">
              <button
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 rounded-full border border-outline-variant/70 bg-surface-container-low px-3 py-2 text-on-surface-variant transition-colors hover:bg-surface-container"
                aria-label={dictionary.header.theme}
                title={theme === "dark" ? dictionary.header.changeThemeToLight : dictionary.header.changeThemeToDark}
              >
                <span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span>
                <span className="hidden text-xs font-button sm:inline">{dictionary.header.theme}</span>
              </button>
              <button
                onClick={toggleLocale}
                className="inline-flex items-center gap-1 rounded-full border border-outline-variant/70 bg-surface-container-low px-3 py-2 text-on-surface-variant transition-colors hover:bg-surface-container"
                aria-label={dictionary.header.changeLanguage}
                title={locale === "es-ES" ? dictionary.header.changeLanguageToEnglish : dictionary.header.changeLanguageToSpanish}
              >
                <span className="material-symbols-outlined">translate</span>
                <span className="text-xs font-button">{locale === "es-ES" ? "ES" : "EN"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <UploadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}