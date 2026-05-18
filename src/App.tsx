import { CallDemo } from "./components/CallDemo";
import { PricingCard, type PricingPlan } from "./components/PricingCard";

const demoUrl =
  "https://calendly.com/maddexternes-chairfill-demo/chairfill-front-desk-demo";

const pricingPlans: PricingPlan[] = [
  {
    name: "Call Shield",
    price: "$597 setup",
    cadence: "$297 USD / location / month",
    description: "Filter junk calls before they reach your staff",
    buttonLabel: "Starter protection",
    features: [
      "AI answers inbound calls first",
      "Filters spam and robocalls",
      "Screens sales pitches",
      "Routes real customers to office",
      "Basic call summaries",
      "Simple call log",
    ],
  },
  {
    name: "Front Desk Pro",
    badge: "Most Popular",
    price: "$2,497 setup",
    cadence: "$1,497 USD / location / month",
    description: "Protect your staff and recover more leads",
    buttonLabel: "Choose Front Desk Pro",
    highlighted: true,
    features: [
      "Everything in Call Shield",
      "Missed call text-back",
      "Lead capture into CRM",
      "After-hours response",
      "Emergency prioritization",
      "Review request automation",
      "Call analytics dashboard",
    ],
  },
  {
    name: "Revenue System",
    price: "$4,997 setup",
    cadence: "$2,997 USD / location / month",
    description: "Full inbound lead conversion system",
    buttonLabel: "Upgrade to Revenue System",
    features: [
      "Everything in Front Desk Pro",
      "Full lead nurture system",
      "Old lead reactivation",
      "AI qualification workflows",
      "Advanced CRM automations",
      "Monthly optimization",
      "Priority support",
    ],
  },
  {
    name: "Multi-Location",
    price: "Custom",
    cadence: "pricing for 3+ offices",
    description: "Centralized front desk protection for groups",
    buttonLabel: "Book Group Demo",
    features: [
      "Per-office routing rules",
      "Shared CRM reporting",
      "Location-level analytics",
      "Standardized follow-up",
      "Discounted additional offices",
      "Group performance dashboard",
      "Dedicated onboarding",
    ],
  },
];

const steps = [
  {
    title: "Calls hit ChairFill first",
    description: "ChairFill screens the call before it reaches your team.",
  },
  {
    title: "Junk gets filtered, real opportunities get captured",
    description:
      "Spam, robocalls, and sales pitches are separated from real customers.",
  },
  {
    title: "Your team sees cleaner calls and better follow-up",
    description:
      "Missed calls, after-hours leads, and new inquiries are pushed into a simple system.",
  },
];

export default function App() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111]">
      <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-[#FAFAFA]/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="text-lg font-semibold tracking-tight">
            ChairFill
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-[#6B7280] md:flex">
            <a className="transition hover:text-[#111111]" href="#pricing">
              Pricing
            </a>
            <a className="transition hover:text-[#111111]" href="#how-it-works">
              How It Works
            </a>
            <a className="transition hover:text-[#111111]" href="#demo">
              Demo
            </a>
          </div>
          <a
            href={demoUrl}
            style={{ color: "#FFFFFF" }}
            className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#222222]"
          >
            Book Demo
          </a>
        </nav>
      </header>

      <section
        id="top"
        className="mx-auto flex max-w-4xl flex-col items-center px-5 pb-20 pt-24 text-center sm:px-6 sm:pb-24 sm:pt-28 lg:px-8"
      >
        <p className="mb-5 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#6B7280]">
          Built for dental offices and local service businesses.
        </p>
        <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          Upgrade your front desk
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[#6B7280] sm:text-xl">
          ChairFill answers first, filters junk calls, captures missed
          opportunities, and helps your team focus on real customers.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href={demoUrl}
            style={{ color: "#FFFFFF" }}
            className="rounded-full bg-[#635BFF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#554cf0]"
          >
            Book a Demo
          </a>
          <a
            href="#pricing"
            className="rounded-full border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition hover:border-[#cfd3dc]"
          >
            View Pricing
          </a>
        </div>
      </section>

      <section
        id="pricing"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#635BFF]">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple plans by location
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#6B7280]">
            Choose front desk protection that matches your call volume and
            follow-up needs.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} demoUrl={demoUrl} />
          ))}
        </div>
      </section>

      <section id="demo" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#635BFF]">
            Demo
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            See ChairFill filter calls in real time
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#6B7280]">
            Click a call type below, watch how ChairFill handles it, then send a
            sample text to see the follow-up response.
          </p>
        </div>
        <CallDemo />
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8"
      >
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#635BFF]">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Cleaner calls, cleaner follow-up
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-3xl border border-[#E5E7EB] bg-white p-7"
            >
              <div className="mb-8 flex size-10 items-center justify-center rounded-full bg-[#F7F5FF] text-sm font-semibold text-[#635BFF]">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-4 leading-7 text-[#6B7280]">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#E5E7EB] bg-white px-6 py-14 text-center sm:px-10 lg:px-16">
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Stop letting bad calls and missed follow-up drain your front desk.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#6B7280]">
            Book a short demo and see how ChairFill protects your team and
            captures more real opportunities.
          </p>
          <a
            href={demoUrl}
            style={{ color: "#FFFFFF" }}
            className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#222222]"
          >
            Book Demo
          </a>
        </div>
      </section>

      <footer className="border-t border-[#E5E7EB] px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-[#6B7280] sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-[#111111]">ChairFill</p>
          <p>chairfill.co</p>
        </div>
      </footer>
    </main>
  );
}
