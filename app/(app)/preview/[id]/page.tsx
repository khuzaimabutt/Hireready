import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ResumeRenderer, { type Template } from "@/components/resume-renderer";
import RegenerateButton from "@/components/regenerate-button";
import AtsScoreRing from "@/components/ats-score-ring";
import ImprovementTips from "@/components/improvement-tips";
import PreviewActions from "@/components/preview-actions";
import CoverLetter from "@/components/cover-letter";
import JobMatch from "@/components/job-match";
import type { GeneratedResume } from "@/lib/types";

export const dynamic = "force-dynamic";

const VALID_TEMPLATES: Template[] = ["modern", "classic", "compact", "executive"];

export default async function PreviewPage({
  params, searchParams,
}: { params: { id: string }; searchParams: { tpl?: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: resume } = await supabase.from("resumes").select("*").eq("id", params.id).single();
  if (!resume) notFound();

  if (!resume.generated) {
    return (
      <div className="card rise mx-auto max-w-lg py-12 text-center">
        <div className="eyebrow">Not generated yet</div>
        <h2 className="mt-3 font-display text-2xl font-medium">This resume has not been generated.</h2>
        <p className="mt-1 text-ink-500">Open the builder to fill it in and run AI generation.</p>
        <Link href={`/builder/${resume.id}`} className="btn-primary mt-6 inline-flex">Go to builder</Link>
      </div>
    );
  }

  const generated = resume.generated as GeneratedResume;
  const tips = (resume.improvement_tips as any[] | null) ?? [];
  const tpl: Template = VALID_TEMPLATES.includes(searchParams.tpl as Template)
    ? (searchParams.tpl as Template)
    : "modern";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="card rise overflow-hidden self-start p-0 shadow-sheet">
        <ResumeRenderer
          generated={generated}
          fullName={(resume.content as any)?.personal?.full_name ?? "Your Name"}
          contact={(resume.content as any)?.personal ?? {}}
          targetRole={resume.target_role ?? ""}
          template={tpl}
        />
      </div>

      <aside className="space-y-4">
        <div className="card rise text-center" style={{ ["--i" as string]: 2 }}>
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500">ATS score</div>
          <div className="mt-3 flex justify-center">
            <AtsScoreRing score={resume.ats_score ?? 0} />
          </div>
          <div className="mt-3 text-xs text-ink-500">
            {(resume.ats_score ?? 0) >= 80 && "Strong. Likely to pass a keyword screen."}
            {(resume.ats_score ?? 0) >= 60 && (resume.ats_score ?? 0) < 80 && "Decent. Apply the warnings below."}
            {(resume.ats_score ?? 0) < 60 && "Needs work. Address critical fixes first."}
          </div>
        </div>

        <PreviewActions id={resume.id} defaultTemplate={tpl} />

        <JobMatch resumeId={resume.id} />

        <CoverLetter resumeId={resume.id} defaultRole={resume.target_role ?? ""} />

        <RegenerateButton id={resume.id} />

        {tips.length > 0 && (
          <div className="card">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-500">Improvement tips</div>
            <ImprovementTips tips={tips} />
          </div>
        )}
      </aside>
    </div>
  );
}
