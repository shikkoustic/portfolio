export type Experience = {
  role: string;
  org: string;
  period: string;
  points: string[];
  accent: string;
  logo: string;
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
    logo: "/logos/zyflow.png",
  },
  {
    role: "Finance Team Sub-Head",
    org: "CodeChef Bennett University",
    period: "Aug 2025 — May 2026",
    points: ["Assisted in 6 events."],
    accent: "#C17A2E",
    logo: "/logos/codechef.svg",
  },
  {
    role: "Junior Core Member",
    org: "CodeChef Bennett University",
    period: "Sept 2024 — Aug 2025",
    points: ["Assisted in 7 events."],
    accent: "#8F6A3E",
    logo: "/logos/codechef.svg",
  },
];
