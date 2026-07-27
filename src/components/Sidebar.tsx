"use client";

import { useFiles } from "@/hooks/useFiles";
import { StorageSummary } from "@/components/StorageSummary";
import { useI18n } from "@/i18n/I18nProvider";

const STORAGE_LIMIT_BYTES = 50 * 1024 * 1024 * 1024;

function formatStorageCompact(bytes: number): string {
  if (bytes <= 0) return "0MB";

  const mb = bytes / (1024 * 1024);
  if (mb < 1024) {
    return `${mb >= 10 ? mb.toFixed(0) : mb.toFixed(1)}MB`;
  }

  const gb = mb / 1024;
  return `${gb.toFixed(1)}GB`;
}

export function Sidebar() {
  const { files } = useFiles();
  const { dictionary } = useI18n();
  const totalBytes = files.reduce((acc, file) => acc + file.size, 0);
  const usagePercentage = Math.min((totalBytes / STORAGE_LIMIT_BYTES) * 100, 100);
  const filesLabel = files.length === 1 ? dictionary.common.file : dictionary.common.filePlural;

  return (
    <aside className="hidden md:flex flex-col h-dvh fixed left-0 top-0 pt-20 pb-4 px-4 bg-surface-container-lowest/75 backdrop-blur-lg w-64 border-r border-outline-variant/80 overflow-y-auto">
      <div className="elevated-card mb-5 rounded-2xl border border-outline-variant/80 bg-surface-container-lowest p-4">
        <h2 className="font-h3 text-h3 text-primary mb-1">{dictionary.sidebar.localStorage}</h2>
        <p className="font-label-md text-label-md text-on-surface-variant">
          {formatStorageCompact(totalBytes)} {dictionary.sidebar.inText} {files.length} {filesLabel}
        </p>
        {/* <div className="w-full bg-surface-container-high h-2 rounded-full mt-3 overflow-hidden">
          <div className="bg-primary h-full rounded-full" style={{ width: `${usagePercentage}%` }}></div>
        </div> */}
      </div>
      <div className="px-2 mb-4">
        <StorageSummary compact />
      </div>
    </aside>
  );
}