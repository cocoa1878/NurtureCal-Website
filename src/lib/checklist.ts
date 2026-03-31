export type FieldType = "text" | "email" | "textarea" | "checkbox" | "select";

export type FieldOption = {
  label: string;
  value: string;
};

export type FieldDefinition = {
  id: string;
  label: string;
  type: FieldType;
  helper?: string;
  placeholder?: string;
  rows?: number;
  defaultValue?: string | boolean;
  options?: FieldOption[];
};

export type SectionDefinition = {
  id: string;
  title: string;
  note?: string;
  fields: FieldDefinition[];
};

const accountStatusOptions: FieldOption[] = [
  { label: "Need to create", value: "need_to_create" },
  { label: "Already have", value: "already_have" },
  { label: "Need help", value: "need_help" },
  { label: "Not sure", value: "not_sure" }
];

export const checklistSections: SectionDefinition[] = [
  {
    id: "branding-identity",
    title: "1. Branding & Identity",
    fields: [
      { id: "appName", label: "App name", type: "text", placeholder: "Enter app name" },
      {
        id: "logoDirection",
        label: "Logo (or direction / examples you like)",
        type: "textarea",
        rows: 4,
        placeholder: "Describe the logo direction or paste links to examples"
      },
      { id: "primaryColor", label: "Primary color", type: "text", placeholder: "Example: teal" },
      { id: "secondaryColors", label: "Secondary colors (1-2)", type: "text", placeholder: "Example: cream, charcoal" },
      {
        id: "fontStylePreference",
        label: "Font style preference (modern, clinical, soft, bold, etc.)",
        type: "text",
        placeholder: "Describe the font style you like"
      },
      {
        id: "overallVibe",
        label: "Overall vibe (clinical, lifestyle, coaching, premium, etc.)",
        type: "text",
        placeholder: "Describe the overall vibe"
      }
    ]
  },
  {
    id: "business-legal",
    title: "2. Business & Legal",
    fields: [
      { id: "llcName", label: "LLC name", type: "text", placeholder: "Enter LLC name" },
      {
        id: "businessAddress",
        label: "Business address",
        type: "textarea",
        rows: 3,
        placeholder: "Enter business address"
      },
      {
        id: "domainName",
        label: "Domain name (we will register once app name is confirmed)",
        type: "text",
        placeholder: "Enter domain idea if you have one"
      },
      {
        id: "supportEmail",
        label: "Support email (we will create after domain is registered)",
        type: "email",
        placeholder: "Enter preferred support email if known"
      },
      {
        id: "privacyPolicy",
        label: "Privacy policy (or approval for me to generate)",
        type: "textarea",
        rows: 4,
        placeholder: "Paste text or say if you want this drafted for you"
      },
      {
        id: "termsOfService",
        label: "Terms of service (or approval for me to generate)",
        type: "textarea",
        rows: 4,
        placeholder: "Paste text or say if you want this drafted for you"
      },
      {
        id: "refundPolicy",
        label: "Refund policy (for subscriptions)",
        type: "textarea",
        rows: 3,
        placeholder: "Describe the refund policy or say if you want a draft"
      }
    ]
  },
  {
    id: "app-core-logic",
    title: "3. App Core Logic (Your Method)",
    fields: [
      {
        id: "bmrFormula",
        label: "Confirm BMR formula (Mifflin-St Jeor sedentary)",
        type: "text",
        defaultValue: "Mifflin-St Jeor sedentary"
      },
      {
        id: "proteinRulesGeneral",
        label: "Protein rules - General users",
        type: "textarea",
        rows: 3,
        placeholder: "Describe protein rules for general users"
      },
      {
        id: "proteinRulesAdvanced",
        label: "Protein rules - Advanced / training users",
        type: "textarea",
        rows: 3,
        placeholder: "Describe protein rules for advanced or training users"
      },
      {
        id: "carbohydrateRangesWomen",
        label: "Carbohydrate ranges - Women",
        type: "text",
        placeholder: "Enter carbohydrate range for women"
      },
      {
        id: "carbohydrateRangesMen",
        label: "Carbohydrate ranges - Men",
        type: "text",
        placeholder: "Enter carbohydrate range for men"
      },
      {
        id: "fatCalculationMethod",
        label: "Fat calculation method (remaining calories)",
        type: "text",
        defaultValue: "remaining calories"
      },
      {
        id: "exceptionsEdgeCases",
        label: "Any exceptions or edge cases",
        type: "textarea",
        rows: 4,
        placeholder: "List any edge cases or special rules"
      },
      {
        id: "goalTypes",
        label: "Goal types (weight loss, maintenance, muscle gain, etc.)",
        type: "text",
        placeholder: "List the goal types you want to support"
      }
    ]
  },
  {
    id: "ai-content-inputs",
    title: "4. AI & Content Inputs",
    fields: [
      {
        id: "exampleMealPlans",
        label: "5-10 example daily meal plans (very important)",
        type: "textarea",
        rows: 6,
        placeholder: "Paste sample meal plans or describe them here"
      },
      {
        id: "preferredFoods",
        label: "List of preferred foods / recommended foods",
        type: "textarea",
        rows: 4,
        placeholder: "List foods you recommend often"
      },
      {
        id: "foodsToLimit",
        label: "Foods to limit or avoid (if applicable)",
        type: "textarea",
        rows: 4,
        placeholder: "List foods to limit or avoid"
      },
      {
        id: "toneOfRecommendations",
        label: "Tone of recommendations (strict, flexible, encouraging, clinical)",
        type: "text",
        placeholder: "Describe the tone you want"
      },
      {
        id: "teachingLanguage",
        label: "Any phrases or teaching language you want the app to use",
        type: "textarea",
        rows: 4,
        placeholder: "Add phrases or teaching language you want included"
      }
    ]
  },
  {
    id: "app-features-confirm-scope",
    title: "5. App Features (Confirm Scope)",
    note: "Confirm the features included in this version.",
    fields: [
      { id: "featureUserProfileSetup", label: "User profile setup (age, weight, height, goals)", type: "checkbox", defaultValue: false },
      { id: "featureBmrMacroCalculation", label: "BMR + macro calculation", type: "checkbox", defaultValue: false },
      { id: "featureFoodTracking", label: "Food tracking (manual entry)", type: "checkbox", defaultValue: false },
      { id: "featureAiMealSuggestions", label: "AI meal suggestions", type: "checkbox", defaultValue: false },
      { id: "featureAiFoodPhotoLogging", label: "AI food photo logging", type: "checkbox", defaultValue: false },
      { id: "featureProgressTracking", label: "Progress tracking (weight + measurements)", type: "checkbox", defaultValue: false },
      { id: "featureBasicReminders", label: "Basic reminders", type: "checkbox", defaultValue: false },
      { id: "confirmNoBarcodeScanning", label: "Confirm: No barcode scanning in this version", type: "checkbox", defaultValue: false },
      { id: "confirmNoAdaptiveCoaching", label: "Confirm: No adaptive coaching in this version", type: "checkbox", defaultValue: false },
      {
        id: "scopeNotes",
        label: "Notes about app features",
        type: "textarea",
        rows: 4,
        placeholder: "Add any notes about the feature scope"
      }
    ]
  },
  {
    id: "pricing-subscription-setup",
    title: "6. Pricing & Subscription Setup",
    fields: [
      { id: "freeTrial", label: "Free trial: 7 days", type: "text", defaultValue: "7 days" },
      { id: "monthlyPrice", label: "Monthly price: $14.99", type: "text", defaultValue: "$14.99" },
      { id: "annualPrice", label: "Annual price: $59.99", type: "text", defaultValue: "$59.99" },
      {
        id: "pricingConfirmation",
        label: "Confirm pricing and trial structure",
        type: "textarea",
        rows: 3,
        placeholder: "Confirm as written or note any changes"
      }
    ]
  },
  {
    id: "app-store-content",
    title: "7. App Store Content",
    fields: [
      {
        id: "shortAppDescription",
        label: "Short app description (I can draft, you approve)",
        type: "textarea",
        rows: 4,
        placeholder: "Write a short description or say you want a draft"
      },
      {
        id: "keyBenefits",
        label: "3-5 key benefits (simple and clear)",
        type: "textarea",
        rows: 4,
        placeholder: "List the main benefits"
      },
      {
        id: "appIconDirection",
        label: "App icon direction (simple, branded, medical, etc.)",
        type: "text",
        placeholder: "Describe the icon direction"
      },
      {
        id: "screenshotStylePreference",
        label: "Screenshot style preference (clean UI vs lifestyle images)",
        type: "text",
        placeholder: "Describe the screenshot style you want"
      }
    ]
  },
  {
    id: "website-content-landing-page",
    title: "8. Website Content (Landing Page)",
    fields: [
      {
        id: "websiteHeadline",
        label: "Headline (what the app does in one sentence)",
        type: "text",
        placeholder: "Write a one-sentence headline"
      },
      {
        id: "websiteMethodDescription",
        label: "Short description of your method",
        type: "textarea",
        rows: 4,
        placeholder: "Describe your method in a few sentences"
      },
      {
        id: "websiteKeyBenefits",
        label: "Key benefits (3-5 bullets)",
        type: "textarea",
        rows: 4,
        placeholder: "List key website benefits"
      },
      {
        id: "beforeAfterResults",
        label: "Any before/after or results (optional)",
        type: "textarea",
        rows: 4,
        placeholder: "Add results or say none"
      },
      {
        id: "websiteFaq",
        label: "FAQ (I can draft, you approve)",
        type: "textarea",
        rows: 5,
        placeholder: "List questions or say you want a draft"
      }
    ]
  },
  {
    id: "accounts-to-create",
    title: "9. Accounts To Create",
    note: "Choose the current status for each item.",
    fields: [
      { id: "appleDeveloperAccount", label: "Apple Developer Account", type: "select", defaultValue: "need_to_create", options: accountStatusOptions },
      { id: "googlePlayDeveloperAccount", label: "Google Play Developer Account", type: "select", defaultValue: "need_to_create", options: accountStatusOptions },
      { id: "supabaseAccount", label: "Supabase account", type: "select", defaultValue: "need_to_create", options: accountStatusOptions },
      { id: "vercelAccount", label: "Vercel account", type: "select", defaultValue: "need_help", options: accountStatusOptions },
      { id: "openAiAccount", label: "OpenAI account", type: "select", defaultValue: "need_to_create", options: accountStatusOptions },
      { id: "revenueCatAccount", label: "RevenueCat account", type: "select", defaultValue: "need_to_create", options: accountStatusOptions },
      { id: "domainRegistration", label: "Domain (we will register through Vercel)", type: "select", defaultValue: "need_to_create", options: accountStatusOptions },
      { id: "emailAccount", label: "Email account (we will create after domain is set)", type: "select", defaultValue: "need_to_create", options: accountStatusOptions },
      { id: "analyticsOptional", label: "Analytics (PostHog or Firebase)", type: "select", defaultValue: "need_help", options: accountStatusOptions },
      { id: "errorTrackingOptional", label: "Error tracking (Sentry)", type: "select", defaultValue: "need_help", options: accountStatusOptions }
    ]
  },
  {
    id: "access-communication",
    title: "10. Access & Communication",
    fields: [
      {
        id: "primaryContactPerson",
        label: "Primary contact person for approvals",
        type: "text",
        placeholder: "Enter the main contact person"
      },
      {
        id: "bestEmailForCommunication",
        label: "Best email for communication",
        type: "email",
        placeholder: "Enter best email for communication"
      },
      {
        id: "timelyFeedbackCommitment",
        label: "Commitment to timely feedback (within ~3-5 days)",
        type: "textarea",
        rows: 3,
        placeholder: "Confirm or add notes"
      }
    ]
  },
  {
    id: "key-alignment",
    title: "11. Key Alignment (Already Confirmed)",
    fields: [
      { id: "alignmentReplaceCurrentApp", label: "App will replace current recommended app", type: "checkbox", defaultValue: false },
      { id: "alignmentPatientsAndPublicUsers", label: "App will be used for patients AND public users", type: "checkbox", defaultValue: false },
      { id: "alignmentGrowLargerProduct", label: "Goal is to grow into a larger product over time", type: "checkbox", defaultValue: false },
      {
        id: "alignmentNotes",
        label: "Notes about key alignment",
        type: "textarea",
        rows: 3,
        placeholder: "Add any notes if needed"
      }
    ]
  },
  {
    id: "final-question",
    title: "12. Final Question Before We Start",
    fields: [
      {
        id: "finalDifferentiator",
        label: "What makes someone choose your app instead of MyFitnessPal or EATO?",
        type: "textarea",
        rows: 6,
        helper: "We will use this to guide positioning, messaging, and design.",
        placeholder: "Describe what makes your app different"
      }
    ]
  }
];

export type ChecklistValues = Record<string, string | boolean>;

export function createInitialValues(): ChecklistValues {
  return checklistSections.reduce<ChecklistValues>((acc, section) => {
    section.fields.forEach((field) => {
      if (typeof field.defaultValue !== "undefined") {
        acc[field.id] = field.defaultValue;
        return;
      }

      acc[field.id] = field.type === "checkbox" ? false : "";
    });

    return acc;
  }, {});
}

export function humanizeValue(value: string | boolean): string {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (!value || value.trim() === "") {
    return "Not provided";
  }

  return value;
}
