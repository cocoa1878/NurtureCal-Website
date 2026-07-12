import type { Metadata } from "next";
import { ChecklistForm } from "@/components/checklist-form";

export const metadata: Metadata = {
  title: "NurtureCal Project Questionnaire",
  robots: { index: false, follow: false }
};

export default function QuestionairePage() {
  return (
    <main className="page-wrap">
      <ChecklistForm />
    </main>
  );
}
