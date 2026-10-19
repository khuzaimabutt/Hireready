"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import type { UserType } from "@/lib/types";

const TABS = ["Profile", "Account", "Subscription", "Privacy"] as const;
type Tab = typeof TABS[number];

export default function SettingsForm({ profile }: { profile: any }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("Profile");
  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [userType, setUserType] = useState<UserType>(profile?.user_type ?? "fresher");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function saveProfile() {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.from("profiles").update({ full_name: fullName, user_type: userType }).eq("id", profile.id);
    setLoading(false);
    if (error) toast.error(error.message);
    else toast.success("Profile saved");
  }

  async function changePassword() {
    const np = prompt("New password (min 8 chars):");
    if (!np || np.length < 8) return toast.error("Password too short");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: np });
    if (error) toast.error(error.message);
    else toast.success("Password updated");
  }

  async function signOutAll() {
    const supabase = createClient();
    await supabase.auth.signOut({ scope: "global" });
    router.push("/login");
  }

  async function exportData() {
    window.location.href = "/api/account/export";
  }

  async function deleteAccount() {
    if (!confirm("Delete your account? All resumes and data will be permanently removed. This cannot be undone.")) return;
    if (!confirm("Are you absolutely sure? Type 'DELETE' to confirm in the next prompt.")) return;
    const c = prompt("Type DELETE to confirm:");
    if (c !== "DELETE") return toast.error("Cancelled, confirmation didn't match");
    setDeleting(true);
    const res = await fetch("/api/account/delete", { method: "POST" });
    setDeleting(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      return toast.error(d.error ?? "Could not delete account");
    }
    toast.success("Account deleted");
    router.push("/");
  }

  return (
    <div className="space-y-6">
      <div className="flex w-full gap-1 overflow-x-auto rounded-xl bg-paper-200 p-1 sm:w-fit" role="tablist">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            role="tab"
            aria-selected={tab === t}
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-150 ${tab === t ? "bg-white text-brand shadow-paper" : "text-ink-600 hover:text-ink"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Profile" && (
        <div key="Profile" className="card step-next">
          <h2 className="font-display text-lg font-semibold">Profile</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">Full name</label>
              <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" value={profile?.email ?? ""} disabled />
              <p className="mt-1 text-[11px] text-ink-500">Contact support to change your email.</p>
            </div>
            <div>
              <label className="label">Career stage</label>
              <select className="input" value={userType} onChange={(e) => setUserType(e.target.value as UserType)}>
                <option value="fresher">Fresher (entry-level)</option>
                <option value="intermediate">Intermediate (1–5 yrs)</option>
                <option value="professional">Professional (5+ yrs)</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <button onClick={saveProfile} disabled={loading} className="btn-primary">
              {loading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      )}

      {tab === "Account" && (
        <div key="Account" className="step-next space-y-4">
          <div className="card">
            <h2 className="font-display text-lg font-semibold">Password</h2>
            <p className="mt-1 text-sm text-ink-600">Change your password here. Use a strong, unique password.</p>
            <button onClick={changePassword} className="btn-secondary mt-4">Change password</button>
          </div>
          <div className="card">
            <h2 className="font-display text-lg font-semibold">Sessions</h2>
            <p className="mt-1 text-sm text-ink-600">Sign out of all devices where you're currently logged in.</p>
            <button onClick={signOutAll} className="btn-secondary mt-4">Sign out everywhere</button>
          </div>
          <div className="card border-rust-200 bg-rust-50">
            <h2 className="font-display text-lg font-semibold text-rust">Delete account</h2>
            <p className="mt-1 text-sm text-rust/80">Permanently delete your account and all associated data. Cannot be undone.</p>
            <button onClick={deleteAccount} disabled={deleting} className="btn-danger mt-4">
              {deleting ? "Deleting..." : "Delete my account"}
            </button>
          </div>
        </div>
      )}

      {tab === "Subscription" && (
        <div key="Subscription" className="card step-next">
          <h2 className="font-display text-lg font-semibold">Plan & credits</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-line bg-paper-50 p-4">
              <div className="text-xs uppercase tracking-wider text-ink-500">Current plan</div>
              <div className="mt-1 font-display text-xl font-semibold capitalize">{(profile?.plan ?? "free").replace("_", " ")}</div>
            </div>
            <div className="rounded-lg border border-line p-4">
              <div className="text-xs uppercase tracking-wider text-ink-500">Credits remaining</div>
              <div className="mt-1 font-display text-xl font-semibold">{profile?.credits_remaining ?? 0}</div>
            </div>
            <div className="rounded-lg border border-line p-4">
              <div className="text-xs uppercase tracking-wider text-ink-500">Member since</div>
              <div className="mt-1 font-display text-xl font-semibold">
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "-"}
              </div>
            </div>
          </div>
          <Link href="/pricing" className="btn-primary mt-6 inline-flex">View plans →</Link>
        </div>
      )}

      {tab === "Privacy" && (
        <div key="Privacy" className="step-next space-y-4">
          <div className="card">
            <h2 className="font-display text-lg font-semibold">Export your data</h2>
            <p className="mt-1 text-sm text-ink-600">
              Download a JSON file containing all your profile, resumes, and payment history.
              You can re-import or use this file at any time.
            </p>
            <button onClick={exportData} className="btn-secondary mt-4">Download my data</button>
          </div>
          <div className="card">
            <h2 className="font-display text-lg font-semibold">Privacy & security</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-600">
              <li className="flex gap-2"><span className="text-brand" aria-hidden="true">&#10003;</span>Data is stored in a Supabase Postgres database</li>
              <li className="flex gap-2"><span className="text-brand" aria-hidden="true">&#10003;</span>Row-level security limits each query to your own account</li>
              <li className="flex gap-2"><span className="text-brand" aria-hidden="true">&#10003;</span>Resume generation in this demo uses a built-in mock engine, so your text is not sent to an AI provider</li>
            </ul>
            <p className="mt-4 text-xs text-ink-500">This is a portfolio demo. Use sample data rather than real personal details.</p>
          </div>
        </div>
      )}
    </div>
  );
}
