const demoUrl = "/demo";
const calculatorUrl = "/revenue-calculator";
const meetingUrl = "/book-meeting";

const revenueLeaks = [
  {
    title: "Missed inbound calls",
    text: "Patients often call while staff are busy and never try again.",
  },
  {
    title: "Slow lead response",
    text: "Inquiry urgency drops quickly when follow-up is delayed.",
  },
  {
    title: "Low review volume",
    text: "Satisfied patients leave without ever being asked for feedback.",
  },
  {
    title: "Inactive patients",
    text: "Past patients quietly disappear without reminders or reactivation.",
  },
  {
    title: "Front desk overload",
    text: "Busy staff prioritize urgent tasks and follow-up slips.",
  },
  {
    title: "No-show appointments",
    text: "Missed appointments create avoidable schedule gaps.",
  },
  {
    title: "After-hours inquiries",
    text: "Patients searching at night often move to competitors by morning.",
  },
  {
    title: "Treatment plan drop-off",
    text: "Interested patients delay decisions and never return.",
  },
  {
    title: "Untracked revenue leakage",
    text: "Most practices do not know where opportunities are being lost.",
  },
];

const plans = [
  {
    tier: "Starter",
    title: "Call Screen Agent",
    price: "$997/month",
    cadence: "per month, per location",
    description: "For practices that want missed calls handled immediately.",
    features: [
      "Missed call recovery",
      "Instant text-back",
      "Lead qualification",
    ],
  },
  {
    tier: "Growth",
    title: "Lead Capture + Follow-Up",
    price: "$1,997/month",
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
    tier: "Premium",
    title: "Full Patient Growth System",
    price: "$3,500+/month",
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

function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0d4f8b]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#07182f] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-8 text-slate-600">{text}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-white text-[#091525]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="/" className="text-xl font-semibold tracking-tight">
            ChairFill
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a className="transition hover:text-[#07182f]" href="#problem">
              Problem
            </a>
            <a className="transition hover:text-[#07182f]" href="#plans">
              Plans
            </a>
            <a
              className="transition hover:text-[#07182f]"
              href={calculatorUrl}
            >
              Revenue Calculator
            </a>
            <a className="transition hover:text-[#07182f]" href={demoUrl}>
              Demo
            </a>
          </div>
          <a
            href={calculatorUrl}
            className="rounded-full bg-[#07182f] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b2445]"
          >
            Calculate Revenue Leak
          </a>
        </nav>
      </header>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-[#0d4f8b]">
              Patient revenue recovery for dental offices and med spas
            </p>
            <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-tight text-[#07182f] sm:text-6xl lg:text-7xl">
              Turn Missed Patient Opportunities Into Booked Appointments
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-700">
              ChairFill helps practices recover revenue from missed calls, slow
              follow-up, low review volume, and inactive patients.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={calculatorUrl}
                className="inline-flex items-center justify-center rounded-full bg-[#07182f] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b2445]"
              >
                Calculate Revenue Leak
              </a>
              <a
                href={demoUrl}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-[#07182f] transition hover:border-[#0d4f8b]"
              >
                View Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="The revenue leak problem"
            title="What Practices Lose Every Day"
            text="Missed calls and delayed follow-up create quiet revenue leaks that are easy to overlook during a busy clinic day."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {revenueLeaks.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-xl font-semibold text-[#07182f]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1fr_auto] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0d4f8b]">
              Revenue calculator
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#07182f] sm:text-4xl">
              Not Sure How Much Revenue Is Leaking?
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Estimate how much your practice may be losing from missed calls,
              delayed follow-up, and inconsistent reactivation.
            </p>
          </div>
          <a
            href={calculatorUrl}
            className="inline-flex items-center justify-center rounded-full bg-[#07182f] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0b2445]"
          >
            Calculate Revenue Leak
          </a>
        </div>
      </section>

      <section id="plans" className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Pricing plans"
            title="Choose the level of recovery your practice needs"
            text="Each plan is priced against recovered patient opportunities, not software seats or feature clutter."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.title}
                className={`rounded-2xl border bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md ${
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
                  {plan.title}
                </h3>
                <p className="mt-4 text-4xl font-semibold tracking-tight text-[#07182f]">
                  {plan.price.replace("/month", "")}
                </p>
                <p className="mt-1 text-sm text-slate-500">{plan.cadence}</p>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {plan.description}
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={calculatorUrl}
                  className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                    plan.highlighted
                      ? "bg-[#07182f] text-white hover:bg-[#0b2445]"
                      : "border border-slate-300 bg-white text-[#07182f] hover:border-[#0d4f8b]"
                  }`}
                >
                  Estimate fit
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1fr_auto] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0d4f8b]">
              Interactive demo
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#07182f] sm:text-4xl">
              See a Missed Patient Opportunity Become a Booking
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Watch a sample follow-up flow recover a lead and estimate
              recovered revenue.
            </p>
          </div>
          <a
            href={demoUrl}
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-[#07182f] transition hover:border-[#0d4f8b]"
          >
            View Demo
          </a>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0d4f8b]">
            Early Partner Program
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#07182f] sm:text-4xl">
            Early Partner Program
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            ChairFill is currently being tested with local practices to measure
            missed-call recovery, review growth, and follow-up performance.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-lg leading-8 text-slate-600">
            Interested in becoming an early implementation partner?
          </p>
          <a
            href={meetingUrl}
            className="mt-7 inline-flex items-center justify-center rounded-full bg-[#07182f] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0b2445]"
          >
            Book Demo
          </a>
        </div>
      </section>

      <section className="bg-[#07182f] px-5 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-200">
            Final step
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Ready to Stop the Revenue Leak?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            See how ChairFill could fit your practice.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={meetingUrl}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#07182f] transition hover:bg-slate-100"
            >
              Book Demo
            </a>
            <a
              href={calculatorUrl}
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Calculate Revenue Leak
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-6 rounded-2xl border border-slate-200 bg-[#f8fafc] p-8 shadow-sm lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#07182f]">
              Want a Custom Revenue Leak Assessment?
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              ChairFill can estimate where opportunities may be slipping through
              the cracks based on your current workflow.
            </p>
          </div>
          <a
            href={meetingUrl}
            className="inline-flex items-center justify-center rounded-full bg-[#07182f] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0b2445]"
          >
            Request Audit
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
          <div className="flex flex-wrap gap-6">
            <a className="transition hover:text-[#07182f]" href={calculatorUrl}>
              Calculator
            </a>
            <a className="transition hover:text-[#07182f]" href={demoUrl}>
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
