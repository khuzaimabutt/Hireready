import Link from "next/link";
import { LogoMark } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="paper-grain min-h-screen text-ink">
      <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
        <LogoMark className="h-10 w-10" />
        <div className="mt-8 font-display text-[120px] font-light italic leading-none text-ink-300">404</div>
        <h1 className="mt-4 font-display text-4xl font-medium">Page not found</h1>
        <p className="mt-3 text-ink-600">The page you are looking for does not exist or has moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Back home</Link>
          <Link href="/dashboard" className="btn-ghost">Go to dashboard</Link>
        </div>
      </main>
    </div>
  );
}
