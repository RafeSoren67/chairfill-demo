export type ToneProfile = "warm-professional" | "very-formal" | "casual";

export type ServiceKey = "cleaning" | "implantConsult" | "fillerConsult";

export type AvailableSlot = {
  id: string;
  service: ServiceKey;
  datetime: string;
  label: string;
  shortLabel: string;
};

export const clinicProfile = {
  clinicName: "Greenwood Dental",
  contactName: "Dr. Patel",
  toneProfile: "warm-professional" as ToneProfile,
  businessHours: {
    monFri: "8:00-5:00",
    sat: "8:00-12:00",
    sun: "closed",
  },
  avgPadValue: 350,
};

export const pricingByService: Record<ServiceKey, number> = {
  cleaning: 120,
  implantConsult: 450,
  fillerConsult: 300,
};

export const serviceLabels: Record<ServiceKey, string> = {
  cleaning: "Cleaning",
  implantConsult: "Implant consult",
  fillerConsult: "Filler consult",
};

export const availableSlots: AvailableSlot[] = [
  {
    id: "cleaning-thu-10",
    service: "cleaning",
    datetime: "2026-05-21T10:00:00",
    label: "Thu, May 21 at 10:00 AM",
    shortLabel: "Thu 10:00 AM",
  },
  {
    id: "cleaning-fri-830",
    service: "cleaning",
    datetime: "2026-05-22T08:30:00",
    label: "Fri, May 22 at 8:30 AM",
    shortLabel: "Fri 8:30 AM",
  },
  {
    id: "cleaning-thu-3",
    service: "cleaning",
    datetime: "2026-05-21T15:00:00",
    label: "Thu, May 21 at 3:00 PM",
    shortLabel: "Thu 3:00 PM",
  },
  {
    id: "cleaning-fri-9",
    service: "cleaning",
    datetime: "2026-05-22T09:00:00",
    label: "Fri, May 22 at 9:00 AM",
    shortLabel: "Fri 9:00 AM",
  },
  {
    id: "implant-mon-11",
    service: "implantConsult",
    datetime: "2026-05-25T11:00:00",
    label: "Mon, May 25 at 11:00 AM",
    shortLabel: "Mon 11:00 AM",
  },
  {
    id: "implant-wed-2",
    service: "implantConsult",
    datetime: "2026-05-27T14:00:00",
    label: "Wed, May 27 at 2:00 PM",
    shortLabel: "Wed 2:00 PM",
  },
  {
    id: "filler-mon-9",
    service: "fillerConsult",
    datetime: "2026-05-25T09:00:00",
    label: "Mon, May 25 at 9:00 AM",
    shortLabel: "Mon 9:00 AM",
  },
  {
    id: "filler-tue-2",
    service: "fillerConsult",
    datetime: "2026-05-26T14:00:00",
    label: "Tue, May 26 at 2:00 PM",
    shortLabel: "Tue 2:00 PM",
  },
];

export const initialKPIs = {
  inboundCalls: 124,
  missedCalls: 51,
  recoveredLeads: 6,
  booked: 42,
  reviews: 42,
  recoveredRevenue: 15200,
};

export const initialBookings = [
  {
    id: "seed-1",
    name: "Emily Carter",
    phone: "555-0128",
    service: "Cleaning",
    datetime: "Thu, May 14 at 9:00 AM",
    source: "demo",
    value: 120,
  },
  {
    id: "seed-2",
    name: "Lena Ortiz",
    phone: "555-0144",
    service: "Filler consult",
    datetime: "Fri, May 15 at 2:30 PM",
    source: "demo",
    value: 300,
  },
];

export const demoScenarios = [
  {
    id: "quick-book",
    name: "Quick-book",
    description: "Happy path cleaning request",
    initialMessages: [
      {
        from: "patient",
        text: "Hi, I need a cleaning. Prefer mornings.",
      },
    ],
    chips: ["Rafe S, 555-013-4000", "Thu 10 works", "Yes, book it"],
  },
  {
    id: "after-hours",
    name: "After-hours lead",
    description: "Text-only filler consult",
    initialMessages: [
      {
        from: "patient",
        text: "I would like a lip filler consult tonight if possible.",
      },
    ],
    chips: ["Maya Lee, 555-018-8000", "Yes please", "Confirm"],
  },
  {
    id: "hesitant",
    name: "Hesitant patient",
    description: "Price question before booking",
    initialMessages: [
      {
        from: "patient",
        text: "How much for implants?",
      },
    ],
    chips: ["Jordan Hall, 555-017-2000", "Wed 2 works", "Sounds good"],
  },
  {
    id: "reactivation",
    name: "Reactivation",
    description: "Inactive patient returns",
    initialMessages: [
      {
        from: "system",
        text: "Haven't seen you in 8 months - want to book a cleaning? Reply yes to see times.",
      },
      {
        from: "patient",
        text: "Yes",
      },
    ],
    chips: ["Nora P, 555-016-6000", "Fri 9 works", "Yes, confirm"],
  },
] as const;
