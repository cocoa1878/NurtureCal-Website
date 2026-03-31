export type ChecklistStatus = "done" | "in_progress" | "blocked" | "pending";
export type ScreenBuildStatus = "built" | "polish" | "blocked" | "pending";
export type ScreenApprovalStatus =
  | "wireframe_ready"
  | "mockup_pending"
  | "ready_for_review"
  | "approved";
export type ScreenMockupStatus = "pending" | "ready";

export type ChecklistItem = {
  label: string;
  status: ChecklistStatus;
  note?: string;
};

export type ChecklistGroup = {
  id: string;
  title: string;
  summary: string;
  items: ChecklistItem[];
};

export type PreviewConfig = {
  eyebrow: string;
  title: string;
  body: string;
  chips?: string[];
  cta: string;
};

export type ScreenApprovalItem = {
  id: string;
  title: string;
  route: string;
  purpose: string;
  buildStatus: ScreenBuildStatus;
  approvalStatus: ScreenApprovalStatus;
  mockupStatus: ScreenMockupStatus;
  note: string;
  preview: PreviewConfig;
};

export type ScreenApprovalGroup = {
  id: string;
  title: string;
  summary: string;
  items: ScreenApprovalItem[];
};

function screen(item: ScreenApprovalItem): ScreenApprovalItem {
  return item;
}

export const checklistGroups: ChecklistGroup[] = [
  {
    id: "website",
    title: "Website launch",
    summary: "Public landing site, waitlist capture, domain cutover, and final visuals.",
    items: [
      {
        label: "Landing page published and publicly reachable",
        status: "done",
        note: "The site is live from the GitHub-connected Vercel project and can now update from the public website repo."
      },
      {
        label: "Waitlist form collects full name and email",
        status: "done",
        note: "The form is wired through Resend and sends both owner notification and user confirmation emails."
      },
      {
        label: "Permanent Vercel project connected to the website repo",
        status: "done",
        note: "The public GitHub website repo is now connected to Vercel for deployment."
      },
      {
        label: "Official domain connected: nurturecal.com",
        status: "done",
        note: "The primary domain is connected and serving the live website."
      },
      {
        label: "Real App Store and Google Play badges with Coming Soon",
        status: "done",
        note: "The landing page now shows real platform-style badges with Coming Soon messaging."
      },
      {
        label: "Provided laptop and phone mockups replace the old placeholder device art",
        status: "done",
        note: "The showcase section now uses the provided visual assets instead of abstract placeholder blocks."
      },
      {
        label: "Final desktop and mobile QA pass on the permanent domain",
        status: "pending"
      }
    ]
  },
  {
    id: "app-core",
    title: "App core build",
    summary: "Core NurtureCal mobile experience, aligned to the approved method.",
    items: [
      {
        label: "NurtureCal branding, method logic, and 15-step onboarding aligned to the questionnaire",
        status: "done"
      },
      {
        label: "Manual logging, USDA search flow, and custom foods",
        status: "done"
      },
      {
        label: "AI meal photo logging and AI meal suggestions in the shell",
        status: "done",
        note: "Built with dev-safe fallback behavior until production OpenAI account setup exists."
      },
      {
        label: "Progress tracking, reminders, and dashboard summaries",
        status: "done"
      },
      {
        label: "Screen-by-screen visual approval set for the launch routes",
        status: "in_progress",
        note: "The status page exists now; actual polished mockup assets are still the next step."
      }
    ]
  },
  {
    id: "infra",
    title: "Accounts and infrastructure",
    summary: "Production accounts, services, and app ownership setup.",
    items: [
      {
        label: "Separate GitHub repo created for the Expo mobile app under the client's ownership",
        status: "done",
        note: "The mobile app now has its own client-owned GitHub repository."
      },
      {
        label: "Production Supabase project created and linked",
        status: "done",
        note: "The production Supabase project is set up and linked for the app."
      },
      {
        label: "Supabase migrations and Edge Functions deployed",
        status: "done",
        note: "The production database migrations and Edge Functions are deployed."
      },
      {
        label: "USDA secret deployed to production backend",
        status: "done",
        note: "The USDA secret is available in the production backend environment."
      },
      {
        label: "OpenAI production setup for the mobile app",
        status: "done",
        note: "The mobile app production OpenAI setup is complete."
      },
      {
        label: "RevenueCat account, products, and entitlements",
        status: "pending"
      }
    ]
  },
  {
    id: "launch",
    title: "Store launch and QA",
    summary: "Release validation, store assets, and first submission cycle.",
    items: [
      {
        label: "Apple Developer account and App Store Connect app record",
        status: "pending"
      },
      {
        label: "Google Play Console account and Android app record",
        status: "pending"
      },
      {
        label: "Subscription sandbox testing with RevenueCat restore flow",
        status: "pending"
      },
      {
        label: "Release build QA on iPhone and Android",
        status: "pending"
      },
      {
        label: "Store screenshots, metadata, privacy labels, and legal links",
        status: "pending"
      },
      {
        label: "Initial submission and first follow-up store-review fixes",
        status: "pending"
      }
    ]
  }
];

