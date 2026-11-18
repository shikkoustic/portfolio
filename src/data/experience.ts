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
      "Developing AI-powered applications using modern development workflows and cloud-based deployment practices.",
      "Designing agentic AI systems — context management, memory handling, tool integration, workflow orchestration.",
      "Building conversational and voice-based AI solutions on top of LLMs and automation frameworks.",
    ],
    accent: "#2A4FD6",
  },
  {
    role: "Finance Team Sub-Head",
    org: "CodeChef Bennett University",
    period: "Aug 2025 — May 2026",
    points: [
      "Managed financial planning and budget allocation for 4+ intra-college competitive programming events.",
      "Secured sponsor funding worth ₹6,000+ for technical events and community initiatives.",
      "Mentored students in DS-Algo and Competitive Programming through chapter activities and discussions.",
    ],
    accent: "#C17A2E",
  },
];
