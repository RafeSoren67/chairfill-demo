import { RevenueLeakCalculator } from "../components/RevenueLeakCalculator";
import { DemoFlow } from "./demo-flow";

export const metadata = {
  title: "ChairFill Demo | Local Office Brain Simulation",
  description:
    "A local-only scripted demo that shows ChairFill recovering missed patient opportunities and logging booked revenue.",
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#091525]">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="/" className="text-xl font-semibold tracking-tight">
            ChairFill
          </a>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="hidden rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-[#07182f] sm:inline-flex"
            >
              Landing page
            </a>
            <a
              href="/book-meeting"
              className="rounded-full bg-[#07182f] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Book meeting
            </a>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0d4f8b]">
            Interactive local demo
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#07182f] sm:text-5xl">
            Watch ChairFill Turn a Patient Reply Into Recovered Revenue
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Try a deterministic, ChatGPT-style office brain that adapts tone,
            collects missing details, offers slots, confirms bookings, and logs
            revenue without making any external API calls.
          </p>
        </div>
        <DemoFlow />
      </section>
      <RevenueLeakCalculator />
    </main>
  );
}
