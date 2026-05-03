"use client";

import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { FileList } from "@/components/FileList";
import { I18nProvider, useI18n } from "@/i18n/I18nProvider";

function MainContent() {
  const { dictionary } = useI18n();

  return (
    <div className="entry-fade flex min-w-0">
      <Sidebar />
      <main className="min-w-0 flex-1 p-container-margin pb-24 md:ml-64 md:pb-container-margin">
        <div className="mx-auto max-w-6xl space-y-lg">
          <div className="grid grid-cols-1 gap-md lg:grid-cols-3">
            <div className="elevated-card relative overflow-hidden rounded-[32px] border border-outline-variant/80 bg-surface-container-lowest/85 p-5 backdrop-blur-md sm:p-lg lg:col-span-2">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(216,122,44,0.2),transparent_55%),radial-gradient(circle_at_0%_120%,rgba(30,117,154,0.24),transparent_55%)]" />

              <div className="relative z-10 min-w-0 pr-12 sm:pr-24">
                <p className="mb-2 inline-flex rounded-full border border-outline-variant/80 bg-surface-container px-3 py-1 font-label-md text-label-md text-secondary uppercase tracking-[0.12em]">
                  {dictionary.page.serverBadge}
                </p>
                <h1 className="mb-2 text-balance font-h2 text-h2 text-on-surface">{dictionary.page.heroTitle}</h1>
                <p className="max-w-xl text-pretty font-body-md text-body-md text-on-surface-variant">
                  {dictionary.page.heroDescription}
                </p>
              </div>

              <div className="pointer-events-none absolute -right-3 -bottom-5 hidden opacity-[0.12] sm:block">
                <span className="material-symbols-outlined text-[116px] lg:text-[160px]">hub</span>
              </div>
            </div>

            <div className="elevated-card flex flex-col justify-between rounded-[32px] bg-gradient-to-br from-secondary via-secondary-container to-tertiary-container p-5 text-on-primary sm:p-lg">
              <div>
                <p className="font-label-md text-label-md uppercase tracking-widest opacity-80">{dictionary.page.networkStatus}</p>
                <h3 className="mt-2 text-balance font-h3 text-h3">{dictionary.page.networkState}</h3>
              </div>
              <div className="mt-4 flex items-center gap-2 font-body-sm text-body-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="font-medium text-on-primary/90">{dictionary.page.transferEnabled}</span>
              </div>
            </div>
          </div>

          <FileList />
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <I18nProvider>
      <HomeShell />
    </I18nProvider>
  );
}

function HomeShell() {
  const { dictionary } = useI18n();

  return (
    <>
      <Header />
      <MainContent />
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-outline-variant/80 bg-surface-container-lowest/90 px-4 py-2 backdrop-blur-xl md:hidden">
        <button className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
          <span className="text-[10px] font-bold">{dictionary.common.files}</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">schedule</span>
          <span className="text-[10px] font-medium">{dictionary.common.recent}</span>
        </button>
        <div className="-mt-8">
          <button className="soft-ring rounded-full border-4 border-surface-container-lowest bg-primary p-4 text-on-primary">
            <span className="material-symbols-outlined text-2xl">add</span>
          </button>
        </div>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">share</span>
          <span className="text-[10px] font-medium">{dictionary.common.shared}</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-medium">{dictionary.common.settings}</span>
        </button>
      </nav>
    </>
  );
}