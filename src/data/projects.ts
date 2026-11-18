export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  accent: string;
  status: "live" | "in progress";
  href: string;
};

export const projects: Project[] = [
  {
    id: "basecase",
    name: "BaseCase",
    tagline: "DSA Club, reworked",
    description:
      "A 669-problem structured DSA roadmap and tracker for the college DSA Club — built on Next.js and Supabase.",
    tags: ["Next.js", "Supabase", "TypeScript"],
    accent: "#2A4FD6",
    status: "live",
    href: "https://basecase-red.vercel.app",
  },
  {
    id: "resumeforge",
    name: "ResumeForge AI",
    tagline: "Resume, scored and rewritten",
    description:
      "A two-prompt Gemini pipeline: score a resume against a job description, then rewrite only the bullets that are actually weak.",
    tags: ["Streamlit", "Gemini API", "Python"],
    accent: "#C17A2E",
    status: "live",
    href: "https://resumeforge-ai-shikhar.streamlit.app",
  },
  {
    id: "criclens",
    name: "CricLens",
    tagline: "Cricket, broken into frames",
    description:
      "Computer-vision shot analysis for cricket — batter detection, YOLO pose tracking, shot classification, and technique scoring from raw video.",
    tags: ["FastAPI", "YOLO", "OpenCV", "PyTorch"],
    accent: "#2F5233",
    status: "in progress",
    href: "#",
  },
  {
    id: "ai-assistant",
    name: "AI Study Assistant",
    tagline: "RAG, for actually studying",
    description:
      "A retrieval-augmented study tool: ingest PDFs and YouTube lectures, then query them through a LangGraph agent with cited answers.",
    tags: ["FastAPI", "LangGraph", "ChromaDB", "React"],
    accent: "#6C4FD6",
    status: "in progress",
    href: "#",
  },
  {
    id: "vayu",
    name: "Vayu",
    tagline: "Air quality, forecasted",
    description:
      "Satellite-data AQI forecasting and dashboard for Delhi-region air quality, with a model behind every number.",
    tags: ["Flask", "scikit-learn", "pandas"],
    accent: "#2F8FB5",
    status: "in progress",
    href: "#",
  },
];
