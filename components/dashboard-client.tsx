"use client";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { LinkCard } from "@/components/link-card";
import { ShortenForm } from "@/components/shorten-form";
import { formatNumber } from "@/lib/utils";
import { Search, Link2, MousePointerClick, Zap, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export function DashboardClient({ user }: { user: any }) {
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const isBn = lang === "bn";

  const t = isBn ? {
    title: "আমার লিংকসমূহ",
    subtitle: "সব শর্ট লিংক ম্যানেজ করুন",
    createLink: "নতুন লিংক",
    createNew: "নতুন লিংক তৈরি করুন",
    totalLinks: "মোট লিংক",
    totalClicks: "মোট ক্লিক",
    activeLinks: "সক্রিয় লিংক",
    search: "লিংক খুঁজুন...",
    noLinks: "কোনো লিংক নেই।",
    noMatch: "কোনো লিংক মেলেনি",
    deleted: "লিংক মুছে ফেলা হয়েছে",
    enabled: "লিংক চালু হয়েছে",
    disabled: "লিংক বন্ধ হয়েছে",
    confirmDelete: "এই লিংক মুছে ফেলবেন?",
  } : {
    title: "My Links",
    subtitle: "Manage and track all your short links",
    createLink: "New Link",
    createNew: "Create new link",
    totalLinks: "Total Links",
    totalClicks: "Total Clicks",
    activeLinks: "Active Links",
    search: "Search links...",
    noLinks: "No links yet. Create your first one!",
    noMatch: "No links match your search",
    deleted: "Link deleted",
    enabled: "Link enabled",
    disabled: "Link disabled",
    confirmDelete: "Delete this link?",
  };

  useEffect(() => {
    fetch("/api/links")
      .then((r) => r.json())
      .then((data) => { setLinks(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = links.filter((l) =>
    l.slug?.toLowerCase().includes(search.toLowerCase()) ||
    l.originalUrl?.toLowerCase().includes(search.toLowerCase()) ||
    l.title?.toLowerCase().includes(search.toLowerCase())
  );

  const totalClicks = links.reduce((sum, l) => sum + (l.clickCount || 0), 0);
  const activeCount = links.filter((l) => l.isActive).length;

  async function handleDelete(id: string) {
    if (!confirm(t.confirmDelete)) return;
    await fetch(`/api/links/${id}`, { method: "DELETE" });
    setLinks((prev) => prev.filter((l) => l.id !== id));
    toast.success(t.deleted);
  }

  async function handleToggle(id: string, isActive: boolean) {
    await fetch(`/api/links/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive }),
    });
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, isActive } : l)));
    toast.success(isActive ? t.enabled : t.disabled);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{t.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{t.subtitle}</p>
          </div>
          <button onClick={() => setShowCreate(!showCreate)} className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
            {showCreate ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {t.createLink}
          </button>
        </div>

        {/* Create form */}
        {showCreate && (
          <div className="mb-8 border border-border rounded-2xl p-6 bg-card animate-fade-in">
            <h2 className="text-sm font-semibold mb-4">{t.createNew}</h2>
            <ShortenForm />
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-px bg-border mb-8 rounded-2xl overflow-hidden">
          {[
            { icon: Link2, label: t.totalLinks, value: links.length },
            { icon: MousePointerClick, label: t.totalClicks, value: formatNumber(totalClicks) },
            { icon: Zap, label: t.activeLinks, value: activeCount },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-background p-5">
              <Icon className="w-4 h-4 text-muted-foreground mb-2" />
              <div className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 border border-border rounded-xl px-4 py-3 mb-4 bg-card focus-within:ring-2 focus-within:ring-foreground/20 focus-within:border-foreground transition-all">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search} className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
        </div>

        {/* Links */}
        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map((i) => <div key={i} className="h-24 bg-card border border-border rounded-xl animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Link2 className="w-8 h-8 mx-auto mb-3 opacity-20" />
            <p className="text-sm">{search ? t.noMatch : t.noLinks}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((link) => (
              <LinkCard key={link.id} link={link} onDelete={handleDelete} onToggle={handleToggle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}