import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { readFile } from "fs/promises";
import { existsSync } from "fs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  const filePath = path.join(process.cwd(), "uploads", filename);

  if (!existsSync(filePath)) {
    return new NextResponse("Archivo no encontrado", { status: 404 });
  }

  const fileBuffer = await readFile(filePath);
  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Disposition": `attachment; filename="${encodeURIComponent(filename)}"`,
      "Content-Type": "application/octet-stream",
    },
  });
}