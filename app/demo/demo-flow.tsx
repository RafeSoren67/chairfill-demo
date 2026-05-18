"use client";

import { useMemo, useState } from "react";
import {
  availableSlots,
  clinicProfile,
  demoScenarios,
  initialBookings,
  initialKPIs,
  pricingByService,
  serviceLabels,
  type AvailableSlot,
  type ServiceKey,
  type ToneProfile,
} from "../../src/data/mock";

type Message = {
  id: string;
  from: "patient" | "assistant" | "system";
  text: string;
};

type Slots = {
  name?: string;
  phone?: string;
  service?: ServiceKey;
  selectedSlot?: AvailableSlot;
};

type Booking = {
  id: string;
  name: string;
  phone: string;
  service: string;
  datetime: string;
  source: string;
  value: number;
};

type Intent =
  | "service_request"
  | "provide_name_phone"
  | "choose_slot"
  | "confirm"
  | "price_query"
  | "reschedule"
  | "unknown";

const toneLabels: Record<ToneProfile, string> = {
  "warm-professional": "Warm professional",
  "very-formal": "Very formal",
  casual: "Casual",
};

const emptySlots: Slots = {};

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function detectService(text: string): ServiceKey | undefined {
  const normalized = text.toLowerCase();

  if (
    normalized.includes("implant") ||
    normalized.includes("tooth replacement")
  ) {
    return "implantConsult";
  }

  if (
    normalized.includes("filler") ||
    normalized.includes("lip") ||
    normalized.includes("med spa")
  ) {
    return "fillerConsult";
  }

  if (
    normalized.includes("cleaning") ||
    normalized.includes("hygiene") ||
    normalized.includes("checkup") ||
    normalized.includes("reactivation")
  ) {
    return "cleaning";
  }

  return undefined;
}

function detectIntent(text: string, slots: Slots): Intent {
  const normalized = text.toLowerCase();
  const hasPhone = /\d[\d\s().-]{7,}\d/.test(text);
  const hasTime =
    /\b(mon|tue|wed|thu|fri|sat|sun|today|tomorrow|morning|afternoon|evening|\d{1,2}\s*(am|pm))\b/i.test(
      text,
    );

  if (/(cancel|reschedule|change)/i.test(text)) return "reschedule";
  if (/(price|cost|how much|expensive|financing)/i.test(text)) {
    return "price_query";
  }
  if (hasPhone) return "provide_name_phone";
  if (slots.service && hasTime) return "choose_slot";
  if (/\b(yes|book|okay|ok|sounds good|confirm|please|sure)\b/i.test(text)) {
    return slots.selectedSlot ? "confirm" : "service_request";
  }
  if (detectService(text)) return "service_request";

  return "unknown";
}

function extractNamePhone(text: string) {
  const phoneMatch = text.match(/\+?\d[\d\s().-]{7,}\d/);
  const phone = phoneMatch?.[0].trim();
  let name = text
    .replace(phone ?? "", "")
    .replace(/(my name is|this is|name is|phone is|number is)/gi, "")
    .replace(/[,:;]+/g, " ")
    .trim();

  if (!name || /\d/.test(name)) {
    name = "Rafe S";
  }

  return { name, phone };
}

function getSlots(service: ServiceKey) {
  return availableSlots.filter((slot) => slot.service === service).slice(0, 2);
}

function chooseSlot(text: string, service: ServiceKey) {
  const normalized = text.toLowerCase();
  const slots = getSlots(service);

  return (
    slots.find((slot) => {
      const short = slot.shortLabel.toLowerCase();
      const day = short.split(" ")[0];
      const hour = short.match(/\d+/)?.[0];

      return normalized.includes(day) || (!!hour && normalized.includes(hour));
    }) ?? slots[0]
  );
}

function toneIntro(tone: ToneProfile, name?: string) {
  if (tone === "very-formal") {
    return `Hello${name ? ` ${name}` : ""}. ${clinicProfile.clinicName} here.`;
  }

  if (tone === "casual") {
    return `Hey${name ? ` ${name}` : ""}! ${clinicProfile.clinicName} here.`;
  }

  return `Hi${name ? ` ${name}` : ""} - this is ${clinicProfile.clinicName}.`;
}

