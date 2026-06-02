import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/components/dashboard-client";

export default async function DashboardPage() {
  let session = null;
  try { session = await auth(); } catch {}
  if (!session) redirect("/login");
  return <DashboardClient user={session.user} />;
}