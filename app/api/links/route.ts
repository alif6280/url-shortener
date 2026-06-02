import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { links, clicks } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { generateSlug, isValidSlug } from "@/lib/slug";
import { isValidUrl } from "@/lib/utils";
import { eq, desc, sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const { url, customSlug, title } = await req.json();

    if (!url || !isValidUrl(url)) {
      return NextResponse.json({ error: "Invalid URL. Make sure it starts with https://" }, { status: 400 });
    }

    const isGuest = !session?.user?.id;

    let slug = customSlug?.trim();
    if (slug) {
      if (isGuest) return NextResponse.json({ error: "Login required for custom aliases" }, { status: 401 });
      if (!isValidSlug(slug)) return NextResponse.json({ error: "Invalid alias. Use letters, numbers, - or _" }, { status: 400 });
      const existing = await db.select().from(links).where(eq(links.slug, slug)).limit(1);
      if (existing.length > 0) return NextResponse.json({ error: "This alias is already taken" }, { status: 409 });
    } else {
      let attempts = 0;
      do {
        slug = generateSlug();
        const existing = await db.select().from(links).where(eq(links.slug, slug)).limit(1);
        if (existing.length === 0) break;
        attempts++;
      } while (attempts < 10);
    }

    const expiry = isGuest ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null;

    const [link] = await db.insert(links).values({
      slug,
      originalUrl: url,
      userId: session?.user?.id ?? null,
      title: title ?? null,
      expiresAt: expiry,
    }).returning();

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.json({
      id: link.id,
      slug: link.slug,
      shortUrl: `${appUrl}/${link.slug}`,
      originalUrl: link.originalUrl,
      expiresAt: link.expiresAt,
      isGuest,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await db
    .select({
      id: links.id,
      slug: links.slug,
      originalUrl: links.originalUrl,
      title: links.title,
      isActive: links.isActive,
      expiresAt: links.expiresAt,
      createdAt: links.createdAt,
      clickCount: sql<number>`count(${clicks.id})::int`,
    })
    .from(links)
    .leftJoin(clicks, eq(clicks.linkId, links.id))
    .where(eq(links.userId, session.user.id))
    .groupBy(links.id)
    .orderBy(desc(links.createdAt));

  return NextResponse.json(rows);
}
