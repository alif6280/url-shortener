"use client";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

interface NavbarProps {
  user?: { name?: string | null; email?: string | null; image?: string | null } | null;
}

export function Navbar({ user }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const isBn = lang === "bn";

  const t = isBn
    ? { dashboard: "ড্যাশবোর্ড", login: "লগইন", logout: "লগআউট" }
    : { dashboard: "Dashboard", login: "Login", logout: "Logout" };

  async function handleLogout() {
  window.location.href = "/logout";
}

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link href={`/?lang=${lang}`} className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-foreground rounded-lg flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <span className="font-semibold text-foreground tracking-tight">LinkSnip</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <Link href={`/dashboard?lang=${lang}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-accent">
                <LayoutDashboard className="w-3.5 h-3.5" /> {t.dashboard}
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-accent transition-colors">
                <LogOut className="w-3.5 h-3.5" /> {t.logout}
              </button>
              {user.image && (
                <img src={user.image} alt="avatar" className="w-7 h-7 rounded-full border border-border ml-1" />
              )}
            </>
          ) : (
            <Link href={`/login?lang=${lang}`} className="text-sm bg-foreground text-background px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity font-medium">
              {t.login}
            </Link>
          )}
          <div className="w-px h-4 bg-border mx-1" />
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <button className="md:hidden p-2 rounded-lg hover:bg-accent" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-3">
          {user ? (
            <>
              {user.image && (
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <img src={user.image} alt="avatar" className="w-8 h-8 rounded-full border border-border" />
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              )}
              <Link href={`/dashboard?lang=${lang}`} className="flex items-center gap-2 text-sm py-1.5" onClick={() => setOpen(false)}>
                <LayoutDashboard className="w-4 h-4" /> {t.dashboard}
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm py-1.5 w-full text-left text-muted-foreground">
                <LogOut className="w-4 h-4" /> {t.logout}
              </button>
            </>
          ) : (
            <Link href={`/login?lang=${lang}`} className="text-sm py-1.5" onClick={() => setOpen(false)}>
              {t.login}
            </Link>
          )}
          <div className="flex items-center gap-3 pt-3 border-t border-border">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}