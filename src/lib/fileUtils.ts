import fs from "fs/promises";
import path from "path";
import { FileItem } from "@/types/file";

function resolveUploadDir(): string {
  const configured = process.env.UPLOAD_DIR?.trim();
  if (!configured) return path.join(process.cwd(), "uploads");
  return path.isAbsolute(configured) ? configured : path.join(process.cwd(), configured);
}

const UPLOAD_DIR = resolveUploadDir();

export function getUploadDir(): string {
  return UPLOAD_DIR;
}

export async function ensureUploadDir() {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
}

export async function getFileList(): Promise<FileItem[]> {
  await ensureUploadDir();
  const files = await fs.readdir(UPLOAD_DIR);
  const statsPromises = files.map(async (name) => {
    const filePath = path.join(UPLOAD_DIR, name);
    const stat = await fs.stat(filePath);
    const sizeFormatted = formatBytes(stat.size);
    const uploadDate = stat.mtime;
    const uploadDateFormatted = uploadDate.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const extension = path.extname(name).slice(1).toLowerCase();
    let type = "Archivo";
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) type = "Imagen";
    else if (["pdf"].includes(extension)) type = "PDF Document";
    else if (["zip", "rar", "7z"].includes(extension)) type = "Comprimido";
    else if (["mp4", "mkv", "avi"].includes(extension)) type = "Video";
    else if (["mp3", "wav"].includes(extension)) type = "Audio";
    else if (["doc", "docx"].includes(extension)) type = "Documento Word";
    else if (["xls", "xlsx"].includes(extension)) type = "Hoja de cálculo";
    else if (["txt", "md"].includes(extension)) type = "Texto";
    return {
      name,
      size: stat.size,
      sizeFormatted,
      uploadDate,
      uploadDateFormatted,
      type,
      extension,
    };
  });
  const items = await Promise.all(statsPromises);
  items.sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime());
  return items;
}

export async function deleteFile(filename: string): Promise<void> {
  await ensureUploadDir();
  const filePath = path.join(UPLOAD_DIR, filename);
  await fs.unlink(filePath);
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}