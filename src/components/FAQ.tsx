interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is the Pomodoro Technique?",
    answer:
      "The Pomodoro Technique is a time management method that breaks work into 25-minute focused intervals, followed by short breaks. After 4 pomodoros, you take a longer break of 15-30 minutes.",
  },
  {
    question: "How long should a Pomodoro session be?",
    answer:
      "A traditional Pomodoro session is 25 minutes long, followed by a 5-minute break. However, you can customize these intervals based on your needs and attention span.",
  },
  {
    question: "Why is it called the Pomodoro Technique?",
    answer:
      "It's named after the tomato-shaped kitchen timer that Francesco Cirillo used when he developed this technique in the late 1980s. 'Pomodoro' means tomato in Italian.",
  },
  {
    question: "Can I pause a Pomodoro session?",
    answer:
      "Ideally, Pomodoro sessions should not be paused. If you must attend to something urgent, it's better to end the current session and start a new one when you're ready to focus again.",
  },
  {
    question: "How many Pomodoros should I do per day?",
    answer:
      "The number varies by individual and task complexity. Most people find 6-8 Pomodoros (3-4 hours of focused work) per day to be sustainable and productive.",
  },
  {
    question: "Is this Pomodoro timer free to use?",
    answer:
      "Yes! This online Pomodoro timer is completely free to use. No registration required, no ads, and works offline once loaded.",
  },
];

export default function FAQ() {
  return (
    <section className="mt-12 max-w-4xl mx-auto text-white/80 z-10 px-4">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-white text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqData.map((item, index) => (
          <details
            key={index}
            className="bg-white/10 rounded-lg p-6 backdrop-blur-sm group"
          >
            <summary className="font-semibold text-white cursor-pointer text-lg mb-2 list-none flex items-center justify-between">
              {item.question}
              <svg
                className="w-5 h-5 transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <p className="text-sm leading-relaxed pt-2 border-t border-white/10">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
