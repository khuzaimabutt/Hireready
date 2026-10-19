import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import NewResumeButton from "@/components/new-resume-button";
import DashboardResumes from "@/components/dashboard-resumes";
import OnboardingTour from "@/components/onboarding-tour";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single();
  const { data: resumes } = await supabase
    .from("resumes")
    .select("id, title, target_role, user_type, status, ats_score, created_at")
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  const list = resumes ?? [];
  const totalResumes = list.length;
  const scored = list.filter((r) => r.ats_score != null);
  const avgAts = scored.length
    ? Math.round(scored.reduce((s, r) => s + (r.ats_score ?? 0), 0) / scored.length)
    : 0;
  const lastDraft = list.find((r) => r.status === "draft");
  const recentlyGenerated = list.find((r) => r.status === "generated");
  const continueResume = lastDraft ?? recentlyGenerated;

  return (
    <div className="space-y-8">
      <OnboardingTour shouldShow={list.length === 0} />

      {/* Welcome */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="eyebrow">Your workspace</div>
          <h1 className="mt-2 font-display text-3xl font-medium leading-tight sm:text-4xl">
            Welcome back, <em className="font-normal italic text-brand">{profile?.full_name?.split(" ")[0] || "there"}</em>
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-ink-600">
            Pick up a draft or start a new resume.
            {profile?.user_type && <span className="chip capitalize">{profile.user_type}</span>}
          </p>
        </div>
        <NewResumeButton userType={profile?.user_type ?? "fresher"} />
      </div>

      {/* Continue card */}
      {continueResume && (
        <div className="card rise flex flex-col items-start gap-3 border-l-4 border-l-brand md:flex-row md:items-center md:justify-between" style={{ ["--i" as string]: 1 }}>
          <div>
            <div className="eyebrow">{lastDraft ? "Continue where you left off" : "Most recent"}</div>
            <div className="mt-1 font-display text-lg font-semibold">{continueResume.title}</div>
            <div className="text-sm text-ink-500">{continueResume.target_role || "No target role yet"}</div>
          </div>
          <Link
            href={lastDraft ? `/builder/${continueResume.id}` : `/preview/${continueResume.id}`}
            className="btn-primary"
          >
            {lastDraft ? "Resume editing" : "Open resume"} →
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        <Stat i={2} label="Resumes created" value={totalResumes} />
        <Stat i={3} label="Average ATS score" value={avgAts || "-"} />
        <Stat i={4} label="Credits remaining" value={profile?.credits_remaining ?? 0} />
        <Stat i={5} label="Plan" value={(profile?.plan ?? "free").replace("_", " ")} capitalize />
      </div>

      {(profile?.plan ?? "free") === "free" && (
        <div className="rise rounded-xl border border-line bg-paper-50 p-4 text-sm" style={{ ["--i" as string]: 6 }}>
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div>
              <div className="font-semibold">You're on the Free plan</div>
              <div className="text-ink-600">Upgrade for unlimited resumes, all templates, and priority AI.</div>
            </div>
            <Link href="/pricing" className="btn-primary shrink-0">See plans</Link>
          </div>
        </div>
      )}

      <DashboardResumes resumes={list} userType={profile?.user_type ?? "fresher"} />
    </div>
  );
}

function Stat({ label, value, capitalize, i = 0 }: { label: string; value: string | number; capitalize?: boolean; i?: number }) {
  return (
    <div className="card rise !p-4 sm:!p-6" style={{ ["--i" as string]: i }}>
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500">{label}</div>
      <div className={`mt-2 font-display text-3xl font-medium tabular-nums ${capitalize ? "capitalize" : ""}`}>{value}</div>
    </div>
  );
}
