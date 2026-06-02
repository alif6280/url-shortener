"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";

  function toggle(l: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", l);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-1 border border-border rounded-lg p-1 bg-card">
      <button
        onClick={() => toggle("en")}
        className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
          lang === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => toggle("bn")}
        className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
          lang === "bn"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        বাং
      </button>
    </div>
  );
}