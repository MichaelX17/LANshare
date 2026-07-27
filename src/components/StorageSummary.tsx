"use client";

import { useFiles } from "@/hooks/useFiles";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

type StorageSummaryProps = {
  compact?: boolean;
};

export function StorageSummary({ compact = false }: StorageSummaryProps) {
  const { files } = useFiles();
  const { dictionary } = useI18n();
  const [totals, setTotals] = useState({ documents: 0, media: 0, archives: 0, other: 0 });

  useEffect(() => {
    let docs = 0, media = 0, archives = 0, other = 0;
    files.forEach((file) => {
      const ext = file.extension;
      if (["pdf", "doc", "docx", "txt", "md", "xls", "xlsx"].includes(ext)) docs += file.size;
      else if (["jpg", "jpeg", "png", "gif", "mp4", "mkv", "mp3"].includes(ext)) media += file.size;
      else if (["zip", "rar", "7z"].includes(ext)) archives += file.size;
      else other += file.size;
    });
    setTotals({ documents: docs, media, archives, other });
  }, [files]);

  const formatShort = (bytes: number) => {
    if (bytes === 0) return "0 GB";
    const gb = bytes / (1024 ** 3);
    return gb < 0.1 ? (bytes / (1024 ** 2)).toFixed(1) + " MB" : gb.toFixed(1) + " GB";
  };

  return (
    <div className={`elevated-card bg-surface-container-lowest/92 rounded-2xl border border-outline-variant/80 ${compact ? "p-3" : "p-lg"}`}>
      <div className={`flex items-center justify-between ${compact ? "mb-3" : "mb-lg"}`}>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">analytics</span>
          <h3 className={compact ? "text-sm font-semibold" : "font-h3 text-h3"}>{dictionary.storageSummary.title}</h3>
        </div>
      </div>
      <div className={compact ? "grid grid-cols-1 gap-2" : "grid grid-cols-2 gap-md md:grid-cols-4"}>
        <div className={`rounded-xl bg-surface-container-low border border-outline-variant/70 text-center ${compact ? "p-2" : "p-md"}`}>
          <p className="text-sm text-on-surface-variant mb-1">{dictionary.storageSummary.documents}</p>
          <p className={compact ? "font-bold text-sm" : "font-bold text-lg"}>{formatShort(totals.documents)}</p>
        </div>
        <div className={`rounded-xl bg-surface-container-low border border-outline-variant/70 text-center ${compact ? "p-2" : "p-md"}`}>
          <p className="text-sm text-on-surface-variant mb-1">{dictionary.storageSummary.media}</p>
          <p className={compact ? "font-bold text-sm" : "font-bold text-lg"}>{formatShort(totals.media)}</p>
        </div>
        <div className={`rounded-xl bg-surface-container-low border border-outline-variant/70 text-center ${compact ? "p-2" : "p-md"}`}>
          <p className="text-sm text-on-surface-variant mb-1">{dictionary.storageSummary.archives}</p>
          <p className={compact ? "font-bold text-sm" : "font-bold text-lg"}>{formatShort(totals.archives)}</p>
        </div>
        <div className={`rounded-xl bg-surface-container-low border border-outline-variant/70 text-center ${compact ? "p-2" : "p-md"}`}>
          <p className="text-sm text-on-surface-variant mb-1">{dictionary.storageSummary.others}</p>
          <p className={compact ? "font-bold text-sm" : "font-bold text-lg"}>{formatShort(totals.other)}</p>
        </div>
      </div>
    </div>
  );
}