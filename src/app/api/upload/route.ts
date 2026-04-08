import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { getPrimaryPet } from "~/lib/queries";

// Local filesystem storage under public/uploads/{petId}/.
// For the prototype only; replace with Vercel Blob / S3 in production.
export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
]);

function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

export async function POST(req: Request) {
  const pet = await getPrimaryPet();
  if (!pet) {
    return NextResponse.json({ error: "No pet found" }, { status: 400 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large" }, { status: 413 });
  }
  if (file.type && !ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const id = randomUUID();
  const fileName = `${id}-${safeName(file.name || "file")}`;
  const dir = path.join(process.cwd(), "public", "uploads", pet.id);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, fileName), bytes);

  const publicUrl = `/uploads/${pet.id}/${fileName}`;
  return NextResponse.json({
    url: publicUrl,
    name: file.name,
    size: file.size,
    type: file.type,
  });
}
