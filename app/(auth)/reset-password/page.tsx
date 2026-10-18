"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import PasswordStrength, { passwordScore } from "@/components/password-strength";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { toast.error("Passwords don't match"); return; }
    if (passwordScore(password).score < 2) { toast.error("Password too weak"); return; }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated. Signing you in...");
      router.push("/dashboard");
    } catch (e: any) {
      toast.error(e?.message ?? "Reset failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink-600 transition hover:text-ink">← Back</Link>
      <div className="rounded-2xl border border-line bg-white p-6 shadow-lift sm:p-8">
        <h1 className="font-display text-[32px] font-medium leading-tight">Set a new password</h1>
        <p className="mt-1 text-sm text-ink-600">Choose something strong you'll remember.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="label">New password</label>
            <input type="password" className="input text-ink" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <PasswordStrength password={password} />
          </div>
          <div>
            <label className="label">Confirm</label>
            <input type="password" className="input text-ink" required value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </div>
          <button className="btn-primary w-full" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}
