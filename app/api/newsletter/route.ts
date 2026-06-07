import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

type NewsletterRecord = {
  email: string;
  source: string;
  createdAt: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function appendRecord(record: NewsletterRecord) {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "newsletter-subscribers.json");

  await mkdir(dataDir, { recursive: true });

  let records: NewsletterRecord[] = [];
  try {
    records = JSON.parse(await readFile(filePath, "utf8")) as NewsletterRecord[];
  } catch {
    records = [];
  }

  const existingIndex = records.findIndex(
    (item) => item.email.toLowerCase() === record.email.toLowerCase()
  );

  if (existingIndex >= 0) {
    records[existingIndex] = record;
  } else {
    records.push(record);
  }

  await writeFile(filePath, `${JSON.stringify(records, null, 2)}\n`, "utf8");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email || "").trim().toLowerCase();

  if (!emailPattern.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  await appendRecord({
    email,
    source: "homepage-newsletter",
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
