"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-muted-foreground mb-6 text-sm">{error.message}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm hover:bg-primary/90 transition-colors">
            Try again
          </button>
          <Link href="/" className="border border-border px-4 py-2 rounded-xl text-sm hover:bg-accent transition-colors">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
