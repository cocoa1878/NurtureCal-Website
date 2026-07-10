export type GuideTopic = "downloads" | "members" | "apple-ads";

export type GuideSection = {
  label: string;
  title: string;
  intro: string;
  steps: string[];
  destinationLabel: string;
  destinationUrl: string;
  lookFor: string;
  note?: string;
};

export type Guide = {
  topic: GuideTopic;
  eyebrow: string;
  title: string;
  intro: string;
  answer: string;
  sections: GuideSection[];
};

export const guides: Record<GuideTopic, Guide> = {
  downloads: {
    topic: "downloads",
    eyebrow: "Downloads · About two minutes",
    title: "See how many people downloaded NurtureCal",
    intro:
      "Apple and Android count downloads separately. Check each store, then add the two first-time download numbers together.",
    answer:
      "Use first-time downloads or first-time installers. Do not use redownloads, active devices, or RevenueCat customers as your download count.",
    sections: [
      {
        label: "Apple",
        title: "Find Apple first-time downloads",
        intro: "App Store Connect is the source of truth for iPhone downloads.",
        steps: [
          "Open App Store Connect and choose NurtureCal.",
          "Choose Analytics, then Overview.",
          "Set the date range you want, such as Last Month.",
          "Read the number labeled First-Time Downloads.",
        ],
        destinationLabel: "Open Apple Analytics",
        destinationUrl: "https://appstoreconnect.apple.com/analytics",
        lookFor: "First-Time Downloads",
        note: "Redownloads are people downloading the app again, so keep them separate.",
      },
      {
        label: "Android",
        title: "Find Android first-time installers",
        intro: "Google Play Console is the source of truth for Android installs.",
        steps: [
          "Open Play Console and choose NurtureCal.",
          "Choose User acquisition, then Acquisition reports.",
          "Set the same date range you used for Apple.",
          "Read the number labeled First-time installers.",
        ],
        destinationLabel: "Open Google Play Console",
        destinationUrl: "https://play.google.com/console/u/0/developers",
        lookFor: "First-time installers",
        note: "Google can show several install-related numbers. This is the one to use in your owner report.",
      },
    ],
  },
  members: {
    topic: "members",
    eyebrow: "Members and revenue · About one minute",
    title: "See paying members, trials, and revenue",
    intro:
      "RevenueCat combines Apple and Android subscriptions, so this is the only everyday dashboard you need for purchases.",
    answer:
      "Active Subscriptions is your current paying-member count. Active Trials shows people still trying the app. Revenue shows recorded subscription revenue before final store payouts.",
    sections: [
      {
        label: "RevenueCat",
        title: "Check your subscription snapshot",
        intro: "The Overview page gives you the four numbers that matter most.",
        steps: [
          "Open RevenueCat and choose the NurtureCal project.",
          "Stay on Overview for a quick check.",
          "Read Active Subscriptions, Active Trials, and Revenue.",
          "Use Charts only when you want to compare months or Apple versus Android.",
        ],
        destinationLabel: "Open RevenueCat",
        destinationUrl: "https://app.revenuecat.com",
        lookFor: "Active Subscriptions",
        note: "New Customers is not a download count and may not match Apple or Google installs.",
      },
    ],
  },
  "apple-ads": {
    topic: "apple-ads",
    eyebrow: "Apple Ads · About one minute",
    title: "See what your Apple promotion is doing",
    intro:
      "Apple Ads Basic keeps the advertising view small: monthly budget, spend, installs, and average cost per install.",
    answer:
      "Start with Spend and Installs. Average CPI tells you what each ad-attributed install cost. Paid-member results belong in RevenueCat after attribution is connected.",
    sections: [
      {
        label: "Apple Ads Basic",
        title: "Review the promotion",
        intro: "Checking results cannot change your budget. Only edit the budget after deciding what you are comfortable spending.",
        steps: [
          "Open Apple Ads Basic and choose NurtureCal.",
          "Choose This Month or Last Calendar Month.",
          "Read Spend, Installs, and Average CPI.",
          "Confirm the status says Running, Paused, or On Hold.",
        ],
        destinationLabel: "Open Apple Ads",
        destinationUrl: "https://app.searchads.apple.com/cm/app",
        lookFor: "Spend · Installs · Average CPI",
        note: "Never raise the monthly budget just because Apple suggests it. Approve the amount as a business decision first.",
      },
    ],
  },
};

export function isGuideTopic(value: string): value is GuideTopic {
  return value === "downloads" || value === "members" || value === "apple-ads";
}
