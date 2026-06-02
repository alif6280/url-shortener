import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AnalyticsClient } from "@/components/analytics-client";

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let session = null;
  try { session = await auth(); } catch {}
  if (!session) redirect("/login");
  const { slug } = await params;
  return <AnalyticsClient slug={slug} user={session.user} />;
}