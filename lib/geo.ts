interface GeoData {
  country: string;
  countryCode: string;
  city: string;
}

export async function getGeoFromIp(ip: string): Promise<GeoData | null> {
  try {
    if (ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168")) {
      return { country: "Local", countryCode: "LO", city: "Localhost" };
    }
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,countryCode,city`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      country: data.country || "Unknown",
      countryCode: data.countryCode || "XX",
      city: data.city || "Unknown",
    };
  } catch {
    return null;
  }
}
