import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { links, clicks } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { eq, and, sql } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const [link] = await db
    .select()
    .from(links)
    .where(and(eq(links.id, id), eq(links.userId, session.user.id)))
    .limit(1);

  if (!link) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [{ cnt }] = await db
    .select({ cnt: sql<number>`count(*)::int` })
    .from(clicks)
    .where(eq(clicks.linkId, link.id));

  return NextResponse.json({ ...link, clickCount: cnt });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const allowed = ["isActive", "title", "expiresAt"];
  const update: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) update[key] = body[key];
  }

  const [updated] = await db
    .update(links)
    .set(update)
    .where(and(eq(links.id, id), eq(links.userId, session.user.id)))
    .returning();

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  await db
    .delete(links)
    .where(and(eq(links.id, id), eq(links.userId, session.user.id)));

  return NextResponse.json({ ok: true });
}