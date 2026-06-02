"use client";
import { useRef } from "react";
import QRCode from "qrcode.react";
import { Download } from "lucide-react";

interface QRCodeCardProps {
  url: string;
  slug: string;
}

export function QRCodeCard({ url, slug }: QRCodeCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function download() {
    const canvas = ref.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `qr-${slug}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div ref={ref} className="p-3 bg-white rounded-xl border border-border">
        <QRCode value={url} size={160} />
      </div>
      <button
        onClick={download}
        className="flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-accent transition-colors"
      >
        <Download className="w-3 h-3" /> Download PNG
      </button>
    </div>
  );
}
