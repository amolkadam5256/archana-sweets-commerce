import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

type CorporateInquiry = {
  id: string;
  name: string;
  company: string;
  mobile: string;
  email: string;
  quantity: string;
  budget: string;
  source: string;
  createdAt: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function appendInquiry(inquiry: CorporateInquiry) {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "corporate-inquiries.json");

  await mkdir(dataDir, { recursive: true });

  let records: CorporateInquiry[] = [];
  try {
    records = JSON.parse(await readFile(filePath, "utf8")) as CorporateInquiry[];
  } catch {
    records = [];
  }

  records.push(inquiry);
  await writeFile(filePath, `${JSON.stringify(records, null, 2)}\n`, "utf8");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const inquiry = {
    name: String(body?.name || "").trim(),
    company: String(body?.company || "").trim(),
    mobile: String(body?.mobile || "").trim(),
    email: String(body?.email || "").trim().toLowerCase(),
    quantity: String(body?.quantity || "").trim(),
    budget: String(body?.budget || "").trim(),
  };

  const missingField = Object.entries(inquiry).find(([, value]) => value.length === 0);
  if (missingField) {
    return NextResponse.json({ message: "Please complete all inquiry fields." }, { status: 400 });
  }

  if (!emailPattern.test(inquiry.email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  if (!/^[0-9+\-\s()]{8,20}$/.test(inquiry.mobile)) {
    return NextResponse.json({ message: "Please enter a valid mobile number." }, { status: 400 });
  }

  await appendInquiry({
    id: crypto.randomUUID(),
    ...inquiry,
    source: "homepage-corporate-section",
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
