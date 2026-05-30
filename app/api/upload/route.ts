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

const writeStreamToFile = async (file: any, destPath: string) => {
  const stream = file.stream();
  if (!stream) {
    throw new Error("Unable to read file stream");
  }
  const nodeStream = Readable.fromWeb(stream as any);
  const writeStream = fs.createWriteStream(destPath);
  await pipelineAsync(nodeStream, writeStream);
};

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const maybeFile = formData.get("file") as any;
    if (!maybeFile || typeof maybeFile.stream !== "function") {
      return NextResponse.json({ error: "No se envió ningún archivo" }, { status: 400 });
    }

    await ensureUploadDir();

    const rawName = maybeFile.name || `upload-${Date.now()}`;
    const fileName = sanitizeName(rawName);
    const filePath = path.join(getUploadDir(), fileName);

    await writeStreamToFile(maybeFile, filePath);

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al subir archivo" }, { status: 500 });
  }
}