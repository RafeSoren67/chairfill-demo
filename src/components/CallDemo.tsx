import { FormEvent, useMemo, useState } from "react";

type ScenarioKey = "spam" | "sales" | "newPatient" | "emergency";

type Scenario = {
  key: ScenarioKey;
  label: string;
  description: string;
  callerName: string;
  callerNumber: string;
  decision: string;
  next: string;
  summary: string;
  followUp: string;
  response: string;
  quickReplies: string[];
};

const scenarios: Scenario[] = [
  {
    key: "spam",
    label: "Spam Call",
    description: "Robocall or fake insurance offer",
    callerName: "Unknown Caller",
    callerNumber: "(864) 000-1942",
    decision: "Blocked before reaching staff",
    next: "The call is logged, but your front desk is not interrupted.",
    summary: "Likely robocall. No action needed.",
    followUp: "No text sent.",
    response:
      "This call was blocked as likely spam. No patient follow-up was sent.",
    quickReplies: ["Remove me", "Stop calling"],
  },
  {
    key: "sales",
    label: "Sales Call",
    description: "Vendor trying to pitch the office",
    callerName: "Mark from SupplyCo",
    callerNumber: "(864) 555-2711",
    decision: "Filtered and sent to call log",
    next: "The caller is asked to leave details. Staff can review later without being interrupted.",
    summary: "Vendor sales pitch about office supplies. Not a patient inquiry.",
    followUp:
      "Thanks for reaching out. Our team reviews vendor inquiries separately and will follow up if interested.",
    response:
      "Thanks. Vendor messages are logged separately so your front desk can stay focused on patients.",
    quickReplies: ["Can I talk to the manager?", "I have a vendor offer"],
  },
  {
    key: "newPatient",
    label: "New Patient",
    description: "Real customer asking to book",
    callerName: "Sarah Mitchell",
    callerNumber: "(864) 555-8094",
    decision: "Qualified and routed to booking flow",
    next: "The caller receives an instant text with the booking link and their info is captured in the CRM.",
    summary:
      "New patient looking for a cleaning and exam. Prefers morning availability.",
    followUp:
      "Hi Sarah, this is Greenville Family Dental. We can help with a cleaning and exam. You can book here: [booking link]. Would morning or afternoon work better for you?",
    response:
      "Absolutely - we can help get you scheduled. What day works best for you?",
    quickReplies: [
      "I need a cleaning",
      "Do you take insurance?",
      "I want to book this week",
    ],
  },
  {
    key: "emergency",
    label: "Emergency / Urgent",
    description: "Caller needs fast attention",
    callerName: "James Carter",
    callerNumber: "(864) 555-3302",
    decision: "Prioritized and routed immediately",
    next: "The call is marked urgent, the office is notified, and the caller receives immediate next-step instructions.",
    summary: "Caller reports tooth pain and swelling. Needs urgent callback.",
    followUp:
      "Hi James, this is Greenville Family Dental. We saw your urgent request about tooth pain and swelling. Our team has been notified and will reach out as soon as possible. If this is a medical emergency, please call 911.",
    response:
      "We've marked this as urgent and notified the office. If this is a medical emergency, please call 911.",
    quickReplies: ["I have tooth pain", "My crown fell out", "I need help today"],
  },
];

type Message = {
  id: number;
  from: "visitor" | "chairfill";
  text: string;
};

export function CallDemo() {
  const [selectedKey, setSelectedKey] = useState<ScenarioKey>("newPatient");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "chairfill",
      text: "Send a sample reply to see how ChairFill responds.",
    },
  ]);

  const selected = useMemo(
    () => scenarios.find((scenario) => scenario.key === selectedKey) ?? scenarios[0],
    [selectedKey],
  );

  function selectScenario(key: ScenarioKey) {
    const nextScenario =
      scenarios.find((scenario) => scenario.key === key) ?? scenarios[0];
    setSelectedKey(key);
    setInput("");
    setMessages([
      {
        id: Date.now(),
        from: "chairfill",
        text: nextScenario.followUp,
      },
    ]);
  }

  function sendMessage(textOverride?: string) {
    const text = (textOverride ?? input).trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      { id: Date.now(), from: "visitor", text },
      { id: Date.now() + 1, from: "chairfill", text: selected.response },
    ]);
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-3">
        {scenarios.map((scenario) => {
          const isSelected = selected.key === scenario.key;
          return (
            <button
              key={scenario.key}
              type="button"
              onClick={() => selectScenario(scenario.key)}
              className={[
                "w-full rounded-3xl border p-5 text-left transition",
                isSelected
                  ? "border-[#635BFF] bg-[#F7F5FF] shadow-sm"
                  : "border-[#E5E7EB] bg-white hover:border-[#cfd3dc]",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold tracking-tight">{scenario.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                    {scenario.description}
                  </p>
                </div>
                <span
                  className={[
                    "mt-1 size-3 shrink-0 rounded-full",
                    isSelected ? "bg-[#635BFF]" : "bg-[#E5E7EB]",
                  ].join(" ")}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-[2rem] border border-[#E5E7EB] bg-white p-5 shadow-sm shadow-black/[0.02] sm:p-6 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <InfoBlock label="Caller name" value={selected.callerName} />
          <InfoBlock label="Caller number" value={selected.callerNumber} />
          <InfoBlock label="Call type" value={selected.label} />
        </div>

        <div className="mt-6 grid gap-4">
          <DetailBlock label="ChairFill decision" value={selected.decision} />
          <DetailBlock label="What happens next" value={selected.next} />
          <DetailBlock label="Staff summary" value={selected.summary} />
          <DetailBlock label="Suggested follow-up text" value={selected.followUp} />
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-[#E5E7EB] bg-[#FAFAFA] p-4 sm:p-5">
          <div className="mx-auto max-w-md overflow-hidden rounded-[2rem] border border-[#E5E7EB] bg-white shadow-sm">
            <div className="border-b border-[#E5E7EB] px-5 py-4 text-center">
              <p className="text-sm font-semibold">{selected.callerName}</p>
              <p className="text-xs text-[#6B7280]">{selected.callerNumber}</p>
            </div>
            <div className="flex h-72 flex-col gap-3 overflow-y-auto bg-[#FAFAFA] px-4 py-5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={[
                    "max-w-[86%] rounded-3xl px-4 py-3 text-sm leading-6",
                    message.from === "visitor"
                      ? "ml-auto bg-[#635BFF] text-white"
                      : "mr-auto border border-[#E5E7EB] bg-white text-[#111111]",
                  ].join(" ")}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex gap-2 border-t border-[#E5E7EB] p-3"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type a sample text"
                className="min-w-0 flex-1 rounded-full border border-[#E5E7EB] px-4 py-2 text-sm outline-none transition focus:border-[#635BFF]"
              />
              <button
                type="submit"
                style={{ color: "#FFFFFF" }}
                className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#222222]"
              >
                Send
              </button>
            </form>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {selected.quickReplies.map((reply) => (
              <button
                key={reply}
                type="button"
                onClick={() => sendMessage(reply)}
                className="rounded-full border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-medium text-[#111111] transition hover:border-[#635BFF] hover:text-[#635BFF]"
              >
                {reply}
              </button>
            ))}
          </div>
          <p className="mt-4 text-center text-xs leading-5 text-[#6B7280]">
            Demo only. Real installation connects to your phone system, CRM, and
            booking workflow.
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#6B7280]">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-6">{value}</p>
    </div>
  );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#6B7280]">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-[#111111]">{value}</p>
    </div>
  );
}
