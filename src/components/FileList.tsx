"use client";

import { useState } from "react";
import { useFiles } from "@/hooks/useFiles";
import { DeleteFileModal } from "@/components/DeleteFileModal";
import { useI18n } from "@/i18n/I18nProvider";
import { getFileTypeLabel } from "@/i18n/translations";

export function FileList() {
  const { files, loading, deleteFile, downloadFile } = useFiles();
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  const { locale, dictionary } = useI18n();

  const requestDeleteFile = (filename: string) => {
    setFileToDelete(filename);
  };

  const closeDeleteModal = () => {
    setFileToDelete(null);
  };

  const handleConfirmDelete = async (filename: string) => {
    await deleteFile(filename);
    closeDeleteModal();
  };

  const getIconByExtension = (ext: string) => {
    if (ext === "pdf") return "picture_as_pdf";
    if (["jpg", "jpeg", "png", "gif"].includes(ext)) return "image";
    if (["zip", "rar", "7z"].includes(ext)) return "folder_zip";
    return "insert_drive_file";
  };

  const getIconColor = (ext: string) => {
    if (ext === "pdf") return "text-red-600 bg-red-50/90 dark:bg-red-950/35";
    if (["jpg", "jpeg", "png", "gif"].includes(ext)) return "text-cyan-700 bg-cyan-50/90 dark:bg-cyan-950/35";
    if (["zip", "rar", "7z"].includes(ext)) return "text-amber-700 bg-amber-50/90 dark:bg-amber-950/35";
    return "text-zinc-700 bg-zinc-100/90 dark:bg-zinc-800/45";
  };

  const formatUploadDate = (uploadDate: Date | string) => {
    const parsedDate = uploadDate instanceof Date ? uploadDate : new Date(uploadDate);
    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <div className="p-8 text-center">{dictionary.fileList.loading}</div>;
  }

  if (files.length === 0) {
    return (
      <div className="elevated-card flex flex-col items-center justify-center py-20 text-center space-y-md bg-surface-container-low/85 rounded-[28px] border-2 border-dashed border-outline-variant">
        <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[40px]">folder_off</span>
        </div>
        <div>
          <h3 className="font-h3 text-h3">{dictionary.fileList.emptyTitle}</h3>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto">
            {dictionary.fileList.emptyDescription}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-w-0 space-y-3 lg:space-y-0">
      <div className="grid min-w-0 gap-3 lg:hidden">
        {files.map((file) => (
          <article key={file.name} className="elevated-card w-full max-w-full overflow-hidden rounded-2xl border border-outline-variant/80 bg-surface-container-lowest/92 p-4 backdrop-blur-sm">
            <div className="flex min-w-0 items-center gap-3">
              <div className={`h-10 w-10 shrink-0 rounded-lg flex items-center justify-center ${getIconColor(file.extension)}`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {getIconByExtension(file.extension)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-on-surface" title={file.name}>{file.name}</p>
                <p className="truncate text-xs text-on-surface-variant" title={getFileTypeLabel(file.extension, locale)}>{getFileTypeLabel(file.extension, locale)}</p>
              </div>
            </div>

            <div className="mt-3 grid min-w-0 grid-cols-2 gap-2 text-xs text-on-surface-variant">
              <div className="min-w-0 rounded-lg bg-surface-container-low px-2 py-1.5">
                <p className="font-medium">{dictionary.common.size}</p>
                <p className="mt-0.5 truncate text-on-surface" title={file.sizeFormatted}>{file.sizeFormatted}</p>
              </div>
              <div className="min-w-0 rounded-lg bg-surface-container-low px-2 py-1.5">
                <p className="font-medium">{dictionary.common.date}</p>
                <p className="mt-0.5 text-on-surface truncate" title={formatUploadDate(file.uploadDate)}>{formatUploadDate(file.uploadDate)}</p>
              </div>
            </div>

            <div className="mt-3 flex min-w-0 gap-2">
              <button
                onClick={() => downloadFile(file.name)}
                className="inline-flex min-w-0 flex-1 items-center justify-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-button text-on-primary shadow-md shadow-primary/20 active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span className="truncate">{dictionary.fileList.download}</span>
              </button>
              <button
                onClick={() => requestDeleteFile(file.name)}
                className="inline-flex shrink-0 items-center justify-center rounded-lg border border-outline-variant bg-surface-container px-3 py-2 text-error"
                aria-label={`${dictionary.fileList.deleteAria} ${file.name}`}
              >
                <span className="material-symbols-outlined text-[20px]">delete</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="elevated-card hidden overflow-hidden rounded-[28px] border border-outline-variant/80 bg-surface-container-lowest/92 backdrop-blur-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/75 border-b border-outline-variant/90">
                <th className="px-3 py-3 font-label-md text-label-md text-on-surface-variant sm:px-lg">{dictionary.fileList.name}</th>
                <th className="px-3 py-3 font-label-md text-label-md text-on-surface-variant whitespace-nowrap sm:px-lg">{dictionary.common.size}</th>
                <th className="px-3 py-3 font-label-md text-label-md text-on-surface-variant whitespace-nowrap sm:px-lg">{dictionary.common.date}</th>
                <th className="px-3 py-3 font-label-md text-label-md text-on-surface-variant text-right whitespace-nowrap sm:px-lg">{dictionary.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {files.map((file) => (
                <tr key={file.name} className="group transition-colors hover:bg-surface-container-low/65">
                  <td className="px-3 py-4 sm:px-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconColor(file.extension)}`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {getIconByExtension(file.extension)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="max-w-[220px] truncate font-medium text-on-surface md:max-w-[320px] lg:max-w-[520px] xl:max-w-[520px]" title={file.name}>{file.name}</p>
                        <p className="text-xs text-on-surface-variant">{getFileTypeLabel(file.extension, locale)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 font-body-sm text-body-sm text-on-surface-variant whitespace-nowrap sm:px-lg">{file.sizeFormatted}</td>
                  <td className="px-3 py-4 font-body-sm text-body-sm text-on-surface-variant whitespace-nowrap sm:px-lg">{formatUploadDate(file.uploadDate)}</td>
                  <td className="px-3 py-4 text-right sm:px-lg">
                    <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => downloadFile(file.name)}
                        className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-button text-on-primary shadow-md shadow-primary/20 active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[16px]">download</span>
                        <span>{dictionary.fileList.download}</span>
                      </button>
                      <button
                        onClick={() => requestDeleteFile(file.name)}
                        className="rounded-lg p-1.5 text-error transition-colors hover:bg-error-container"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      <DeleteFileModal
        isOpen={Boolean(fileToDelete)}
        fileName={fileToDelete}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}