"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/i18n/I18nProvider";

interface DeleteFileModalProps {
  isOpen: boolean;
  fileName: string | null;
  onClose: () => void;
  onConfirm: (fileName: string) => Promise<void>;
}

export function DeleteFileModal({ isOpen, fileName, onClose, onConfirm }: DeleteFileModalProps) {
  const [mounted, setMounted] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { dictionary } = useI18n();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setError(null);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !deleting) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, deleting]);

  const handleClose = () => {
    if (deleting) {
      return;
    }

    setError(null);
    onClose();
  };

  const handleConfirm = async () => {
    if (!fileName || deleting) {
      return;
    }

    setDeleting(true);
    setError(null);

    try {
      await onConfirm(fileName);
    } catch (err) {
      console.error(err);
      setError(dictionary.deleteModal.failed);
    } finally {
      setDeleting(false);
    }
  };

  if (!mounted || !isOpen || !fileName) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[110] overflow-y-auto">
      <button
        type="button"
        aria-label={dictionary.common.closeModal}
        className="absolute inset-0 bg-slate-950/55 backdrop-blur-[2px]"
        onClick={handleClose}
      />

      <div className="relative flex min-h-full items-stretch justify-center p-2 sm:items-center sm:p-6">
        <section className="relative flex w-[min(100%,36rem)] flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-2xl shadow-slate-950/10 sm:rounded-[28px] max-sm:min-h-[calc(100dvh-1rem)] sm:max-h-[min(100dvh-3rem,42rem)]">
          <div className="border-b border-outline-variant bg-gradient-to-br from-error/10 via-surface-container-lowest/50 to-surface-container-low/60 px-4 py-4 sm:px-7 sm:py-6">
            <div className="relative w-full pr-11 sm:pr-14">
              <div className="w-full">
                <p className="font-label-md text-label-md text-error uppercase">{dictionary.deleteModal.irreversible}</p>
                <h2 className="mt-1.5 text-balance font-h3 text-h3 text-on-surface">{dictionary.deleteModal.title}</h2>
                <p className="mt-2 w-full max-w-full whitespace-normal break-normal font-body-md text-body-md leading-relaxed text-on-surface-variant">
                  {dictionary.deleteModal.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label={dictionary.common.closeModal}
                className="absolute right-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant bg-surface-container-low text-on-surface transition-colors hover:bg-surface-container sm:h-10 sm:w-10 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={deleting}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:space-y-5 sm:px-7 sm:py-6">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-low px-4 py-3">
              <p className="font-label-md text-label-md text-on-surface-variant uppercase">{dictionary.deleteModal.selectedFile}</p>
              <p className="mt-1 truncate font-body-md text-body-md text-on-surface" title={fileName}>{fileName}</p>
            </div>

            {error ? (
              <div
                role="alert"
                className="rounded-2xl border border-error/40 bg-error/10 px-4 py-3 font-body-sm text-body-sm text-error"
              >
                {error}
              </div>
            ) : null}

            <div className="flex flex-col-reverse gap-2 border-t border-outline-variant/70 pt-2 sm:flex-row sm:justify-end sm:gap-3 sm:border-t-0 sm:pt-0">
              <button
                type="button"
                onClick={handleClose}
                disabled={deleting}
                className="inline-flex w-full items-center justify-center rounded-xl border border-outline px-4 py-3 font-button text-button text-on-surface transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {dictionary.common.cancel}
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={deleting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-error px-5 py-3 font-button text-button text-white shadow-lg shadow-error/25 transition-opacity disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                <span className={`material-symbols-outlined text-[18px] ${deleting ? "animate-spin" : ""}`}>
                  {deleting ? "progress_activity" : "delete"}
                </span>
                <span>{deleting ? dictionary.deleteModal.deleting : dictionary.common.deleteFile}</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>,
    document.body
  );
}
