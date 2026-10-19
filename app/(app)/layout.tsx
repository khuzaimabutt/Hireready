import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AppNav from "@/components/app-nav";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, user_type, plan, credits_remaining")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-soft text-ink">
      <AppNav profile={profile} email={user.email ?? ""} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
      <footer className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
        <p className="border-t border-line pt-4 text-xs leading-relaxed text-ink-500">
          Portfolio demo. Resume content comes from a built-in mock engine, not a live OpenAI model, and checkout is simulated, so no real payments are taken.
        </p>
      </footer>
    </div>
  );
}
