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
    description:
      "A full-stack platform curating 669 unique DSA problems across 26 topics from LeetCode and CodeChef — topic-wise roadmap, progress dashboard, and contest tracker.",
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
    description:
      "A two-prompt Gemini pipeline: score a resume against a job description, then rewrite only the bullets that are actually weak.",
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
    description:
      "End-to-end video pipeline for cricket shot classification and technique scoring — YOLO11 + ByteTrack tracking, ViTPose extraction, a fine-tuned Timesformer (81.2% test accuracy), served via FastAPI with pose overlays and LLM coaching feedback.",
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
    description:
      "An AI study platform: a Study Agent that parses PDFs into structure-aware outlines and teaches section by section, plus a multi-agent Research Agent producing cited reports — reranked RAG with web-augmented fallback.",
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
    description:
      "ML models (CatBoost, LightGBM, XGBoost, Random Forest) forecasting AQI from Google Earth Engine satellite and meteorological data — full pipeline from collection to visualization.",
    tags: ["Python", "Scikit-learn", "CatBoost", "XGBoost"],
    accent: "#2F8FB5",
    status: "in progress",
    period: "Mar – May 2026",
    href: "#",
  },
];
