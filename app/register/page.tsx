import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  let session = null;
  try { session = await auth(); } catch {}
  if (session) redirect("/dashboard");

  const { lang = "en" } = await searchParams;
  const isBn = lang === "bn";

  const t = {
    title: isBn ? "অ্যাকাউন্ট তৈরি করুন" : "Create Account",
    subtitle: isBn ? "বিনামূল্যে শুরু করুন" : "Get started for free",
    github: isBn ? "GitHub দিয়ে সাইন আপ" : "Sign up with GitHub",
    or: isBn ? "অথবা" : "or",
    hasAccount: isBn ? "ইতিমধ্যে অ্যাকাউন্ট আছে?" : "Already have an account?",
    signIn: isBn ? "সাইন ইন করুন" : "Sign in",
    back: isBn ? "← হোমে ফিরুন" : "← Back to home",
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-black items-center justify-center p-12">
        <div className="text-white max-w-sm">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-8">
            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <h2 className={`${playfair.className} text-4xl font-bold mb-4 leading-tight`}>
            Join thousands<br />of link creators.
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Create short links, track analytics, and manage everything from one dashboard — completely free.
          </p>
          <div className="mt-8 space-y-3">
            {[
              "✓ Unlimited short links",
              "✓ Deep click analytics",
              "✓ Custom aliases",
              "✓ QR code for every link",
            ].map((f) => (
              <p key={f} className="text-sm text-gray-300">{f}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <span className="font-bold text-black">LinkSnip</span>
          </div>

          <h1 className={`${playfair.className} text-4xl font-bold text-black mb-2`}>
            {t.title}
          </h1>
          <p className="text-gray-500 text-sm mb-8">{t.subtitle}</p>

          <form action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/dashboard" });
          }}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-black text-white rounded-xl py-3.5 text-sm font-medium hover:bg-gray-900 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              {t.github}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">{t.or}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-500">
            {t.hasAccount}{" "}
            <Link href={`/login?lang=${lang}`} className="text-black font-medium hover:underline">
              {t.signIn}
            </Link>
          </p>
          <p className="text-center mt-4">
            <Link href={`/?lang=${lang}`} className="text-xs text-gray-400 hover:text-black transition-colors">
              {t.back}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}