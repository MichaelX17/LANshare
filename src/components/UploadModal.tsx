"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFiles } from "@/hooks/useFiles";
import { useI18n } from "@/i18n/I18nProvider";
import { withBasePath } from "@/lib/basePath";

const FILES_REFRESH_EVENT = "files:refresh";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 10 ? 1 : 2)} ${units[unitIndex]}`;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadModal({ isOpen, onClose }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { refreshFiles } = useFiles();
  const { locale, dictionary } = useI18n();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !uploading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, uploading]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (uploading) {
      return;
    }

    dragCounterRef.current = 0;
    setIsDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) {
      return;
    }

    setError(null);
    setFile(droppedFile);
    setProgress(0);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setError(null);
      setFile(selectedFile);
      setProgress(0);
    }

    e.target.value = "";
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (uploading) {
      return;
    }

    dragCounterRef.current += 1;
    if (!isDragActive) {
      setIsDragActive(true);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (uploading) {
      return;
    }

    dragCounterRef.current -= 1;
    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0;
      setIsDragActive(false);
    }
  };

  const openFilePicker = () => {
    if (uploading) {
      return;
    }

    fileInputRef.current?.click();
  };

  const handleDropzoneKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (uploading) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFilePicker();
    }
  };

  const clearFile = () => {
    if (uploading) {
      return;
    }

    setFile(null);
    setProgress(0);
    setError(null);
  };

  const resetModalState = () => {
    setFile(null);
    setProgress(0);
    setError(null);
    setIsDragActive(false);
    dragCounterRef.current = 0;
  };

  const handleClose = () => {
    if (uploading) {
      return;
    }

    resetModalState();
    onClose();
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", withBasePath("/api/upload"));
      xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
      xhr.setRequestHeader("X-File-Name", encodeURIComponent(file.name));

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setProgress(Math.round((event.loaded / event.total) * 100));
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploading(false);
          refreshFiles();
          window.dispatchEvent(new Event(FILES_REFRESH_EVENT));
          resetModalState();
          onClose();
        } else {
          setUploading(false);
          setError(dictionary.uploadModal.uploadFailed);
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        setError(dictionary.uploadModal.uploadNetworkError);
      };

      xhr.send(file);
    } catch (err) {
      console.error(err);
      setUploading(false);
      setError(dictionary.uploadModal.uploadUnexpectedError);
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <button
        type="button"
        aria-label={dictionary.common.closeModal}
        className="absolute inset-0 bg-slate-950/55 backdrop-blur-[2px]"
        onClick={handleClose}
      />

      <div className="relative flex min-h-full items-stretch justify-center p-2 sm:items-center sm:p-6">
        <section className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-2xl shadow-slate-950/10 sm:rounded-[28px] max-sm:min-h-[calc(100dvh-1rem)] sm:max-h-[min(100dvh-3rem,52rem)]">
          <div className="border-b border-outline-variant bg-gradient-to-br from-primary-container/20 via-surface-container-lowest/50 to-surface-container-low/60 px-4 py-4 sm:px-7 sm:py-6">

            <div className="relative w-full pr-11 sm:pr-14">
              <div className="w-full">
                <p className="font-label-md text-label-md text-primary uppercase">{dictionary.uploadModal.transferLabel}</p>
                <h2 className="mt-1.5 text-balance font-h3 text-h3 text-on-surface">{dictionary.uploadModal.title}</h2>
                <p className="mt-2 w-full max-w-full whitespace-normal break-normal font-body-md text-body-md leading-relaxed text-on-surface-variant sm:max-w-xl lg:max-w-2xl">
                  {dictionary.uploadModal.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label={dictionary.common.closeModal}
                className="absolute right-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant bg-surface-container-low text-on-surface transition-colors hover:bg-surface-container sm:h-10 sm:w-10"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:space-y-5 sm:px-7 sm:py-6">
            <div
              role="button"
              tabIndex={0}
              className={`group rounded-2xl border-2 border-dashed p-4 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:rounded-3xl sm:p-8 ${
                isDragActive
                  ? "border-primary bg-primary/10"
                  : "border-outline-variant bg-surface-container-low hover:border-primary hover:bg-primary/5"
              } ${uploading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={openFilePicker}
              onKeyDown={handleDropzoneKeyDown}
              aria-disabled={uploading}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-container text-on-primary shadow-lg shadow-primary/15 sm:h-20 sm:w-20">
                <span className="material-symbols-outlined text-[30px] sm:text-[38px]">cloud_upload</span>
              </div>

              <p className="mt-3 text-balance font-body-lg text-body-lg text-on-surface sm:mt-4">
                {dictionary.uploadModal.dropHint}
              </p>

              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-outline bg-surface-container px-4 py-2 text-on-surface transition-colors hover:bg-surface-container-high disabled:cursor-not-allowed disabled:opacity-50 sm:mt-5"
                onClick={(event) => {
                  event.stopPropagation();
                  openFilePicker();
                }}
                disabled={uploading}
              >
                <span className="material-symbols-outlined text-[18px]">upload</span>
                <span className="font-button text-button">{dictionary.common.chooseFile}</span>
              </button>

              {file ? (
                <div className="mt-4 rounded-2xl border border-outline-variant bg-surface-container px-4 py-3 text-left sm:mt-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-container text-on-primary">
                      <span className="material-symbols-outlined text-[20px]">description</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-body-md text-body-md text-on-surface">{file.name}</p>
                      <p className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">{formatFileSize(file.size)}</p>
                    </div>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        clearFile();
                      }}
                      disabled={uploading}
                      aria-label={dictionary.uploadModal.removeFile}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                </div>
              ) : null}

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                disabled={uploading}
              />
            </div>

            {error ? (
              <div
                role="alert"
                className="rounded-2xl border border-error/40 bg-error/10 px-4 py-3 font-body-sm text-body-sm text-error"
              >
                {error}
              </div>
            ) : null}

            {file ? (
              <div className="rounded-2xl border border-outline-variant bg-surface-container-low px-4 py-4 sm:px-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                    <span>{uploading ? dictionary.common.uploadInProgress : dictionary.common.uploadReady}</span>
                    <span>{uploading ? `${progress}%` : dictionary.common.prepared}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-surface-container-high">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${uploading ? progress : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            <div className="flex flex-col-reverse gap-2 border-t border-outline-variant/70 pt-2 sm:flex-row sm:justify-end sm:gap-3 sm:border-t-0 sm:pt-0">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex w-full items-center justify-center rounded-xl border border-outline px-4 py-3 font-button text-button text-on-surface transition-colors hover:bg-surface-container sm:w-auto"
              >
                {dictionary.common.cancel}
              </button>

              <button
                type="button"
                onClick={handleUpload}
                disabled={!file || uploading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-button text-button text-on-primary shadow-lg shadow-primary/20 transition-opacity disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                <span className={`material-symbols-outlined text-[18px] ${uploading ? "animate-spin" : ""}`}>
                  {uploading ? "progress_activity" : "cloud_upload"}
                </span>
                <span>{uploading ? `${dictionary.uploadModal.uploadingWithProgress} (${progress}%)` : dictionary.common.uploadFile}</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>,
    document.body
  );
}