import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { links } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({}, { status: 400 });

  const [link] = await db.select().from(links).where(eq(links.slug, slug)).limit(1);
  if (!link || !link.isActive) return NextResponse.json({}, { status: 404 });

  // Check expiry
  if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
    return NextResponse.json({}, { status: 410 });
  }

  return NextResponse.json({ id: link.id, url: link.originalUrl });
}