export const screenApprovalGroups: ScreenApprovalGroup[] = [
  {
    id: "onboarding-steps",
    title: "Onboarding steps",
    summary: "The 15-step onboarding flow is one route in the app, but it still needs individual approval for each step.",
    items: [
      screen({
        id: "step-1",
        title: "Step 1 - Welcome",
        route: "Onboarding",
        purpose: "Open the guided flow and explain that the app will build a realistic starting plan.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Built in the app, but no polished screen comp exists yet.",
        preview: {
          eyebrow: "Step 1 of 15",
          title: "Welcome",
          body: "Start with a few details so NurtureCal can build a balanced plan that feels realistic.",
          chips: ["Balanced meals", "No carb cutting"],
          cta: "Continue"
        }
      }),
      screen({
        id: "step-2",
        title: "Step 2 - Method principles",
        route: "Onboarding",
        purpose: "Explain protein + carb + veggies and the non-restrictive method.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "This is the key teaching step and deserves a final approved comp.",
        preview: {
          eyebrow: "Step 2 of 15",
          title: "Method principles",
          body: "Protein + carb + veggies. Carbs are not the enemy. Pair carbs with protein.",
          chips: ["Protein", "Carb", "Veggies"],
          cta: "Continue"
        }
      }),
      screen({
        id: "step-3",
        title: "Step 3 - Goal",
        route: "Onboarding",
        purpose: "Choose the user's starting goal preset.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Goal options are implemented and need individual approval.",
        preview: {
          eyebrow: "Step 3 of 15",
          title: "Choose your goal",
          body: "Set the main outcome your first targets should support.",
          chips: ["Fat loss", "Maintenance", "Muscle gain"],
          cta: "Continue"
        }
      }),
      screen({
        id: "step-4",
        title: "Step 4 - Sex",
        route: "Onboarding",
        purpose: "Set the sex input used in carb range selection.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Compact step, but still needs approval coverage.",
        preview: {
          eyebrow: "Step 4 of 15",
          title: "Sex",
          body: "This helps set the carbohydrate range that pairs with your calorie and protein targets.",
          chips: ["Female", "Male"],
          cta: "Continue"
        }
      }),
      screen({
        id: "step-5",
        title: "Step 5 - Age",
        route: "Onboarding",
        purpose: "Collect age for the calorie calculation.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Functional in the flow; no final design comp yet.",
        preview: {
          eyebrow: "Step 5 of 15",
          title: "Age",
          body: "Your age helps calculate the starting calorie target using sedentary Mifflin-St Jeor.",
          chips: ["18-99"],
          cta: "Continue"
        }
      }),
      screen({
        id: "step-6",
        title: "Step 6 - Height",
        route: "Onboarding",
        purpose: "Collect feet and inches for the calorie calculation.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Needs a proper approval comp showing the feet and inches fields.",
        preview: {
          eyebrow: "Step 6 of 15",
          title: "Height",
          body: "Use feet and inches so your calorie target matches the rest of your profile inputs.",
          chips: ["Feet", "Inches"],
          cta: "Continue"
        }
      }),
      screen({
        id: "step-7",
        title: "Step 7 - Current weight",
        route: "Onboarding",
        purpose: "Set the current-weight baseline for progress and calorie logic.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Implemented but not mocked up for approval yet.",
        preview: {
          eyebrow: "Step 7 of 15",
          title: "Current weight",
          body: "Your current weight sets the starting baseline for progress tracking and calorie calculations.",
          chips: ["Lbs"],
          cta: "Continue"
        }
      }),
      screen({
        id: "step-8",
        title: "Step 8 - Goal weight",
        route: "Onboarding",
        purpose: "Set the goal-weight input used for protein targets.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Important step because protein targets depend on goal weight.",
        preview: {
          eyebrow: "Step 8 of 15",
          title: "Goal weight",
          body: "Protein targets are based on goal body weight so the plan stays aligned with the method.",
          chips: ["Goal weight"],
          cta: "Continue"
        }
      }),
      screen({
        id: "step-9",
        title: "Step 9 - Training mode",
        route: "Onboarding",
        purpose: "Choose between general and higher-training behavior.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Built and reviewable, but not yet represented with a polished comp.",
        preview: {
          eyebrow: "Step 9 of 15",
          title: "Training mode",
          body: "Choose the training level that best fits your current routine.",
          chips: ["General", "Higher training"],
          cta: "Continue"
        }
      }),
      screen({
        id: "step-10",
        title: "Step 10 - Health considerations",
        route: "Onboarding",
        purpose: "Handle health flags and the pregnancy/breastfeeding stop path.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "This step needs a careful approval pass because it changes flow behavior.",
        preview: {
          eyebrow: "Step 10 of 15",
          title: "Health considerations",
          body: "These notes shape the plan gently and flag cases where NurtureCal is not recommended.",
          chips: ["Diabetes", "Kidney", "Pregnancy"],
          cta: "Continue"
        }
      }),
      screen({
        id: "step-11",
        title: "Step 11 - Measurements",
        route: "Onboarding",
        purpose: "Collect optional waist, hips, and chest baselines.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Optional step and skip behavior both need to be shown in a mockup later.",
        preview: {
          eyebrow: "Step 11 of 15",
          title: "Measurements",
          body: "Waist, hips, and chest are optional now and can be added later.",
          chips: ["Waist", "Hips", "Chest"],
          cta: "Skip or continue"
        }
      }),
      screen({
        id: "step-12",
        title: "Step 12 - Reminder preference",
        route: "Onboarding",
        purpose: "Choose reminder settings for meal logging and weigh-ins.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Built and working, but not yet mocked up individually.",
        preview: {
          eyebrow: "Step 12 of 15",
          title: "Reminder preference",
          body: "Choose how often you want meal logging or weigh-in reminders.",
          chips: ["Meal logging", "Weigh-in", "Both"],
          cta: "Continue"
        }
      }),
      screen({
        id: "step-13",
        title: "Step 13 - Target preview",
        route: "Onboarding",
        purpose: "Show the first calorie and macro result before account creation.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "One of the most important approval screens and should get a polished comp soon.",
        preview: {
          eyebrow: "Step 13 of 15",
          title: "Target preview",
          body: "See calories, protein, carbs, and fat based on your goal weight and health flags.",
          chips: ["Calories", "Protein", "Carbs"],
          cta: "Continue"
        }
      }),
      screen({
        id: "step-14",
        title: "Step 14 - Account creation",
        route: "Onboarding",
        purpose: "Create the account near the end of the flow.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Works today, but no actual approval mockup has been made.",
        preview: {
          eyebrow: "Step 14 of 15",
          title: "Account creation",
          body: "Create your account near the end so your targets and profile can be saved together.",
          chips: ["Email", "Password"],
          cta: "Create account"
        }
      }),
      screen({
        id: "step-15",
        title: "Step 15 - Summary",
        route: "Onboarding",
        purpose: "Recap the setup before moving into premium.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Implemented, but it still needs a polished final-summary comp.",
        preview: {
          eyebrow: "Step 15 of 15",
          title: "Summary",
          body: "Review your goal, targets, and reminder settings before continuing to premium.",
          chips: ["Goal", "Targets", "Reminders"],
          cta: "Continue"
        }
      })
    ]
  },
  {
    id: "core-routes",
    title: "Core app routes",
    summary: "Primary routes outside the onboarding step list.",
    items: [
      screen({
        id: "welcome-route",
        title: "Welcome route",
        route: "Welcome",
        purpose: "Start onboarding or let returning users sign in.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "The route exists, but the final approval comp is still pending.",
        preview: {
          eyebrow: "Route",
          title: "Welcome",
          body: "A calm entry point that starts onboarding and offers sign-in for returning users.",
          chips: ["Get started", "I already have an account"],
          cta: "Get started"
        }
      }),
      screen({
        id: "auth",
        title: "Auth",
        route: "Auth",
        purpose: "Sign in returning users and handle direct entry fallback.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Functional, but it still needs a polished approval mockup.",
        preview: {
          eyebrow: "Route",
          title: "Sign in",
          body: "Returning users can log in and continue without repeating onboarding.",
          chips: ["Email", "Password"],
          cta: "Sign in"
        }
      }),
      screen({
        id: "paywall",
        title: "Paywall",
        route: "Paywall",
        purpose: "Present annual and monthly plans after onboarding.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "RevenueCat production wiring is still pending, but the screen flow exists.",
        preview: {
          eyebrow: "Route",
          title: "Unlock NurtureCal",
          body: "Show annual by default, monthly as secondary, and a restore path.",
          chips: ["$59.99 annual", "$14.99 monthly", "7-day trial"],
          cta: "Start free trial"
        }
      }),
      screen({
        id: "dashboard",
        title: "Dashboard",
        route: "Dashboard",
        purpose: "Show daily calories, macros, recent meals, and meal suggestions.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Core dashboard is functional and needs final visual approval assets.",
        preview: {
          eyebrow: "Tab",
          title: "Dashboard",
          body: "Daily calories, macros, recent meals, and AI suggestions live here.",
          chips: ["Calories", "Macros", "Suggestions"],
          cta: "Log a meal"
        }
      }),
      screen({
        id: "progress",
        title: "Progress",
        route: "Progress",
        purpose: "Show weight and measurement trends with simple visuals.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Progress tracking works; approval-ready visual comps are still needed.",
        preview: {
          eyebrow: "Tab",
          title: "Progress",
          body: "Weight history and basic body measurements stay easy to read.",
          chips: ["Weight", "Waist", "Hips"],
          cta: "Add entry"
        }
      }),
      screen({
        id: "profile",
        title: "Profile",
        route: "Profile",
        purpose: "Show account details, plan summary, and profile overview.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Functional in the shell; visual approval artifacts still pending.",
        preview: {
          eyebrow: "Tab",
          title: "Profile",
          body: "Keep account details, reminders, and profile information visible in one place.",
          chips: ["Profile", "Reminders", "Plan"],
          cta: "Edit profile"
        }
      }),
      screen({
        id: "settings",
        title: "Settings",
        route: "Settings",
        purpose: "Manage reminders, legal links, and account-adjacent preferences.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Implemented in the shell and ready for design-review packaging.",
        preview: {
          eyebrow: "Route",
          title: "Settings",
          body: "Adjust reminders, open legal pages, and manage the account experience.",
          chips: ["Reminders", "Privacy", "Terms"],
          cta: "Save changes"
        }
      })
    ]
  },
  {
    id: "food-and-progress",
    title: "Food logging and progress entry routes",
    summary: "Meal logging, AI logging, and entry forms outside the main tabs.",
    items: [
      screen({
        id: "food-search",
        title: "Food Search",
        route: "FoodSearch",
        purpose: "Search USDA foods, recent foods, and custom foods before logging.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "USDA-backed path is scaffolded; final production backend still needs account cutover.",
        preview: {
          eyebrow: "Food",
          title: "Food search",
          body: "Search USDA foods, recent foods, and custom foods before you save a meal.",
          chips: ["USDA", "Recent", "Custom"],
          cta: "Select food"
        }
      }),
      screen({
        id: "food-review",
        title: "Food Review",
        route: "FoodReview",
        purpose: "Review serving size and meal details before saving a food log entry.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Functional and ready for screen comp approval.",
        preview: {
          eyebrow: "Food",
          title: "Review meal",
          body: "Adjust serving size and meal type before saving the log entry.",
          chips: ["Serving size", "Meal type"],
          cta: "Save meal"
        }
      }),
      screen({
        id: "custom-food-editor",
        title: "Custom Food Editor",
        route: "CustomFoodEditor",
        purpose: "Create and save custom foods for repeat logging.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "The feature exists, but a tailored approval mockup is still needed.",
        preview: {
          eyebrow: "Food",
          title: "Custom food",
          body: "Add your own name, calories, protein, carbs, and fat for repeat use.",
          chips: ["Name", "Macros"],
          cta: "Save custom food"
        }
      }),
      screen({
        id: "meal-photo-capture",
        title: "Meal Photo Capture",
        route: "MealPhotoCapture",
        purpose: "Capture or select one meal photo for AI review.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Flow exists, but the final approval image set should show the actual camera experience.",
        preview: {
          eyebrow: "AI photo",
          title: "Capture meal",
          body: "Take or upload one meal photo for AI-assisted food review.",
          chips: ["Camera", "Library"],
          cta: "Analyze photo"
        }
      }),
      screen({
        id: "meal-photo-review",
        title: "Meal Photo Review",
        route: "MealPhotoReview",
        purpose: "Review detected foods and edit before saving the AI meal log.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "The editable review flow is working and needs design-approval packaging.",
        preview: {
          eyebrow: "AI photo",
          title: "Review photo results",
          body: "Edit identified foods and macros before saving the meal to the day log.",
          chips: ["Detected foods", "Edit macros"],
          cta: "Save meal"
        }
      }),
      screen({
        id: "meal-suggestion-detail",
        title: "Meal Suggestion Detail",
        route: "MealSuggestionDetail",
        purpose: "Show a suggested balanced meal and save it into the day log.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Built in the shell; still needs final screen comps.",
        preview: {
          eyebrow: "AI suggestion",
          title: "Meal suggestion",
          body: "Show a balanced meal idea that fits the remaining day targets.",
          chips: ["Protein", "Carb", "Veggies"],
          cta: "Save suggestion"
        }
      }),
      screen({
        id: "weight-entry",
        title: "Weight Entry",
        route: "WeightEntry",
        purpose: "Add a new weight value tied to progress history.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Implemented; polished approval visuals still pending.",
        preview: {
          eyebrow: "Progress",
          title: "Weight entry",
          body: "Log a new weight value and keep the timeline current.",
          chips: ["Weight", "Date"],
          cta: "Save entry"
        }
      }),
      screen({
        id: "measurement-entry",
        title: "Measurement Entry",
        route: "MeasurementEntry",
        purpose: "Add waist, hips, or chest measurements for progress tracking.",
        buildStatus: "built",
        approvalStatus: "wireframe_ready",
        mockupStatus: "pending",
        note: "Implemented; polished approval visuals still pending.",
        preview: {
          eyebrow: "Progress",
          title: "Measurement entry",
          body: "Add waist, hips, or chest measurements without clutter.",
          chips: ["Waist", "Hips", "Chest"],
          cta: "Save entry"
        }
      })
    ]
  }
];
