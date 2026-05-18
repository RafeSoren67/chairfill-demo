export type PricingPlan = {
  name: string;
  badge?: string;
  price: string;
  cadence: string;
  description: string;
  buttonLabel: string;
  highlighted?: boolean;
  features: string[];
};

export function PricingCard({
  plan,
  demoUrl,
}: {
  plan: PricingPlan;
  demoUrl: string;
}) {
  return (
    <article
      className={[
        "flex h-full flex-col rounded-3xl border p-6 shadow-sm shadow-black/[0.02]",
        plan.highlighted
          ? "border-[#d8d2ff] bg-[#F7F5FF]"
          : "border-[#E5E7EB] bg-white",
      ].join(" ")}
    >
      <div className="min-h-8">
        {plan.badge ? (
          <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#635BFF] ring-1 ring-[#d8d2ff]">
            {plan.badge}
          </span>
        ) : null}
      </div>
      <h3 className="mt-4 text-xl font-semibold tracking-tight">{plan.name}</h3>
      <div className="mt-5">
        <p className="text-3xl font-semibold tracking-tight">{plan.price}</p>
        <p className="mt-2 min-h-12 text-sm leading-6 text-[#6B7280]">
          {plan.cadence}
        </p>
      </div>
      <p className="mt-4 min-h-14 leading-7 text-[#6B7280]">{plan.description}</p>
      <a
        href={demoUrl}
        style={{ color: "#FFFFFF" }}
        className={[
          "mt-6 inline-flex w-full justify-center rounded-full px-4 py-3 text-sm font-semibold text-white transition",
          plan.highlighted
            ? "bg-[#635BFF] hover:bg-[#554cf0]"
            : "bg-black hover:bg-[#222222]",
        ].join(" ")}
      >
        {plan.buttonLabel}
      </a>
      <ul className="mt-7 space-y-3 text-sm leading-6 text-[#111111]">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#111111] text-[10px] text-white"
            >
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
