"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import OAuthButtons from "@/components/oauth-buttons";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-ink-600">Loading...</div>}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Signed in. Welcome back!");
      router.push(next);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink-600 transition hover:text-ink">← Back</Link>
      <div className="rounded-2xl border border-line bg-white p-6 shadow-lift sm:p-8">
        <h1 className="font-display text-[32px] font-medium leading-tight">Welcome back</h1>
        <p className="mt-1 text-sm text-ink-600">Sign in to continue building.</p>

        <div className="mt-6">
          <OAuthButtons next={next} />
        </div>

        <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-widest text-ink-500">
          <div className="h-px flex-1 bg-line" />
          or with email
          <div className="h-px flex-1 bg-line" />
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input type="email" autoComplete="email" className="input text-ink" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="block text-[13px] font-semibold text-ink-700">Password</label>
              <Link href="/forgot-password" className="text-xs text-brand hover:underline">Forgot?</Link>
            </div>
            <div className="relative">
              <input type={showPwd ? "text" : "password"} autoComplete="current-password" className="input pr-10 text-ink" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShowPwd((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-ink-500 hover:text-ink-700">
                {showPwd ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button className="btn-primary w-full" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-ink-600">
          Don't have an account? <Link href="/signup" className="text-brand hover:underline">Sign up free</Link>
        </div>
      </div>
    </div>
  );
}
