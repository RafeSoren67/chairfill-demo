import { RevenueLeakCalculator } from "./components/RevenueLeakCalculator";

const demoUrl = "/demo";
const meetingUrl = "/book-meeting";

const stats = [
  {
    value: "41%",
    label: "of calls unanswered.",
    note: "Every missed call can become a missed patient.",
  },
  {
    value: "Slow",
    label: "Average lead response too slow.",
    note: "Patients keep searching when follow-up waits.",
  },
  {
    value: "$",
    label: "Missed calls = lost revenue.",
    note: "Marketing spend leaks when inquiries are not captured.",
  },
  {
    value: "Rank",
    label: "Reviews directly impact rankings.",
    note: "More completed visits should become visible proof.",
  },
];

const problems = [
  "Missed inbound calls",
  "Slow response to new leads",
  "Lost leads after hours",
  "No follow-up on inquiries",
  "Old patients never reactivated",
  "Low Google review volume",
  "No-show appointments",
  "Revenue leaks after marketing spend",
  "Front desk overload",
];

const solutions = [
  {
    title: "Missed Call Recovery",
    text: "Turns unanswered calls into immediate follow-up opportunities.",
  },
  {
    title: "Instant Text-Back",
    text: "Replies quickly so interested patients do not go cold.",
  },
  {
    title: "Lead Capture and Follow-Up",
    text: "Keeps new inquiries moving until they book or clearly decline.",
  },
  {
    title: "Booking Reminders",
    text: "Protects confirmed visits and reduces avoidable gaps.",
  },
  {
    title: "Review Requests",
    text: "Turns more completed visits into Google reviews.",
  },
  {
    title: "Reactivation Campaigns",
    text: "Brings inactive patients back into the schedule.",
  },
  {
    title: "No-Show Prevention",
    text: "Catches risk before an open chair becomes lost revenue.",
  },
  {
    title: "Revenue Dashboard",
    text: "Shows recovered calls, booked patients, and revenue impact.",
  },
];

const steps = [
  {
    title: "Opportunity enters",
    text: "A lead, missed call, no-show risk, or inactive patient appears.",
  },
  {
    title: "ChairFill responds",
    text: "The patient receives fast, professional follow-up from your practice.",
  },
  {
    title: "Patient books",
    text: "Interested patients are guided back toward a booked appointment.",
  },
  {
    title: "Revenue is visible",
    text: "Your team sees recovered opportunities in a clear dashboard.",
  },
];

const pricing = [
  {
    name: "Call Screen Agent",
    tier: "Starter",
    price: "$997",
    cadence: "per month, per location",
    description: "For practices that want missed calls handled immediately.",
    features: [
      "Missed call recovery",
      "Instant text-back",
      "Lead qualification",
    ],
  },
  {
    name: "Lead Capture + Follow-Up",
    tier: "Recommended",
    price: "$1,997",
    cadence: "per month, per location",
    description: "The best fit for most clinics with active marketing spend.",
    features: [
      "Everything in Call Screen Agent",
      "Automated follow-up",
      "Review generation",
      "Booking reminders",
    ],
    highlighted: true,
  },
  {
    name: "Full Patient Growth System",
    tier: "Premium",
    price: "$3,500+",
    cadence: "per month, based on growth goals",
    description: "For offices that want the full recovery and retention system.",
    features: [
      "Everything in Lead Capture + Follow-Up",
      "Reactivation campaigns",
      "Review generation",
      "No-show prevention",
      "Revenue dashboard",
    ],
  },
];

const testimonials = [
  {
    quote:
      "We stopped losing leads after hours. The biggest change is how quickly new inquiries get followed up without adding pressure to the desk.",
    name: "Dr. Melissa Grant",
    role: "Owner, family dental practice",
  },
  {
    quote:
      "Our front desk feels less overwhelmed, and we are booking more from the same marketing spend. The ROI was easy to understand.",
    name: "Karen Liu",
    role: "Med spa founder",
  },
  {
    quote:
      "Review requests finally happen consistently. It has helped our visibility and made patient follow-up feel more organized.",
    name: "Dr. Andre Coleman",
    role: "Cosmetic dentist",
  },
];

