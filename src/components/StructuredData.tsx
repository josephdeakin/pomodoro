export default function StructuredData() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Pomodoro Timer",
      description:
        "Free online Pomodoro timer for productivity and focus using the proven Pomodoro Technique",
      applicationCategory: "ProductivityApplication",
      operatingSystem: "Web Browser",
      browserRequirements:
        "Requires JavaScript. Supports Chrome, Firefox, Safari, Edge.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Customizable timer intervals (25/5/15 minutes)",
        "Multiple notification sound options",
        "Session progress tracking",
        "Auto-sequence mode",
        "Works offline",
        "No registration required",
      ],
      url: "https://deakinj.co.uk",
      author: {
        "@type": "Person",
        name: "Joseph Deakin",
      },
      datePublished: "2024-01-01",
      dateModified: new Date().toISOString().split("T")[0],
      inLanguage: "en-GB",
      isAccessibleForFree: true,
      keywords:
        "pomodoro timer, productivity, focus, time management, study timer, work timer, free online timer",
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Use the Pomodoro Technique",
      description:
        "Step-by-step guide to using the Pomodoro Technique for better productivity and focus",
      image: "https://deakinj.co.uk/pomodoro-guide.png",
      totalTime: "PT30M",
      supply: [
        {
          "@type": "HowToSupply",
          name: "Pomodoro Timer",
        },
        {
          "@type": "HowToSupply",
          name: "Task to work on",
        },
      ],
      tool: [
        {
          "@type": "HowToTool",
          name: "Free Online Pomodoro Timer",
        },
      ],
      step: [
        {
          "@type": "HowToStep",
          name: "Choose your task",
          text: "Select a specific task you want to work on during your focus session.",
          url: "https://deakinj.co.uk#step1",
        },
        {
          "@type": "HowToStep",
          name: "Set timer for 25 minutes",
          text: "Start the Pomodoro timer for a 25-minute focused work session.",
          url: "https://deakinj.co.uk#step2",
        },
        {
          "@type": "HowToStep",
          name: "Work without distractions",
          text: "Focus solely on your chosen task until the timer rings. Avoid all distractions.",
          url: "https://deakinj.co.uk#step3",
        },
        {
          "@type": "HowToStep",
          name: "Take a 5-minute break",
          text: "When the timer rings, take a short 5-minute break to rest and recharge.",
          url: "https://deakinj.co.uk#step4",
        },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
