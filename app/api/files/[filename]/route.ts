import { NextRequest, NextResponse } from "next/server";
import { deleteFile } from "@/lib/fileUtils";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    await deleteFile(filename);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al eliminar archivo" }, { status: 500 });
  }
}