export type Experience = {
  role: string;
  org: string;
  period: string;
  points: string[];
  accent: string;
};

export const experience: Experience[] = [
  {
    role: "Software Development Intern",
    org: "Zyflow Automation",
    period: "Jun 2026 — Present",
    points: [
      "Agentic AI systems — memory, tools, orchestration.",
      "Conversational & voice AI on top of LLMs.",
    ],
    accent: "#2A4FD6",
  },
  {
    role: "Finance Team Sub-Head",
    org: "CodeChef Bennett University",
    period: "Aug 2025 — May 2026",
    points: [
      "Budgeted 4+ CP events, secured ₹6,000+ in sponsorship.",
      "Mentored students in DS-Algo & Competitive Programming.",
    ],
    accent: "#C17A2E",
  },
];
