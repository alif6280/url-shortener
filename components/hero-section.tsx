"use client";
import { useSearchParams } from "next/navigation";
import { ShortenForm } from "@/components/shorten-form";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const T = {
  en: {
    badge: "Free forever · No account required",
    hero1: "Shorten URLs.",
    hero2: "Track clicks.",
    sub: "Powerful URL shortener with deep analytics. See clicks by country, device, browser and referrer — completely free.",
    cta: "Want unlimited links & full analytics?",
    ctaLink: "Create free account →",
    s1: "Redirect speed", s2: "Free forever", s3: "Links",
    whyTitle: "Why LinkSnip?",
    ctaTitle: "Ready for more?",
    ctaDesc: "Create a free account for unlimited links and full analytics.",
    ctaBtn: "Get started free",
    features: [
      { title: "Lightning Fast", desc: "Vercel Edge redirects in ~30ms." },
      { title: "Deep Analytics", desc: "Clicks by country, device, browser." },
      { title: "Bilingual", desc: "English and Bengali support." },
      { title: "Privacy First", desc: "IPs hashed, never stored raw." },
      { title: "Custom Aliases", desc: "Your own slug like /my-portfolio." },
      { title: "QR Codes", desc: "Auto QR for every link. PNG download." },
    ],
  },
  bn: {
    badge: "সবসময় বিনামূল্যে · অ্যাকাউন্ট লাগবে না",
    hero1: "URL ছোট করুন।",
    hero2: "ক্লিক ট্র্যাক করুন।",
    sub: "গভীর বিশ্লেষণসহ শক্তিশালী URL শর্টেনার — সম্পূর্ণ বিনামূল্যে।",
    cta: "আনলিমিটেড লিংক ও পূর্ণ বিশ্লেষণ চাও?",
    ctaLink: "বিনামূল্যে অ্যাকাউন্ট বানাও →",
    s1: "রিডাইরেক্ট স্পিড", s2: "সবসময় বিনামূল্যে", s3: "লিংক",
    whyTitle: "কেন লিংকস্নিপ?",
    ctaTitle: "আরো বেশি চাও?",
    ctaDesc: "বিনামূল্যে অ্যাকাউন্ট বানাও।",
    ctaBtn: "বিনামূল্যে শুরু করো",
    features: [
      { title: "অতি দ্রুত", desc: "Vercel Edge-এ ~৩০ms রিডাইরেক্ট।" },
      { title: "গভীর বিশ্লেষণ", desc: "দেশ, ডিভাইস, ব্রাউজার অনুযায়ী।" },
      { title: "দ্বিভাষিক", desc: "ইংরেজি ও বাংলা সাপোর্ট।" },
      { title: "গোপনীয়তা", desc: "IP হ্যাশ করা।" },
      { title: "কাস্টম এলিয়াস", desc: "নিজের slug।" },
      { title: "QR কোড", desc: "প্রতি লিংকে QR।" },
    ],
  },
};

export function HeroSection({ isLoggedIn }: { isLoggedIn: boolean }) {
  const searchParams = useSearchParams();
  const lang = (searchParams.get("lang") || "en") as "en" | "bn";
  const t = T[lang] ?? T.en;

  return (
    <>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 text-center min-h-[90vh] flex flex-col items-center justify-center -mt-16">
        <div className="inline-flex items-center gap-2 border border-border text-muted-foreground text-xs px-3 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
          {t.badge}
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          {t.hero1}<br />
          <span className="text-muted-foreground">{t.hero2}</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
          {t.sub}
        </p>
        <ShortenForm />
        {!isLoggedIn && (
          <p className="mt-6 text-sm text-muted-foreground">
            {t.cta}{" "}
            <Link href={`/register?lang=${lang}`} className="text-foreground font-medium hover:underline underline-offset-4">
              {t.ctaLink}
            </Link>
          </p>
        )}
      </section>

      {/* Stats */}
      <section className="border-y border-border">
        <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-3 gap-4 text-center">
          {[
            { value: "~30ms", label: t.s1 },
            { value: "100%", label: t.s2 },
            { value: "∞", label: t.s3 },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>{t.whyTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {t.features.map((f, i) => (
            <div key={i} className="bg-background p-6 hover:bg-accent transition-colors">
              <div className="text-2xl font-bold mb-2 text-muted-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>0{i + 1}</div>
              <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {!isLoggedIn && (
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="bg-foreground text-background rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{t.ctaTitle}</h2>
            <p className="text-sm opacity-70 mb-6">{t.ctaDesc}</p>
            <Link href={`/register?lang=${lang}`} className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
              {t.ctaBtn} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}