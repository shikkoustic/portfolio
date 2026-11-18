export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  accent: string;
  status: "live" | "in progress";
  period: string;
  href: string;
};

export const projects: Project[] = [
  {
    id: "basecase",
    name: "BaseCase",
    tagline: "DSA, curated and tracked",
    description: "669 DSA problems, 26 topics, one roadmap. Progress dashboard + contest tracker.",
    tags: ["Next.js", "Supabase", "TypeScript"],
    accent: "#2A4FD6",
    status: "live",
    period: "Oct 2026",
    href: "https://basecase-red.vercel.app",
  },
  {
    id: "resumeforge",
    name: "ResumeForge AI",
    tagline: "Resume, scored and rewritten",
    description: "Scores your resume against a JD, then rewrites only the weak bullets.",
    tags: ["Streamlit", "Gemini API", "Python"],
    accent: "#C17A2E",
    status: "live",
    period: "Nov 2026",
    href: "https://resumeforge-ai-shikhar.streamlit.app",
  },
  {
    id: "criclens",
    name: "CricLens",
    tagline: "Cricket, broken into frames",
    description: "Shot classification + technique scoring from raw video. 81.2% accuracy.",
    tags: ["PyTorch", "Timesformer", "ViTPose", "YOLO11", "FastAPI"],
    accent: "#2F5233",
    status: "in progress",
    period: "Sept – Nov 2026",
    href: "#",
  },
  {
    id: "examen",
    name: "Examen",
    tagline: "RAG, for actually studying",
    description: "Parses your PDFs, teaches them back section by section, cites its sources.",
    tags: ["FastAPI", "LangGraph", "RAG", "ChromaDB", "MCP"],
    accent: "#6C4FD6",
    status: "in progress",
    period: "Jun – Jul 2026",
    href: "#",
  },
  {
    id: "vayu",
    name: "Vayu",
    tagline: "Air quality, forecasted",
    description: "Satellite + weather data in, AQI forecast out. Four models, one pipeline.",
    tags: ["Python", "Scikit-learn", "CatBoost", "XGBoost"],
    accent: "#2F8FB5",
    status: "in progress",
    period: "Mar – May 2026",
    href: "#",
  },
];
