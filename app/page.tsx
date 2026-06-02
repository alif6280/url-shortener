import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { Link2 } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let session = null;
  try { session = await auth(); } catch {}

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={session?.user ?? null} />
      <HeroSection isLoggedIn={!!session} />
      <footer className="border-t border-border py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <div className="w-5 h-5 bg-foreground rounded flex items-center justify-center">
              <Link2 className="w-3 h-3 text-background" />
            </div>
            LinkSnip
          </div>
          <p>Built by <span className="font-medium text-foreground">MD. Montasir Monir Alif</span> · Next.js · Neon</p>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-foreground">Login</Link>
            <Link href="/register" className="hover:text-foreground">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}