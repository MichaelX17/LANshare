"use client";

import { useEffect, useState, useCallback } from "react";
import { FileItem } from "@/types/file";

const FILES_REFRESH_EVENT = "files:refresh";

export function useFiles() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = useCallback(async () => {
    try {
      const res = await fetch("/api/files");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshFiles = useCallback(() => {
    setLoading(true);
    fetchFiles();
  }, [fetchFiles]);

  const deleteFile = useCallback(async (filename: string) => {
    try {
      const res = await fetch(`/api/files/${encodeURIComponent(filename)}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("No se pudo eliminar el archivo.");
      }

      window.dispatchEvent(new Event(FILES_REFRESH_EVENT));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const downloadFile = useCallback((filename: string) => {
    const a = document.createElement("a");
    a.href = `/api/download/${encodeURIComponent(filename)}`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  useEffect(() => {
    const handleFilesRefresh = () => {
      refreshFiles();
    };

    window.addEventListener(FILES_REFRESH_EVENT, handleFilesRefresh);

    return () => {
      window.removeEventListener(FILES_REFRESH_EVENT, handleFilesRefresh);
    };
  }, [refreshFiles]);

  return { files, loading, refreshFiles, deleteFile, downloadFile };
}