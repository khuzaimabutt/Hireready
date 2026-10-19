"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ResumeCard from "@/components/resume-card";
import NewResumeButton from "@/components/new-resume-button";
import type { UserType } from "@/lib/types";

type Resume = {
  id: string;
  title: string;
  target_role: string | null;
  user_type: string;
  status: string;
  ats_score: number | null;
  created_at: string;
};

export default function DashboardResumes({
  resumes,
  userType,
}: { resumes: Resume[]; userType: UserType }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "draft" | "generated">("all");
  const [sort, setSort] = useState<"recent" | "score" | "title">("recent");

  function refresh() {
    startTransition(() => router.refresh());
  }

  const filtered = useMemo(() => {
    let xs = resumes.slice();
    if (q) {
      const ql = q.toLowerCase();
      xs = xs.filter((r) => r.title.toLowerCase().includes(ql) || (r.target_role ?? "").toLowerCase().includes(ql));
    }
    if (filter !== "all") xs = xs.filter((r) => r.status === filter);
    if (sort === "score") xs.sort((a, b) => (b.ats_score ?? -1) - (a.ats_score ?? -1));
    else if (sort === "title") xs.sort((a, b) => a.title.localeCompare(b.title));
    else xs.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
    return xs;
  }, [resumes, q, filter, sort]);

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-medium">My resumes</h2>
        <div className="text-xs text-ink-500">{filtered.length} of {resumes.length}</div>
      </div>

      {resumes.length > 0 && (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[180px]">
            <input
              className="input pl-9"
              placeholder="Search title or role..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-500" width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 3.359 9.842l3.4 3.4a.75.75 0 1 0 1.06-1.06l-3.4-3.4A5.5 5.5 0 0 0 9 3.5ZM5.5 9a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Z" clipRule="evenodd"/></svg>
          </div>
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>All</FilterChip>
          <FilterChip active={filter === "draft"} onClick={() => setFilter("draft")}>Drafts</FilterChip>
          <FilterChip active={filter === "generated"} onClick={() => setFilter("generated")}>Generated</FilterChip>
          <select className="input max-w-[150px]" value={sort} onChange={(e) => setSort(e.target.value as any)}>
            <option value="recent">Most recent</option>
            <option value="score">Highest ATS</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      )}

      {(!resumes || resumes.length === 0) ? (
        <div className="card rise flex flex-col items-center border-dashed py-14 text-center">
          <EmptySheet />
          <h3 className="mt-6 font-display text-2xl font-medium">No resumes yet</h3>
          <p className="mt-1 max-w-sm text-sm text-ink-500">Create your first resume. It takes a guided form, then one generate step.</p>
          <NewResumeButton userType={userType} className="mt-6" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="card rise py-12 text-center text-sm text-ink-500">No matches. Try clearing search or filters.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {filtered.map((r, i) => (
            <div key={r.id} className="rise" style={{ ["--i" as string]: Math.min(i, 8) }}>
              <ResumeCard resume={r} onChange={refresh} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-2 text-xs font-medium transition-colors duration-150 ${
        active ? "bg-ink text-white" : "border border-line bg-white text-ink-600 hover:border-ink-300 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function EmptySheet() {
  return (
    <svg width="96" height="120" viewBox="0 0 96 120" fill="none" aria-hidden="true">
      <rect x="10" y="14" width="76" height="98" rx="8" fill="#EEE9DD" transform="rotate(4 48 63)" />
      <rect x="6" y="8" width="76" height="98" rx="8" fill="#fff" stroke="#E2DCCF" strokeWidth="2" />
      <rect x="18" y="22" width="34" height="6" rx="3" fill="#15171C" />
      <rect x="18" y="34" width="22" height="4" rx="2" fill="#0F6E5E" />
      <rect x="18" y="48" width="52" height="3" rx="1.5" fill="#E2DCCF" />
      <rect x="18" y="56" width="46" height="3" rx="1.5" fill="#E2DCCF" />
      <rect x="18" y="64" width="50" height="3" rx="1.5" fill="#E2DCCF" />
      <rect x="18" y="78" width="30" height="4" rx="2" fill="#0F6E5E" opacity="0.5" />
      <rect x="18" y="88" width="52" height="3" rx="1.5" fill="#E2DCCF" />
    </svg>
  );
}
