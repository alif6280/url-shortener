"use client";

interface ReferrerListProps {
  data: { referrer: string; clicks: number }[];
}

export function ReferrerList({ data }: ReferrerListProps) {
  if (!data.length) return <p className="text-sm text-muted-foreground text-center py-4">No referrer data yet</p>;

  const max = data[0].clicks;

  return (
    <div className="space-y-2">
      {data.map((r, i) => {
        let label = "Direct";
        try { if (r.referrer) label = new URL(r.referrer).hostname; } catch {}
        return (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-28 truncate shrink-0">{label}</span>
            <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-teal-500 rounded-full transition-all"
                style={{ width: `${(r.clicks / max) * 100}%` }}
              />
            </div>
            <span className="text-xs font-medium w-6 text-right">{r.clicks}</span>
          </div>
        );
      })}
    </div>
  );
}