function offerSlotsText(service: ServiceKey, tone: ToneProfile, name?: string) {
  const slots = getSlots(service);
  const serviceLabel = serviceLabels[service].toLowerCase();
  const intro = toneIntro(tone, name);

  if (tone === "very-formal") {
    return `${intro} We can schedule your ${serviceLabel} on ${slots[0].shortLabel} or ${slots[1].shortLabel}. Which time should we reserve?`;
  }

  if (tone === "casual") {
    return `${intro} We can do ${slots[0].shortLabel} or ${slots[1].shortLabel} for your ${serviceLabel}. Which is better?`;
  }

  return `${intro} Thanks for reaching out. We have ${slots[0].shortLabel} or ${slots[1].shortLabel} for your ${serviceLabel}. Which works best?`;
}

function generateReply(
  patientText: string,
  slots: Slots,
  tone: ToneProfile,
): { text: string; slots: Slots; finalBooking?: boolean } {
  const intent = detectIntent(patientText, slots);
  const serviceFromText = detectService(patientText);
  const nextSlots = { ...slots };

  if (serviceFromText) {
    nextSlots.service = serviceFromText;
  }

  if (intent === "price_query") {
    const service = serviceFromText ?? nextSlots.service ?? "implantConsult";
    nextSlots.service = service;
    const price = pricingByService[service];
    const slotsForService = getSlots(service);
    return {
      slots: nextSlots,
      text: `${toneIntro(tone, nextSlots.name)} The ${serviceLabels[
        service
      ].toLowerCase()} is $${price}. It includes a focused consult and clear next steps before any treatment decision. We can hold ${slotsForService[0].shortLabel} or ${slotsForService[1].shortLabel} if you would like to talk through options.`,
    };
  }

  if (intent === "reschedule") {
    const service = nextSlots.service ?? "cleaning";
    nextSlots.service = service;
    return {
      slots: nextSlots,
      text: `${toneIntro(tone, nextSlots.name)} No problem. We can look at ${getSlots(service)[0].shortLabel} or ${getSlots(service)[1].shortLabel}. Which new time is better?`,
    };
  }

  if (intent === "provide_name_phone") {
    const extracted = extractNamePhone(patientText);
    nextSlots.name = extracted.name;
    nextSlots.phone = extracted.phone;

    if (!nextSlots.phone || nextSlots.phone.replace(/\D/g, "").length < 10) {
      return {
        slots: nextSlots,
        text: `${toneIntro(tone, nextSlots.name)} I just need the best 10-digit phone number before we hold a time.`,
      };
    }

    const service = nextSlots.service ?? "cleaning";
    nextSlots.service = service;
    return {
      slots: nextSlots,
      text: offerSlotsText(service, tone, nextSlots.name),
    };
  }

  if (intent === "choose_slot") {
    const service = nextSlots.service ?? "cleaning";
    nextSlots.service = service;
    nextSlots.selectedSlot = chooseSlot(patientText, service);

    if (!nextSlots.name || !nextSlots.phone) {
      return {
        slots: nextSlots,
        text: `${toneIntro(tone)} That time works. Quick name and best phone so we can hold it?`,
      };
    }

    return {
      slots: nextSlots,
      text: `${toneIntro(tone, nextSlots.name)} Great - I can hold ${
        nextSlots.selectedSlot.shortLabel
      } for your ${serviceLabels[service].toLowerCase()}. Reply yes and I will confirm it.`,
    };
  }

  if (intent === "confirm" && nextSlots.selectedSlot && nextSlots.service) {
    return {
      slots: nextSlots,
      finalBooking: true,
      text: `All set, ${nextSlots.name ?? "there"}! Your ${serviceLabels[
        nextSlots.service
      ].toLowerCase()} is booked for ${
        nextSlots.selectedSlot.label
      }. You will receive a reminder 48 hours before. Reply "details" for directions or "reschedule" to change.`,
    };
  }

  if (intent === "service_request") {
    const service = nextSlots.service ?? "cleaning";
    nextSlots.service = service;

    if (!nextSlots.name || !nextSlots.phone) {
      const afterHours = /(after hours|tonight|weekend|late)/i.test(patientText);
      return {
        slots: nextSlots,
        text: afterHours
          ? `${toneIntro(tone)} Thanks - we are after hours, but I can collect a few details now so the office can hold a spot. What is your name and best phone?`
          : `${toneIntro(tone)} Thanks - quick name and best phone so we can find the right opening?`,
      };
    }

    return {
      slots: nextSlots,
      text: offerSlotsText(service, tone, nextSlots.name),
    };
  }

  return {
    slots: nextSlots,
    text: `${toneIntro(tone, nextSlots.name)} I can help with cleaning, implant consults, or filler consults. Which one should we look at first?`,
  };
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildIcs(booking: Booking) {
  const start = booking.datetime.replace(/[^a-zA-Z0-9 ]/g, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ChairFill//Local Demo//EN",
    "BEGIN:VEVENT",
    `SUMMARY:${booking.service} at ${clinicProfile.clinicName}`,
    `DESCRIPTION:Local ChairFill demo booking for ${booking.name}.`,
    `DTSTART;VALUE=DATE:20260521`,
    `DTEND;VALUE=DATE:20260522`,
    `LOCATION:${clinicProfile.clinicName}`,
    `UID:${booking.id}@chairfill.local`,
    `X-CHAIRFILL-LABEL:${start}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");
}

export function DemoFlow() {
  const [tone, setTone] = useState<ToneProfile>(clinicProfile.toneProfile);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      from: "assistant",
      text: `${toneIntro(clinicProfile.toneProfile)} Send a patient message or choose a preset to see the local office brain recover the lead.`,
    },
  ]);
  const [slots, setSlots] = useState<Slots>(emptySlots);
  const [draft, setDraft] = useState("");
  const [input, setInput] = useState("Hi, I need a cleaning. Prefer mornings.");
  const [kpis, setKpis] = useState(initialKPIs);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [lastValue, setLastValue] = useState(0);
  const [activeScenario, setActiveScenario] = useState("custom");

  const currentScenario = demoScenarios.find(
    (scenario) => scenario.id === activeScenario,
  );

  const isBooked = lastValue > 0;
  const offeredSlots =
    slots.service && slots.name && slots.phone && !isBooked
      ? getSlots(slots.service)
      : [];

  const timeline = useMemo(
    () => [
      { label: "Lead submitted", active: messages.length > 1 },
      {
        label: "SMS drafted",
        active: messages.some((message) => message.from === "assistant") || !!draft,
      },
      {
        label: "Patient replied",
        active: messages.filter((message) => message.from === "patient").length > 0,
      },
      {
        label: "Booking offer sent",
        active: offeredSlots.length > 0 || !!slots.selectedSlot || isBooked,
      },
      { label: "Booked and logged", active: isBooked },
    ],
    [messages, draft, offeredSlots.length, slots.selectedSlot, isBooked],
  );

  function resetDemo() {
    setMessages([
      {
        id: createId("assistant"),
        from: "assistant",
        text: `${toneIntro(tone)} Send a patient message or choose a preset to see the local office brain recover the lead.`,
      },
    ]);
    setSlots({});
    setDraft("");
    setInput("Hi, I need a cleaning. Prefer mornings.");
    setKpis(initialKPIs);
    setBookings(initialBookings);
    setLastValue(0);
    setActiveScenario("custom");
  }

  function finalizeBooking(nextSlots: Slots, replyText: string) {
    const service = nextSlots.service ?? "cleaning";
    const slot = nextSlots.selectedSlot ?? getSlots(service)[0];
    const value = pricingByService[service];
    const booking: Booking = {
      id: createId("booking"),
      name: nextSlots.name ?? "Demo Patient",
      phone: nextSlots.phone ?? "555-0100",
      service: serviceLabels[service],
      datetime: slot.label,
      source: "demo",
      value,
    };

    setBookings((existing) => [booking, ...existing]);
    setKpis((existing) => ({
      ...existing,
      recoveredLeads: existing.recoveredLeads + 1,
      booked: existing.booked + 1,
      recoveredRevenue: existing.recoveredRevenue + value,
    }));
    setLastValue(value);
    setMessages((existing) => [
      ...existing,
      { id: createId("assistant"), from: "assistant", text: replyText },
      {
        id: createId("system"),
        from: "system",
        text: `Booked - this demo adds the appointment to the practice dashboard and increases Estimated Recovered Revenue by ${formatCurrency(value)}.`,
      },
    ]);
  }

  function sendPatient(text = input) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const patientMessage: Message = {
      id: createId("patient"),
      from: "patient",
      text: trimmed,
    };
    const result = generateReply(trimmed, slots, tone);

    setMessages((existing) => [...existing, patientMessage]);
    setSlots(result.slots);
    setInput("");

    if (result.finalBooking) {
      finalizeBooking(result.slots, result.text);
      return;
    }

    setDraft(result.text);
  }

  function sendDraft() {
    if (!draft.trim()) return;
    setMessages((existing) => [
      ...existing,
      { id: createId("assistant"), from: "assistant", text: draft.trim() },
    ]);
    setDraft("");
  }

  function runScenario(id: string) {
    const scenario = demoScenarios.find((item) => item.id === id);
    if (!scenario) return;

    setActiveScenario(id);
    setKpis(initialKPIs);
    setBookings(initialBookings);
    setLastValue(0);
    setSlots({});
    setDraft("");
    setInput("");

    let scenarioSlots: Slots = {};
    const scenarioMessages: Message[] = [];
    let scenarioDraft = "";

    scenario.initialMessages.forEach((message) => {
      scenarioMessages.push({
        id: createId(message.from),
        from: message.from,
        text: message.text,
      });

      if (message.from === "patient") {
        const result = generateReply(message.text, scenarioSlots, tone);
        scenarioSlots = result.slots;
        scenarioDraft = result.text;
      }
    });

    setMessages(scenarioMessages);
    setSlots(scenarioSlots);
    setDraft(scenarioDraft);
  }

  function selectSlot(slot: AvailableSlot) {
    sendPatient(`${slot.shortLabel} works`);
  }

  function downloadTranscript() {
    const text = messages
      .map((message) => `${message.from.toUpperCase()}: ${message.text}`)
      .join("\n\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "chairfill-demo-transcript.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function downloadCalendar() {
    const booking = bookings[0];
    const blob = new Blob([buildIcs(booking)], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "chairfill-demo-booking.ics";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-[#0b2445]">
        Simulation: This demo uses a local scripted "office brain" to show
        typical behaviors. Production product uses configurable office rules and
        optional AI models.
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0d4f8b]">
                  Simulated SMS
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-[#07182f]">
                  Office Brain Conversation
                </h2>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Office voice
                </label>
                <div className="mt-2 flex rounded-full border border-slate-200 bg-slate-50 p-1">
                  {(["warm-professional", "very-formal", "casual"] as ToneProfile[]).map(
                    (option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setTone(option)}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                          tone === option
                            ? "bg-[#07182f] text-white"
                            : "text-slate-600 hover:text-[#07182f]"
                        }`}
                      >
                        {toneLabels[option].replace(" professional", "")}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="max-h-[560px] min-h-[420px] space-y-4 overflow-y-auto bg-[#f8fafc] p-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.from === "patient" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                    message.from === "patient"
                      ? "bg-[#07182f] text-white"
                      : message.from === "system"
                        ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
                        : "border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] opacity-70">
                    {message.from}
                  </p>
                  <p>{message.text}</p>
                </div>
              </div>
            ))}

            {draft ? (
              <div className="rounded-2xl border border-[#0d4f8b]/25 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0d4f8b]">
                    Editable assistant draft
                  </p>
                  <button
                    type="button"
                    onClick={sendDraft}
                    className="rounded-full bg-[#07182f] px-4 py-2 text-xs font-semibold text-white"
                  >
                    Send reply
                  </button>
                </div>
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  className="min-h-28 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-800 outline-none focus:border-[#0d4f8b]"
                />
              </div>
            ) : null}
          </div>

          <div className="space-y-4 border-t border-slate-200 p-5">
            {offeredSlots.length ? (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Live slot picker
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {offeredSlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => selectSlot(slot)}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-[#07182f] transition hover:border-[#0d4f8b] hover:bg-blue-50"
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {currentScenario?.chips.length && !isBooked ? (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Patient quick replies
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentScenario.chips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => sendPatient(chip)}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[#0d4f8b]"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") sendPatient();
                }}
                placeholder="Type a patient message..."
                className="min-h-12 flex-1 rounded-full border border-slate-300 px-5 text-sm outline-none focus:border-[#0d4f8b]"
              />
              <button
                type="button"
                onClick={() => sendPatient()}
                className="rounded-full bg-[#07182f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0b2445]"
              >
                Send patient reply
              </button>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0d4f8b]">
              Clinic profile
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#07182f]">
              {clinicProfile.clinicName}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {toneLabels[tone]} voice, office-led booking rules, and
              production behavior configurable by the practice.
            </p>
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Mon-Fri</p>
                <p className="font-semibold text-[#07182f]">
                  {clinicProfile.businessHours.monFri}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Saturday</p>
                <p className="font-semibold text-[#07182f]">
                  {clinicProfile.businessHours.sat}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Avg value</p>
                <p className="font-semibold text-[#07182f]">
                  ${clinicProfile.avgPadValue}
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2">
            {[
              ["Missed calls", kpis.missedCalls],
              ["Recovered leads", kpis.recoveredLeads],
              ["Booked", kpis.booked],
              ["Recovered revenue", formatCurrency(kpis.recoveredRevenue)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-[#f8fafc] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-[#07182f]">
                  {value}
                </p>
              </div>
            ))}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0d4f8b]">
              Recovery timeline
            </p>
            <div className="mt-5 space-y-3">
              {timeline.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                    item.active
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                      item.active
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-slate-400"
                    }`}
                  >
                    {item.active ? "✓" : ""}
                  </div>
                  <p className="text-sm font-semibold text-[#07182f]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0d4f8b]">
              Demo scenarios
            </p>
            <div className="mt-4 grid gap-2">
              {demoScenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => runScenario(scenario.id)}
                  className={`rounded-xl border p-3 text-left transition ${
                    activeScenario === scenario.id
                      ? "border-[#0d4f8b] bg-blue-50"
                      : "border-slate-200 bg-white hover:border-[#0d4f8b]"
                  }`}
                >
                  <p className="font-semibold text-[#07182f]">
                    {scenario.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {scenario.description}
                  </p>
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <section className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0d4f8b]">
            Sales talk track
          </p>
          <p className="mt-3 text-lg font-semibold text-[#07182f]">
            ChairFill catches missed opportunities with office-led automation.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Watch this: a lead comes in after hours, ChairFill asks one short
            question, offers two real-looking slots, and the patient says yes.
            The booking is added to the dashboard and recovered revenue goes up.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={downloadTranscript}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-[#07182f]"
            >
              Export transcript
            </button>
            <button
              type="button"
              onClick={downloadCalendar}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-[#07182f]"
            >
              Add to Calendar
            </button>
            <a
              href="/book-meeting"
              className="rounded-full bg-[#07182f] px-4 py-2 text-sm font-semibold text-white"
            >
              Book meeting
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0d4f8b]">
            Practice dashboard log
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
            <div className="grid grid-cols-[1fr_1fr_0.8fr] bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              <p>Patient</p>
              <p>Appointment</p>
              <p>Value</p>
            </div>
            <div className="divide-y divide-slate-200">
              {bookings.slice(0, 4).map((booking) => (
                <div
                  key={booking.id}
                  className="grid grid-cols-[1fr_1fr_0.8fr] gap-3 px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-semibold text-[#07182f]">
                      {booking.name}
                    </p>
                    <p className="text-xs text-slate-500">{booking.phone}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700">
                      {booking.service}
                    </p>
                    <p className="text-xs text-slate-500">{booking.datetime}</p>
                  </div>
                  <p className="font-semibold text-emerald-700">
                    {formatCurrency(booking.value)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
