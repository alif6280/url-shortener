"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { ClickChart } from "@/components/analytics/click-chart";
import { CountryChart } from "@/components/analytics/country-chart";
import { DeviceChart } from "@/components/analytics/device-chart";
import { formatNumber, timeAgo } from "@/lib/utils";
import { MousePointerClick, Users, Globe, Smartphone, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function AnalyticsClient({ slug, user }: { slug: string; user: any }) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/analytics/${slug}`)
      .then((r) => r.json())
      .then((d) => { if (d.error) setError(true); else setData(d); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        {[1,2,3].map(i => <div key={i} className="h-40 bg-card border border-border rounded-2xl animate-pulse" />)}
      </div>
    </div>
  );

  if (error || !data) return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Link not found or you don&apos;t have access.</p>
        <Link href={`/dashboard?lang=${lang}`} className="text-primary text-sm hover:underline mt-2 block">← Back to dashboard</Link>
      </div>
    </div>
  );

  const stats = [
    { icon: MousePointerClick, label: "Total Clicks", value: formatNumber(data.total), color: "text-primary", bg: "bg-accent" },
    { icon: Users, label: "Unique Visitors", value: formatNumber(data.unique), color: "text-teal-500", bg: "bg-teal-50" },
    { icon: Globe, label: "Top Country", value: data.byCountry[0]?.country || "—", color: "text-amber-500", bg: "bg-amber-50" },
    { icon: Smartphone, label: "Top Device", value: data.byDevice[0]?.device || "—", color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div>
          <Link href={`/dashboard?lang=${lang}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-3">
            <ArrowLeft className="w-3 h-3" /> Back to dashboard
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">/{data.link.slug}</h1>
              <a href={data.link.originalUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mt-0.5">
                <ExternalLink className="w-3 h-3" />
                <span className="truncate max-w-md">{data.link.originalUrl}</span>
              </a>
            </div>
            <div className="text-xs text-muted-foreground shrink-0">Created {timeAgo(new Date(data.link.createdAt))}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-4">
              <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center mb-2`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className="text-xl font-bold">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="text-sm font-semibold mb-4">Clicks over time (last 30 days)</h2>
          <ClickChart data={data.daily} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold mb-4">By Country</h2>
            <CountryChart data={data.byCountry} />
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold mb-4">By Device</h2>
            <DeviceChart data={data.byDevice} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold mb-3">By Browser</h2>
            <div className="space-y-2">
              {data.byBrowser.length === 0 ? <p className="text-sm text-muted-foreground">No data yet</p>
                : data.byBrowser.map((r: any) => (
                  <div key={r.browser} className="flex items-center gap-2">
                    <span className="text-xs w-20 shrink-0 text-muted-foreground">{r.browser}</span>
                    <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${(r.clicks / data.byBrowser[0].clicks) * 100}%` }} />
                    </div>
                    <span className="text-xs font-medium w-8 text-right">{r.clicks}</span>
                  </div>
                ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold mb-3">Referrer Sources</h2>
            <div className="space-y-2">
              {data.byReferrer.length === 0 ? <p className="text-sm text-muted-foreground">No data yet</p>
                : data.byReferrer.map((r: any) => {
                  let label = "Direct";
                  try { if (r.referrer) label = new URL(r.referrer).hostname; } catch {}
                  return (
                    <div key={r.referrer || "direct"} className="flex items-center gap-2">
                      <span className="text-xs w-24 shrink-0 truncate text-muted-foreground">{label}</span>
                      <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                        <div className="h-full bg-teal-500 rounded-full" style={{ width: `${(r.clicks / data.byReferrer[0].clicks) * 100}%` }} />
                      </div>
                      <span className="text-xs font-medium w-8 text-right">{r.clicks}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}