import { NextResponse } from "next/server";
import { getFileList } from "@/lib/fileUtils";

export async function GET() {
  try {
    const files = await getFileList();
    return NextResponse.json(files);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al listar archivos" }, { status: 500 });
  }
}