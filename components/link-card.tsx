"use client";
import { useState, useRef } from "react";
import NextLink from "next/link";
import { Copy, Check, BarChart2, Trash2, ToggleLeft, ToggleRight, QrCode, X } from "lucide-react";
import { toast } from "sonner";
import { formatNumber, timeAgo } from "@/lib/utils";
import type { Link } from "@/lib/db/schema";
import { QRCodeCanvas } from "qrcode.react";

interface LinkCardProps {
  link: Link & { clickCount: number };
  onDelete: (id: string) => void;
  onToggle: (id: string, isActive: boolean) => void;
}

export function LinkCard({ link, onDelete, onToggle }: LinkCardProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const shortUrl = `${appUrl}/${link.slug}`;

  async function copy() {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadQR() {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const a = document.createElement("a");
    a.download = `qr-${link.slug}.png`;
    a.href = canvas.toDataURL();
    a.click();
  }

  return (
    <div className={`bg-card border rounded-xl p-4 transition-all ${
      !link.isActive ? "opacity-60 border-border" : "border-border hover:border-foreground/20"
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <NextLink
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold hover:underline truncate"
            >
              /{link.slug}
            </NextLink>
            {link.isActive ? (
              <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                Active
              </span>
            ) : (
              <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">
                Disabled
              </span>
            )}
          </div>

          <p className="text-xs text-muted-foreground truncate mb-2">
            {link.originalUrl}
          </p>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <BarChart2 className="w-3 h-3" />
              <strong className="text-foreground">{formatNumber(link.clickCount)}</strong> clicks
            </span>
            <span>{timeAgo(new Date(link.createdAt!))}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={copy}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
            title="Copy"
          >
            {copied
              ? <Check className="w-3.5 h-3.5 text-green-500" />
              : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
          </button>

          <button
            onClick={() => setShowQR(!showQR)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
            title="QR Code"
          >
            <QrCode className="w-3.5 h-3.5 text-muted-foreground" />
          </button>

          <NextLink
            href={`/dashboard/${link.slug}`}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
            title="Analytics"
          >
            <BarChart2 className="w-3.5 h-3.5 text-muted-foreground" />
          </NextLink>

          <button
            onClick={() => onToggle(link.id, !link.isActive)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
            title={link.isActive ? "Disable" : "Enable"}
          >
            {link.isActive
              ? <ToggleRight className="w-3.5 h-3.5 text-foreground" />
              : <ToggleLeft className="w-3.5 h-3.5 text-muted-foreground" />}
          </button>

          <button
            onClick={() => onDelete(link.id)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {showQR && (
        <div className="mt-4 pt-4 border-t border-border flex items-center gap-6 animate-fade-in">
          <div ref={qrRef} className="p-2 bg-white rounded-lg border border-border">
            <QRCodeCanvas value={shortUrl} size={100} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground break-all">{shortUrl}</p>
            <button
              onClick={downloadQR}
              className="text-xs bg-foreground text-background px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity w-fit"
            >
              Download PNG
            </button>
            <button
              onClick={() => setShowQR(false)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors w-fit flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}