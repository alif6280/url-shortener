export interface ShortLink {
  id: string;
  slug: string;
  originalUrl: string;
  shortUrl: string;
  title?: string;
  isActive: boolean;
  expiresAt?: string | null;
  createdAt: string;
  clickCount: number;
}

export interface AnalyticsData {
  link: ShortLink;
  total: number;
  unique: number;
  byCountry: { country: string; clicks: number }[];
  byDevice: { device: string; clicks: number }[];
  byBrowser: { browser: string; clicks: number }[];
  byReferrer: { referrer: string; clicks: number }[];
  daily: { day: string; clicks: number }[];
}
