import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { pipeline } from "stream";
import { promisify } from "util";
import { NextResponse } from "next/server";
import { ensureUploadDir, getUploadDir } from "@/lib/fileUtils";

const pipelineAsync = promisify(pipeline);

const sanitizeName = (name: string) =>
  name
    .trim()
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 150) || `file-${Date.now()}`;

const writeStreamToFile = async (body: ReadableStream<Uint8Array> | null, destPath: string) => {
  if (!body) {
    throw new Error("Request body is missing");
  }

  const nodeStream = Readable.fromWeb(body as any);
  const writeStream = fs.createWriteStream(destPath);
  await pipelineAsync(nodeStream, writeStream);
};

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await ensureUploadDir();

    const headerName = request.headers.get("x-file-name") || "";
    const decodedName = headerName ? decodeURIComponent(headerName) : "";
    const rawName = decodedName || `upload-${Date.now()}`;
    const fileName = sanitizeName(rawName);
    const filePath = path.join(getUploadDir(), fileName);

    await writeStreamToFile(request.body, filePath);

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al subir archivo" }, { status: 500 });
  }
}