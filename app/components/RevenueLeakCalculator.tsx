"use client";

import { useMemo, useState } from "react";

type CalculatorState = {
  dailyCalls: number;
  missedRate: number;
  newPatientInquiriesPerWeek: number;
  avgVisitValue: number;
  responseDelay: number;
  monthlyReviews: number;
};

type PlanKey = "starter" | "recommended" | "premium";

type ChairFillPlan = {
  key: PlanKey;
  tier: "Starter" | "Recommended" | "Premium";
  title: string;
  description: string;
  monthlyPrice: number;
  priceLabel: string;
  features: string[];
  recoveryRate: number;
  bestFit: string;
  comparisonBestFor: string;
  comparisonRecommendation: string;
  highlighted?: boolean;
};

const defaults: CalculatorState = {
  dailyCalls: 24,
  missedRate: 10,
  newPatientInquiriesPerWeek: 18,
  avgVisitValue: 275,
  responseDelay: 12,
  monthlyReviews: 5,
};

const workingDays = 22;
const closeRate = 0.62;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const plans: ChairFillPlan[] = [
  {
    key: "starter",
    tier: "Starter",
    title: "Call Screen Agent",
    description: "For practices that want missed calls handled immediately.",
    monthlyPrice: 997,
    priceLabel: "$997/month per location",
    features: ["Missed call recovery", "Instant text-back", "Lead qualification"],
    recoveryRate: 0.25,
    bestFit:
      "Practices that need a simple first layer for missed calls, instant text-back, and lead qualification.",
    comparisonBestFor: "Practices mainly needing missed-call recovery",
    comparisonRecommendation: "Low-volume offices",
  },
  {
    key: "recommended",
    tier: "Recommended",
    title: "Lead Capture + Follow-Up",
    description: "The best fit for most clinics with active marketing spend.",
    monthlyPrice: 1997,
    priceLabel: "$1,997/month per location",
    features: [
      "Everything in Call Screen Agent",
      "Automated follow-up",
      "Review generation",
      "Booking reminders",
    ],
    recoveryRate: 0.4,
    bestFit:
      "Practices that are already getting leads but need faster follow-up, stronger review generation, and better booking consistency.",
    comparisonBestFor: "Practices with active marketing and delayed follow-up",
    comparisonRecommendation: "Most common fit",
    highlighted: true,
  },
  {
    key: "premium",
    tier: "Premium",
    title: "Full Patient Growth System",
    description:
      "For offices that want the full recovery and retention system.",
    monthlyPrice: 3500,
    priceLabel: "$3,500+/month based on growth goals",
    features: [
      "Everything in Lead Capture + Follow-Up",
      "Reactivation campaigns",
      "Review generation",
      "No-show prevention",
      "Revenue dashboard",
    ],
    recoveryRate: 0.55,
    bestFit:
      "Growth-focused practices that want missed-call recovery, lead follow-up, reactivation, reviews, no-show prevention, and revenue visibility working together.",
    comparisonBestFor: "Practices focused on retention and growth",
    comparisonRecommendation: "Highest recovery potential",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

function formatRoiValue(roi: number) {
  if (roi <= 0) return "Needs more volume";

  return `${Math.max(1, Math.round(roi))}%`;
}

function getRecommendationKey(
  values: CalculatorState,
  monthlyLoss: number,
): PlanKey {
  const highMissedCallRate = values.missedRate >= 18;

  if (
    monthlyLoss > 5000 ||
    values.dailyCalls > 40 ||
    values.monthlyReviews < 5 ||
    highMissedCallRate ||
    values.responseDelay > 20
  ) {
    return "premium";
  }

  if (
    monthlyLoss < 2000 ||
    values.dailyCalls < 20 ||
    values.missedRate < 10
  ) {
    return "starter";
  }

  if (
    monthlyLoss <= 5000 ||
    values.dailyCalls <= 40 ||
    values.monthlyReviews < 8 ||
    values.responseDelay > 10
  ) {
    return "recommended";
  }

  return "recommended";
}

function getRecommendationCopy(planKey: PlanKey) {
  if (planKey === "premium") {
    return {
      badge: "Highest Recovery Potential",
      reasoning:
        "Your numbers suggest broader leakage across follow-up, reactivation, and retention. Premium is designed for practices wanting a full recovery and patient growth system.",
      bestFor:
        "Practices with meaningful marketing spend or multi-location growth goals.",
    };
  }

  if (planKey === "starter") {
    return {
      badge: "",
      reasoning:
        "Your numbers suggest moderate leakage, mostly from missed calls and delayed follow-up. Starter is likely enough to recover basic opportunities without adding complexity.",
      bestFor:
        "Practices wanting simple missed-call recovery and lead qualification.",
    };
  }

  return {
    badge: "Most Common Recommendation",
    reasoning:
      "Your practice appears to have active lead flow, but delayed follow-up and low review volume may be creating avoidable leakage. Growth adds automation and review generation beyond missed calls alone.",
    bestFor:
      "Practices already getting leads but losing momentum after inquiries.",
  };
}

function Field({
  label,
  suffix,
  prefix,
  value,
  min = 0,
  max,
  onChange,
}: {
  label: string;
  suffix?: string;
  prefix?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#07182f]">{label}</span>
      <div className="mt-2 flex min-h-12 items-center rounded-xl border border-slate-300 bg-white px-4 focus-within:border-[#0d4f8b]">
        {prefix ? (
          <span className="mr-2 text-sm font-semibold text-slate-500">
            {prefix}
          </span>
        ) : null}
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full bg-transparent text-base font-semibold text-[#07182f] outline-none"
        />
        {suffix ? (
          <span className="ml-2 text-sm font-semibold text-slate-500">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}

function Disclaimer() {
  return (
    <p className="text-xs leading-5 text-slate-500">
      Estimates are directional and depend on call volume, staff workflow, offer
      quality, and booking conversion. ChairFill is designed to recover a
      portion of leaked revenue, not guarantee exact revenue.
    </p>
  );
}

export function RevenueLeakCalculator() {
  const [values, setValues] = useState<CalculatorState>(defaults);

  const results = useMemo(() => {
    const rawNewPatientRate =
      values.dailyCalls > 0
        ? (values.newPatientInquiriesPerWeek / 5 / values.dailyCalls) * 100
        : 5;
    const calculatedNewPatientRate = clamp(rawNewPatientRate, 5, 40);
    const missedCalls =
      values.dailyCalls * (values.missedRate / 100) * workingDays;
    const patientOpportunities =
      missedCalls * (calculatedNewPatientRate / 100);
    const delayPenalty = Math.min(values.responseDelay / 60, 0.35);
    const adjustedCloseRate = closeRate * (1 + delayPenalty);
    const monthlyLoss =
      patientOpportunities * adjustedCloseRate * values.avgVisitValue;
    const annualLoss = monthlyLoss * 12;
    const recommendedPlanKey = getRecommendationKey(values, monthlyLoss);
    const recommendedPlan =
      plans.find((plan) => plan.key === recommendedPlanKey) ?? plans[1];
    const recoveryEstimate = monthlyLoss * recommendedPlan.recoveryRate;
    const monthlyLow = recoveryEstimate * 0.85;
    const monthlyHigh = recoveryEstimate * 1.15;
    const annualLow = monthlyLow * 12;
    const annualHigh = monthlyHigh * 12;
    const patientsRecoverable = recoveryEstimate / values.avgVisitValue;
    const reviewsGained = Math.max(
      2,
      Math.round(patientsRecoverable * 0.28 + values.monthlyReviews * 0.18),
    );
    const roi =
      ((recoveryEstimate - recommendedPlan.monthlyPrice) /
        recommendedPlan.monthlyPrice) *
      100;

    return {
      monthlyLoss,
      annualLoss,
      calculatedNewPatientRate,
      recommendedPlan,
      recommendationCopy: getRecommendationCopy(recommendedPlan.key),
      recoveryEstimate,
      monthlyLow,
      monthlyHigh,
      annualLow,
      annualHigh,
      patientsRecoverable,
      reviewsGained,
      roi,
      leakPercent: Math.min(100, Math.round(values.missedRate * 1.8)),
    };
  }, [values]);

  function updateField(field: keyof CalculatorState, value: number) {
    setValues((existing) => ({
      ...existing,
      [field]: Number.isFinite(value) ? Math.max(0, value) : 0,
    }));
  }

  return (
    <section
      id="calculator"
      className="border-y border-slate-200 bg-white px-5 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0d4f8b]">
            Revenue leak assessment
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#07182f] sm:text-5xl">
            See How Much Revenue You’re Losing Right Now
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Find out how much money your practice is likely losing from missed
            calls, slow follow-up, and low reactivation. Enter a few quick
            numbers and see your estimated revenue leak instantly.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Average inbound calls per day"
                value={values.dailyCalls}
                onChange={(value) => updateField("dailyCalls", value)}
              />
              <Field
                label="Missed call rate"
                suffix="%"
                value={values.missedRate}
                max={100}
                onChange={(value) => updateField("missedRate", value)}
              />
              <Field
                label="New patient inquiries per week"
                value={values.newPatientInquiriesPerWeek}
                onChange={(value) =>
                  updateField("newPatientInquiriesPerWeek", value)
                }
              />
              <Field
                label="Average first-visit value"
                prefix="$"
                value={values.avgVisitValue}
                onChange={(value) => updateField("avgVisitValue", value)}
              />
              <Field
                label="Lead response delay"
                suffix="min"
                value={values.responseDelay}
                onChange={(value) => updateField("responseDelay", value)}
              />
              <Field
                label="Current monthly Google reviews"
                value={values.monthlyReviews}
                onChange={(value) => updateField("monthlyReviews", value)}
              />
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-[#07182f]">
                How the estimate works
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Monthly Loss = Daily Calls x Missed Rate x New Patient Share x
                Close Rate x Average Visit Value x Working Days.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Lead response delay adds a conservative urgency adjustment. This
                is a directional estimate based on your inputs.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  "Estimated Monthly Revenue Lost",
                  formatCurrency(results.monthlyLoss),
                ],
                [
                  "Estimated Annual Revenue Lost",
                  formatCurrency(results.annualLoss),
                ],
                [
                  "Patients Recoverable With ChairFill",
                  `${formatNumber(results.patientsRecoverable)} / mo`,
                ],
                [
                  "Estimated Reviews Gained",
                  `${formatNumber(results.reviewsGained)} / mo`,
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    {label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-[#07182f]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-[#0d4f8b]/20 bg-blue-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#07182f]">
                    Revenue leak pressure
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Based on missed call rate and response delay
                  </p>
                </div>
                <p className="text-2xl font-semibold text-[#07182f]">
                  {results.recommendedPlan.tier}
                </p>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-[#0d4f8b] transition-all"
                  style={{ width: `${results.leakPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#0d4f8b]/25 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0d4f8b]">
            Recommended ChairFill Plan
          </p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <p className="text-sm font-semibold text-slate-600">
                Recommended for your practice:
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#07182f]">
                {results.recommendedPlan.tier} - {results.recommendedPlan.title}
              </h2>
              {results.recommendationCopy.badge ? (
                <span className="mt-4 inline-flex rounded-full bg-[#07182f] px-3 py-1 text-xs font-semibold text-white">
                  {results.recommendationCopy.badge}
                </span>
              ) : null}

              <div className="mt-6 rounded-2xl border border-slate-200 bg-[#f8fafc] p-5">
                <p className="text-sm font-semibold text-[#07182f]">
                  Reasoning:
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {results.recommendationCopy.reasoning}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Expected recovery
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-[#07182f]">
                  {formatCurrency(results.monthlyLow)}-
                  {formatCurrency(results.monthlyHigh)}
                </p>
                <p className="mt-1 text-sm text-slate-500">per month</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Expected ROI
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-[#07182f]">
                  {formatRoiValue(results.roi)}
                </p>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:col-span-2">
                <p className="text-sm font-semibold text-[#07182f]">Best for:</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {results.recommendationCopy.bestFor}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                <a
                  href="/demo"
                  className="inline-flex items-center justify-center rounded-full bg-[#07182f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0b2445]"
                >
                  View Demo
                </a>
                <a
                  href="/book-meeting"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#07182f] hover:border-[#0d4f8b]"
                >
                  Book Assessment
                </a>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Disclaimer />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-[#f8fafc] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0d4f8b]">
            Compare All ChairFill Plans
          </p>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.key}
                className={`rounded-2xl border bg-white p-6 shadow-sm ${
                  results.recommendedPlan.key === plan.key
                    ? "border-[#0d4f8b] ring-2 ring-[#0d4f8b]/15 shadow-[0_18px_45px_rgba(13,79,139,0.12)]"
                    : "border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0d4f8b]">
                    {plan.tier}
                  </p>
                  {plan.key === "recommended" ? (
                    <span className="rounded-full bg-[#07182f] px-3 py-1 text-xs font-semibold text-white">
                      Most Recommended
                    </span>
                  ) : results.recommendedPlan.key === plan.key ? (
                    <span className="rounded-full bg-[#07182f] px-3 py-1 text-xs font-semibold text-white">
                      Recommended
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-[#07182f]">
                  {plan.title}
                </h3>
                <p className="mt-2 text-lg font-semibold text-[#07182f]">
                  {plan.priceLabel}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {plan.description}
                </p>
                <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Likely recovery
                  </p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-[#07182f]">
                    {formatCurrency(results.monthlyLoss * plan.recoveryRate * 0.85)}
                    -
                    {formatCurrency(results.monthlyLoss * plan.recoveryRate * 1.15)}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">per month</p>
                </div>
                <div className="mt-5 space-y-3 text-sm leading-6">
                  <div>
                    <p className="font-semibold text-[#07182f]">Best for:</p>
                    <p className="text-slate-600">{plan.comparisonBestFor}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#07182f]">
                      Recommendation:
                    </p>
                    <p className="text-slate-600">
                      {plan.comparisonRecommendation}
                    </p>
                  </div>
                </div>
                <ul className="mt-5 space-y-2 text-sm leading-6 text-slate-700">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div
                  className={`mt-5 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                    results.recommendedPlan.key === plan.key
                      ? "bg-[#07182f] text-white"
                      : "border border-slate-300 bg-white text-[#07182f]"
                  }`}
                >
                  {results.recommendedPlan.key === plan.key
                    ? "Recommended for you"
                    : "Compare plan"}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-5">
            <Disclaimer />
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6">
            <h3 className="text-lg font-semibold text-[#07182f]">
              Without ChairFill
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {[
                "Leads go cold.",
                "Calls are missed.",
                "Patients never book.",
                "Reviews stay flat.",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#0d4f8b]/20 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#07182f]">
              With ChairFill
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {[
                "Missed communications get instant follow-up.",
                "More patients book.",
                "Inactive patients return.",
                "Reviews increase.",
                "Revenue leak is reduced.",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/demo"
            className="inline-flex rounded-full bg-[#07182f] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#0b2445]"
          >
            View Demo
          </a>
        </div>
      </div>
    </section>
  );
}