function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0d4f8b]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#07182f] sm:text-4xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-4 text-lg leading-8 text-slate-600">{text}</p>
      ) : null}
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
      <div className="rounded-[1.25rem] border border-slate-200 bg-[#f8fafc] p-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm font-semibold text-[#07182f]">
              Revenue Recovery
            </p>
            <p className="text-xs text-slate-500">This month</p>
          </div>
          <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            +18 booked
          </div>
        </div>

        <div className="grid gap-3 py-4 sm:grid-cols-3">
          {[
            ["$42.8k", "Estimated recovered"],
            ["63", "Leads captured"],
            ["28", "Reviews requested"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <p className="text-2xl font-semibold text-[#07182f]">{value}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {[
            ["Missed call", "Text sent in 12 sec", "Booked consultation"],
            ["No-show risk", "Reminder confirmed", "Visit protected"],
            ["Inactive patient", "Recall accepted", "Hygiene scheduled"],
          ].map(([source, action, result]) => (
            <div
              key={source}
              className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm sm:grid-cols-[1fr_1fr_1fr]"
            >
              <p className="font-semibold text-[#07182f]">{source}</p>
              <p className="text-slate-600">{action}</p>
              <p className="font-medium text-emerald-700">{result}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-[0.14em] text-slate-500">
              Recovery trend
            </span>
            <span className="font-semibold text-[#0d4f8b]">steady lift</span>
          </div>
          <div className="flex h-24 items-end gap-2">
            {[38, 46, 42, 58, 66, 73, 82, 78, 88].map((height, index) => (
              <div
                key={index}
                className="w-full rounded-t-lg bg-[#0b2445]"
                style={{ height: `${height}%`, opacity: 0.35 + index * 0.06 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-white text-[#091525]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/92 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="text-xl font-semibold tracking-tight">
            ChairFill
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a className="transition hover:text-[#07182f]" href="#recovery">
              Recovery
            </a>
            <a className="transition hover:text-[#07182f]" href="#how">
              How it works
            </a>
            <a className="transition hover:text-[#07182f]" href="#pricing">
              Pricing
            </a>
          </div>
          <a
            href={demoUrl}
            className="rounded-full bg-[#07182f] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b2445]"
          >
            View Demo
          </a>
        </nav>
      </header>

      <section id="top" className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-28">
          <div>
            <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-[#0d4f8b]">
              Patient revenue recovery for dental offices and med spas
            </p>
            <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-tight text-[#07182f] sm:text-6xl lg:text-7xl">
              Turn Missed Communications Into Booked Patients
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-700">
              Recover revenue from missed calls, slow follow-up, and patient
              drop-off.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              ChairFill helps your practice capture lost opportunities,
              respond faster, and bring patients back into the schedule without
              replacing the front desk.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={demoUrl}
                className="inline-flex items-center justify-center rounded-full bg-[#07182f] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b2445]"
              >
                View Demo
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-[#07182f] transition hover:border-[#0d4f8b]"
              >
                See Plans
              </a>
            </div>
            <div className="mt-8 grid max-w-xl gap-3 text-sm text-slate-600 sm:grid-cols-3">
              <p>Built for owner-led practices</p>
              <p>Fast local deployment</p>
              <p>Clear ROI reporting</p>
            </div>
          </div>
          <DashboardMockup />
        </div>
      </section>

      <section className="bg-[#f8fafc] px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-4xl font-semibold tracking-tight text-[#07182f]">
                {stat.value}
              </p>
              <h3 className="mt-3 text-base font-semibold text-[#07182f]">
                {stat.label}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {stat.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="recovery" className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Revenue leaks"
            title="What Practices Lose Every Day"
            text="Most practices are already paying for demand. The loss happens when calls, leads, reviews, and reactivation work fall through the cracks."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem) => (
              <article
                key={problem}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 h-1.5 w-12 rounded-full bg-[#0d4f8b]" />
                <h3 className="text-lg font-semibold text-[#07182f]">
                  {problem}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  A small workflow gap that can quietly become a measurable
                  revenue leak.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Recovery system"
            title="How ChairFill Recovers Revenue"
            text="ChairFill focuses on the moments that decide whether a patient books, returns, reviews, or disappears."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution) => (
              <article
                key={solution.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-[#07182f]">
                  {solution.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {solution.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Simple workflow"
            title="From Missed Opportunity to Recovered Revenue"
            text="The process is intentionally simple, so an owner can understand the value before the demo is over."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-full bg-[#07182f] text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-[#07182f]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-[#f8fafc] px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Pricing"
            title="Priced Against Recovered Revenue"
            text="Choose the level of recovery your practice needs. The goal is not more software. The goal is more booked patients from opportunities you already have."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {pricing.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-2xl border bg-white p-7 shadow-sm ${
                  plan.highlighted
                    ? "border-[#0d4f8b] ring-2 ring-[#0d4f8b]/15"
                    : "border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0d4f8b]">
                    {plan.tier}
                  </p>
                  {plan.highlighted ? (
                    <span className="rounded-full bg-[#07182f] px-3 py-1 text-xs font-semibold text-white">
                      Best fit
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-[#07182f]">
                  {plan.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {plan.description}
                </p>
                <div className="mt-7">
                  <span className="text-4xl font-semibold tracking-tight text-[#07182f]">
                    {plan.price}
                  </span>
                  <p className="mt-2 text-sm text-slate-500">{plan.cadence}</p>
                </div>
                <a
                  href={demoUrl}
                  className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                    plan.highlighted
                      ? "bg-[#07182f] text-white hover:bg-[#0b2445]"
                      : "border border-slate-300 bg-white text-[#07182f] hover:border-[#0d4f8b]"
                  }`}
                >
                  View Demo
                </a>
                <ul className="mt-7 space-y-3 text-sm leading-6 text-slate-700">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Practice owners"
            title="Built for Real Front Desk Pressure"
            text="Short, believable results from teams that needed more booked patients without adding chaos."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <blockquote className="text-base leading-7 text-slate-700">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-slate-200 pt-5">
                  <p className="font-semibold text-[#07182f]">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {testimonial.role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <RevenueLeakCalculator />

      <section
        id="demo"
        className="border-y border-slate-200 bg-[#07182f] px-5 py-20 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-200">
            Demo ready
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            See How Much Revenue You’re Losing Right Now
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            A focused demo shows where opportunities are leaking and how quickly
            ChairFill can start recovering them.
          </p>
          <a
            href={demoUrl}
            className="mt-9 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#07182f] transition hover:bg-slate-100"
          >
            View Demo
          </a>
        </div>
      </section>

      <footer className="px-5 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-[#07182f]">ChairFill</p>
            <p className="mt-1">
              Patient revenue recovery for dental offices and med spas.
            </p>
          </div>
          <div className="flex gap-6">
            <a className="transition hover:text-[#07182f]" href="#recovery">
              Recovery
            </a>
            <a className="transition hover:text-[#07182f]" href="#pricing">
              Pricing
            </a>
            <a className="transition hover:text-[#07182f]" href="#demo">
              Demo
            </a>
            <a className="transition hover:text-[#07182f]" href={meetingUrl}>
              Book meeting
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
