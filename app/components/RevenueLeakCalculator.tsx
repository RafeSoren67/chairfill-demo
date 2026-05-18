"use client";

import { useMemo, useState } from "react";

type CalculatorState = {
  dailyCalls: number;
  missedRate: number;
  newPatientShare: number;
  avgVisitValue: number;
  responseDelay: number;
  monthlyReviews: number;
};

const defaults: CalculatorState = {
  dailyCalls: 45,
  missedRate: 32,
  newPatientShare: 28,
  avgVisitValue: 375,
  responseDelay: 18,
  monthlyReviews: 8,
};

const workingDays = 22;
const closeRate = 0.62;
const chairFillRecoveryRate = 0.48;
const monthlyInvestment = 1997;

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

export function RevenueLeakCalculator() {
  const [values, setValues] = useState<CalculatorState>(defaults);
  const [hasCalculated, setHasCalculated] = useState(false);

  const results = useMemo(() => {
    const missedCalls =
      values.dailyCalls * (values.missedRate / 100) * workingDays;
    const patientOpportunities = missedCalls * (values.newPatientShare / 100);
    const delayPenalty = Math.min(values.responseDelay / 60, 0.35);
    const adjustedCloseRate = closeRate * (1 + delayPenalty);
    const monthlyLoss =
      patientOpportunities * adjustedCloseRate * values.avgVisitValue;
    const annualLoss = monthlyLoss * 12;
    const recoveredRevenue = monthlyLoss * chairFillRecoveryRate;
    const patientsRecovered = recoveredRevenue / values.avgVisitValue;
    const reviewsGained = Math.max(
      2,
      Math.round(patientsRecovered * 0.28 + values.monthlyReviews * 0.18),
    );
    const roi = ((recoveredRevenue - monthlyInvestment) / monthlyInvestment) * 100;

    return {
      monthlyLoss,
      annualLoss,
      recoveredRevenue,
      patientsRecovered,
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
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#07182f] sm:text-4xl">
            See How Much Revenue You’re Losing Right Now
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Find out how much money your practice is likely losing from missed
            calls, slow follow-up, and low reactivation. Enter a few quick
            numbers and see your estimated revenue leak instantly.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
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
                label="New patient opportunity rate"
                suffix="%"
                value={values.newPatientShare}
                max={100}
                onChange={(value) => updateField("newPatientShare", value)}
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

            <button
              type="button"
              onClick={() => setHasCalculated(true)}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#07182f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0b2445] sm:w-auto"
            >
              Calculate My Revenue Leak
            </button>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-[#07182f]">
                How the estimate works
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Based on daily calls, missed rate, new patient share, estimated
                close rate, first-visit value, and {workingDays} working days.
                Lead response delay adds a conservative urgency adjustment.
              </p>
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">
              This estimate is based on your inputs and typical practice
              conversion behavior. Actual results vary by office size, service
              mix, and follow-up process.
            </p>
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
                  "Patients Recovered With ChairFill",
                  `${formatNumber(results.patientsRecovered)} / mo`,
                ],
                [
                  "Estimated Reviews Gained",
                  `${formatNumber(results.reviewsGained)} / mo`,
                ],
                [
                  "Projected ROI",
                  `${Math.max(0, Math.round(results.roi))}%`,
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
                    Recovered with ChairFill
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Estimated monthly recovery potential
                  </p>
                </div>
                <p className="text-2xl font-semibold text-[#07182f]">
                  {formatCurrency(results.recoveredRevenue)}
                </p>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-[#0d4f8b] transition-all"
                  style={{ width: `${results.leakPercent}%` }}
                />
              </div>
            </div>

            {hasCalculated ? (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-lg font-semibold text-[#07182f]">
                  See How ChairFill Recovers This Revenue
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Your estimate points to a meaningful patient revenue leak.
                  The interactive demo shows how missed communications get
                  followed up, booked, and logged.
                </p>
                <a
                  href="/demo"
                  className="mt-4 inline-flex rounded-full bg-[#07182f] px-5 py-3 text-sm font-semibold text-white"
                >
                  View Demo
                </a>
              </div>
            ) : null}
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
                "Missed leads get instant follow-up.",
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
      </div>
    </section>
  );
}
