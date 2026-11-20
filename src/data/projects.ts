export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
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
    longDescription:
      "Built and deployed solo for the Bennett DSA Club — 669 hand-picked problems pulled from LeetCode and CodeChef, organized into a 26-topic roadmap so people stop randomly grinding. Tracks personal progress and has a contest tracker. Actually used by club members today, not a portfolio piece that never shipped.",
    tags: ["Next.js", "Supabase", "TypeScript"],
    accent: "#3659E3",
    status: "live",
    period: "Oct 2026",
    href: "https://basecase-red.vercel.app",
  },
  {
    id: "resumeforge",
    name: "ResumeForge AI",
    tagline: "Resume, scored and rewritten",
    description: "Scores your resume against a JD, then rewrites only the weak bullets.",
    longDescription:
      "A two-prompt Gemini pipeline built for a Prompt Engineering mini-project: the first prompt scores a resume against a specific job description and flags the weak bullets, the second rewrites only those flagged lines — never the whole resume. Built with a 3-person team (Team Rangers) for SCSE4041.",
    tags: ["Streamlit", "Gemini API", "Python"],
    accent: "#D98A32",
    status: "live",
    period: "Nov 2026",
    href: "https://resumeforge-ai-shikhar.streamlit.app",
  },
  {
    id: "criclens",
    name: "CricLens",
    tagline: "Cricket, broken into frames",
    description: "Shot classification + technique scoring from raw video. 81.2% accuracy.",
    longDescription:
      "An end-to-end cricket video pipeline: YOLO11 + ByteTrack finds and tracks the batter, ViTPose extracts joint positions frame by frame, and a fine-tuned Timesformer classifies the shot (81.2% test accuracy, 3-seed validated). Served through FastAPI with pose overlays and LLM-generated coaching notes. Submitted across two courses — deep learning and classical computer vision.",
    tags: ["PyTorch", "Timesformer", "ViTPose", "YOLO11", "FastAPI"],
    accent: "#2F8F62",
    status: "in progress",
    period: "Sept – Nov 2026",
    href: "#",
  },
  {
    id: "examen",
    name: "Examen",
    tagline: "RAG, for actually studying",
    description: "Parses your PDFs, teaches them back section by section, cites its sources.",
    longDescription:
      "An AI study platform with two agents: a Study Agent that parses PDFs into structure-aware outlines and teaches them back section by section, and a multi-agent Research Agent that produces cited reports. The RAG pipeline runs on ChromaDB with sentence-transformer embeddings and cross-encoder reranking, with MCP tool servers for notes, quizzes, and live search.",
    tags: ["FastAPI", "LangGraph", "RAG", "ChromaDB", "MCP"],
    accent: "#7B5CE0",
    status: "in progress",
    period: "Jun – Jul 2026",
    href: "#",
  },
  {
    id: "vayu",
    name: "Vayu",
    tagline: "Air quality, forecasted",
    description: "Satellite + weather data in, AQI forecast out. Five models, one pipeline.",
    longDescription:
      "Satellite and weather data in, air-quality forecast out. Pulls Google Earth Engine satellite imagery and meteorological data, runs it through a CatBoost, LightGBM, XGBoost, Random Forest and GRU ensemble across five Delhi regions, and visualizes the forecast end to end — from raw data collection to a usable dashboard, auto-refreshing every two hours.",
    tags: ["Python", "Scikit-learn", "CatBoost", "XGBoost", "TensorFlow"],
    accent: "#1E9BB0",
    status: "live",
    period: "Mar – May 2026",
    href: "https://vayu-aqi-forecasting.onrender.com",
  },
];
