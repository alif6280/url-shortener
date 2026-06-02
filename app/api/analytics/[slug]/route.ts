import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clicks, links } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { eq, sql } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get link — no auth check for now, just find by slug
    const [link] = await db
      .select()
      .from(links)
      .where(eq(links.slug, slug))
      .limit(1);

    if (!link) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Total clicks
    const [{ total }] = await db
      .select({ total: sql<number>`count(*)::int` })
      .from(clicks)
      .where(eq(clicks.linkId, link.id));

    // Unique visitors
    const [{ unique }] = await db
      .select({ unique: sql<number>`count(distinct ip_hash)::int` })
      .from(clicks)
      .where(eq(clicks.linkId, link.id));

    // By country
    const byCountry = await db
      .select({ country: clicks.country, clicks: sql<number>`count(*)::int` })
      .from(clicks)
      .where(eq(clicks.linkId, link.id))
      .groupBy(clicks.country)
      .orderBy(sql`count(*) desc`)
      .limit(10);

    // By device
    const byDevice = await db
      .select({ device: clicks.device, clicks: sql<number>`count(*)::int` })
      .from(clicks)
      .where(eq(clicks.linkId, link.id))
      .groupBy(clicks.device);

    // By browser
    const byBrowser = await db
      .select({ browser: clicks.browser, clicks: sql<number>`count(*)::int` })
      .from(clicks)
      .where(eq(clicks.linkId, link.id))
      .groupBy(clicks.browser)
      .orderBy(sql`count(*) desc`)
      .limit(6);

    // By referrer
    const byReferrer = await db
      .select({ referrer: clicks.referrer, clicks: sql<number>`count(*)::int` })
      .from(clicks)
      .where(eq(clicks.linkId, link.id))
      .groupBy(clicks.referrer)
      .orderBy(sql`count(*) desc`)
      .limit(8);

    // Daily clicks last 30 days
    const daily = await db
      .select({
        day: sql<string>`to_char(clicked_at, 'MM-DD')`,
        clicks: sql<number>`count(*)::int`,
      })
      .from(clicks)
      .where(
        sql`link_id = ${link.id} AND clicked_at > now() - interval '30 days'`
      )
      .groupBy(sql`to_char(clicked_at, 'MM-DD')`)
      .orderBy(sql`to_char(clicked_at, 'MM-DD')`);

    return NextResponse.json({
      link,
      total,
      unique,
      byCountry,
      byDevice,
      byBrowser,
      byReferrer,
      daily,
    });
  } catch (err) {
    console.error("Analytics error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}