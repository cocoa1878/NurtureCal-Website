export const BILLING_REMINDER_SCHEDULE = [
  { kind: "before_due_7", offsetDays: -7 },
  { kind: "before_due_1", offsetDays: -1 },
  { kind: "due_today", offsetDays: 0 },
  { kind: "overdue_1", offsetDays: 1 },
  { kind: "overdue_3", offsetDays: 3 },
  { kind: "overdue_7", offsetDays: 7 },
  { kind: "overdue_14", offsetDays: 14 },
] as const;

export type ReminderKind = (typeof BILLING_REMINDER_SCHEDULE)[number]["kind"];

type ReminderInvoiceState = {
  status: string;
  amount_due_cents: number;
  amount_paid_cents: number;
  due_at: string | null;
  paid_at: string | null;
};

export function chicagoDate(value: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(value);
  const part = (type: string) => parts.find((item) => item.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function addDays(date: string, days: number) {
  const [year, month, day] = date.split("-").map(Number);
  const result = new Date(Date.UTC(year, month - 1, day + days));
  return result.toISOString().slice(0, 10);
}

export function reminderFor(invoice: ReminderInvoiceState, today: string): ReminderKind | null {
  const isUnpaid =
    invoice.status === "open" &&
    !invoice.paid_at &&
    invoice.amount_due_cents > invoice.amount_paid_cents;

  if (!isUnpaid || !invoice.due_at) return null;

  const dueDate = chicagoDate(new Date(invoice.due_at));
  return BILLING_REMINDER_SCHEDULE.find(({ offsetDays }) => today === addDays(dueDate, offsetDays))?.kind ?? null;
}

export function reminderCopy(kind: ReminderKind, amount: string, dueDate: string) {
  const closing = "You can pay securely using the link below. If you have already submitted payment, thank you and please disregard this reminder.";

  switch (kind) {
    case "before_due_7":
      return {
        subject: "Friendly reminder: your NurtureCal invoice is due in 7 days",
        heading: "A friendly payment reminder",
        body: `Just a friendly reminder that your ${amount} NurtureCal support invoice is due in 7 days, on ${dueDate}.`,
        closing,
      };
    case "before_due_1":
      return {
        subject: "Friendly reminder: your NurtureCal invoice is due tomorrow",
        heading: "Your invoice is due tomorrow",
        body: `Just a friendly reminder that your ${amount} NurtureCal support invoice is due tomorrow, ${dueDate}.`,
        closing,
      };
    case "due_today":
      return {
        subject: "Friendly reminder: your NurtureCal invoice is due today",
        heading: "Your invoice is due today",
        body: `Just a friendly reminder that your ${amount} NurtureCal support invoice is due today, ${dueDate}.`,
        closing,
      };
    case "overdue_1":
      return {
        subject: "Friendly follow-up: your NurtureCal invoice was due yesterday",
        heading: "A friendly payment follow-up",
        body: `Just a friendly follow-up that your ${amount} NurtureCal support invoice was due yesterday, ${dueDate}.`,
        closing,
      };
    case "overdue_3":
      return {
        subject: "Friendly follow-up: your NurtureCal invoice was due 3 days ago",
        heading: "A friendly payment follow-up",
        body: `Just a friendly follow-up that your ${amount} NurtureCal support invoice was due 3 days ago, on ${dueDate}.`,
        closing,
      };
    case "overdue_7":
      return {
        subject: "Friendly follow-up: your NurtureCal invoice was due 7 days ago",
        heading: "A friendly payment follow-up",
        body: `Just a friendly follow-up that your ${amount} NurtureCal support invoice was due 7 days ago, on ${dueDate}.`,
        closing,
      };
    case "overdue_14":
      return {
        subject: "Friendly follow-up: your NurtureCal invoice was due 14 days ago",
        heading: "A friendly payment follow-up",
        body: `Just a friendly follow-up that your ${amount} NurtureCal support invoice was due 14 days ago, on ${dueDate}.`,
        closing,
      };
  }
}
