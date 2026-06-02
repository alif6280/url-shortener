import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clicks } from "@/lib/db/schema";
import { getGeoFromIp } from "@/lib/geo";
import { parseUserAgent } from "@/lib/ua-parser";
import { hashIp } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { linkId, ip, ua, referrer } = await req.json();
    if (!linkId) return NextResponse.json({}, { status: 400 });

    const [geo, parsed] = await Promise.all([
      getGeoFromIp(ip),
      Promise.resolve(parseUserAgent(ua || "")),
    ]);

    await db.insert(clicks).values({
      linkId,
      country: geo?.countryCode || "XX",
      city: geo?.city || null,
      device: parsed.device,
      browser: parsed.browser,
      os: parsed.os,
      referrer: referrer || null,
      ipHash: hashIp(ip || "unknown"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Click log error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
