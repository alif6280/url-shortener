import { NextRequest, NextResponse } from "next/server";

const SKIP = [
  "dashboard", "login", "register", "api", "preview",
  "_next", "favicon.ico", "not-found", "error", "sitemap.xml",
  "logout", "auth"
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const slug = pathname.slice(1).split("/")[0];

  if (
    !slug ||
    SKIP.some((r) => slug.startsWith(r)) ||
    slug.includes(".") ||
    pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  try {
    const baseUrl = req.nextUrl.origin;
    const res = await fetch(`${baseUrl}/api/links/resolve?slug=${encodeURIComponent(slug)}`);
    if (!res.ok) return NextResponse.next();

    const data = await res.json();
    if (!data.url) return NextResponse.next();

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    fetch(`${baseUrl}/api/links/click`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        linkId: data.id,
        ip,
        ua: req.headers.get("user-agent") || "",
        referrer: req.headers.get("referer") || "",
      }),
    }).catch(() => {});

    return NextResponse.redirect(data.url, { status: 302 });
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};