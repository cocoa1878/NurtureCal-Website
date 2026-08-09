import assert from "node:assert/strict";
import test from "node:test";
import { reminderCopy, reminderFor } from "./billing-reminders.ts";

const unpaidInvoice = {
  status: "open",
  amount_due_cents: 75_000,
  amount_paid_cents: 0,
  due_at: "2026-08-11T05:00:00.000Z",
  paid_at: null,
};

test("selects every requested reminder date", () => {
  const cases = [
    ["2026-08-04", "before_due_7"],
    ["2026-08-10", "before_due_1"],
    ["2026-08-11", "due_today"],
    ["2026-08-12", "overdue_1"],
    ["2026-08-14", "overdue_3"],
    ["2026-08-18", "overdue_7"],
    ["2026-08-25", "overdue_14"],
  ];

  for (const [today, expected] of cases) {
    assert.equal(reminderFor(unpaidInvoice, today), expected);
  }
  assert.equal(reminderFor(unpaidInvoice, "2026-08-08"), null);
});

test("stops reminders when an invoice is no longer unpaid", () => {
  assert.equal(reminderFor({ ...unpaidInvoice, status: "paid" }, "2026-08-10"), null);
  assert.equal(reminderFor({ ...unpaidInvoice, paid_at: "2026-08-09T12:00:00.000Z" }, "2026-08-10"), null);
  assert.equal(reminderFor({ ...unpaidInvoice, amount_paid_cents: 75_000 }, "2026-08-10"), null);
});

test("uses friendly, timing-specific reminder copy", () => {
  const sevenDays = reminderCopy("before_due_7", "$750.00", "August 11, 2026");
  assert.match(sevenDays.subject, /due in 7 days/);
  assert.match(sevenDays.body, /friendly reminder/);

  const today = reminderCopy("due_today", "$750.00", "August 11, 2026");
  assert.match(today.subject, /due today/);

  const overdue = reminderCopy("overdue_14", "$750.00", "August 11, 2026");
  assert.match(overdue.subject, /due 14 days ago/);
  assert.match(overdue.closing, /already submitted payment/);
});
