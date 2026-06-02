import { signOut } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function doLogout() {
  "use server";
  await signOut({ redirectTo: "/" });
}

export default function LogoutPage() {
  return (
    <form action={doLogout}>
      <button type="submit" style={{ display: "none" }} id="btn" />
      <script dangerouslySetInnerHTML={{
        __html: `document.getElementById('btn').click()`
      }} />
    </form>
  );
}