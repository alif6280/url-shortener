"use client";
import { useState } from "react";
import { Scissors, Copy, Check, BarChart2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { isValidUrl } from "@/lib/utils";

interface ShortenResult {
  id: string;
  slug: string;
  shortUrl: string;
  originalUrl: string;
}

export function ShortenForm() {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ShortenResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    if (!isValidUrl(url)) { toast.error("Please enter a valid URL including https://"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, customSlug: customSlug || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setResult(data);
      toast.success("Link shortened!");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard() {
    if (!result) return;
    await navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  }

  if (result) return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="border border-border rounded-2xl p-6 bg-card text-left space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center">
            <Check className="w-3 h-3 text-background" />
          </div>
          <span className="text-sm font-medium">Link shortened successfully!</span>
        </div>
        <div className="flex items-center gap-2 bg-secondary rounded-xl px-4 py-3">
          <span className="flex-1 text-sm font-semibold truncate">{result.shortUrl}</span>
          <button onClick={copyToClipboard} className="flex items-center gap-1.5 bg-foreground text-background text-xs px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity shrink-0">
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-xs text-muted-foreground truncate">→ {result.originalUrl}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <a href={result.shortUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-accent transition-colors">
            <ExternalLink className="w-3 h-3" /> Test link
          </a>
          <a href={`/dashboard/${result.slug}`} className="flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-accent transition-colors">
            <BarChart2 className="w-3 h-3" /> Analytics
          </a>
          <button onClick={() => { setResult(null); setUrl(""); setCustomSlug(""); }} className="flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-accent transition-colors ml-auto">
            + Shorten another
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 border border-border rounded-xl px-4 py-3 bg-card focus-within:ring-2 focus-within:ring-foreground/20 focus-within:border-foreground transition-all">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-foreground text-background px-5 py-3 rounded-xl font-medium text-sm hover:opacity-90 disabled:opacity-50 transition-all"
        >
          <Scissors className="w-4 h-4" />
          {loading ? "..." : "Shorten"}
        </button>
      </form>

      <button onClick={() => setShowAdvanced(!showAdvanced)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
        {showAdvanced ? "▲ Hide options" : "▼ Custom alias"}
      </button>

      {showAdvanced && (
        <div className="flex items-center gap-2 border border-border rounded-xl px-4 py-3 bg-card focus-within:ring-2 focus-within:ring-foreground/20 animate-fade-in">
          <span className="text-sm text-muted-foreground shrink-0">
            {process.env.NEXT_PUBLIC_APP_URL || "https://linksnip.io"}/
          </span>
          <input
            type="text"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))}
            placeholder="custom-alias"
            maxLength={20}
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
        </div>
      )}
    </div>
  );
}