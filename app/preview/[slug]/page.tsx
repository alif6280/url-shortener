import { db } from "@/lib/db";
import { links, clicks } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { ExternalLink, MousePointerClick, Calendar } from "lucide-react";
import Link from "next/link";

export default async function PreviewPage({ params }: { params: { slug: string } }) {
  const [link] = await db.select().from(links).where(eq(links.slug, params.slug)).limit(1);
  if (!link) notFound();

  const [{ cnt }] = await db
    .select({ cnt: sql<number>`count(*)::int` })
    .from(clicks)
    .where(eq(clicks.linkId, link.id));

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="bg-card border border-border rounded-2xl p-8 space-y-5">
          <h1 className="text-2xl font-bold">/{link.slug}</h1>
          <p className="text-sm text-muted-foreground">This short link points to:</p>
          <a
            href={link.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 justify-center text-primary hover:underline text-sm break-all"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            {link.originalUrl}
          </a>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-2">
            <span className="flex items-center gap-1">
              <MousePointerClick className="w-3.5 h-3.5" /> {cnt} clicks
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(link.createdAt!).toLocaleDateString()}
            </span>
          </div>
          <a
            href={`${appUrl}/${link.slug}`}
            className="block w-full bg-primary text-primary-foreground rounded-xl py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Visit Link →
          </a>
          <Link href="/" className="block text-xs text-muted-foreground hover:text-foreground">
            Create your own short link →
          </Link>
        </div>
      </div>
    </div>
  );
}
