import Link from "next/link";
import { Link2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex w-16 h-16 bg-primary/10 rounded-2xl items-center justify-center mb-6">
          <Link2 className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-muted-foreground mb-6">
          This link doesn't exist or has expired.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Create a new link →
        </Link>
      </div>
    </div>
  );
}
