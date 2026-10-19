import { createClient } from "@/lib/supabase/server";
import PricingPlans from "@/components/pricing-plans";

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user
    ? await supabase.from("profiles").select("plan").eq("id", user.id).single()
    : { data: null };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="eyebrow">Pricing</div>
        <h1 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-medium leading-tight sm:text-5xl">
          Pick the plan that fits your <em className="font-normal italic text-brand">career stage</em>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-600">Start free. Upgrade when you need more resumes, all templates and the job matcher.</p>
        <p className="mx-auto mt-4 max-w-xl rounded-lg border border-gold/40 bg-gold-50 px-4 py-2 text-xs text-gold-700">
          Demo checkout: buying a plan is simulated, no card is charged and no Stripe payment happens.
        </p>
      </div>
      <PricingPlans currentPlan={(profile?.plan as any) ?? "free"} />
    </div>
  );
}
