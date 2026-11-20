export type CaseStudy = {
  id: string;
  title: string;
  tags: string[];
  byline: string;
  overview: string;
  architecture: string[];
  sections: { title: string; body: string }[];
  challenges: string[];
  takeaway: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "basecase",
    title: "BaseCase: Building a Curated DSA Roadmap for a 200-Person Club",
    tags: ["Next.js 16", "Drizzle ORM", "Supabase Postgres", "TypeScript"],
    byline: "Solo build for the Bennett DSA Club — Oct 2026",
    overview:
      "The Bennett DSA Club had the usual problem every CP/DSA club has: people grind LeetCode randomly, burn out, and never build a coherent mental model of the topics. BaseCase is my answer — 669 hand-picked problems scraped from LeetCode and CodeChef, organized into a 26-topic roadmap, with a live contest tracker and a personal progress dashboard. It's deployed and actually used by club members today, not a demo that lives in a README.",
    architecture: [
      "Problem scraping (cheerio + scripts) → Postgres via Drizzle ORM",
      "Supabase (Auth + Postgres host, row-level security) → SSR session",
      "Next.js 16 App Router → topic/problem/contest routes",
      "Dashboard aggregation → per-user progress + contest tracker",
    ],
    sections: [
      {
        title: "Data pipeline: scraping into a structured roadmap",
        body: "The 669 problems aren't a dump — they're pulled with cheerio-based scrapers against LeetCode and CodeChef, then hand-sorted into 26 topics so the roadmap reads as a progression (arrays → two pointers → ... → DP), not an alphabetical list. The scraping scripts live outside the request path entirely; the app only ever reads from Postgres, so a slow or rate-limited scrape never touches a live page load.",
      },
      {
        title: "Drizzle over the Supabase JS client",
        body: "Most Supabase side-projects reach for the supabase-js client and stop there. BaseCase goes through Drizzle ORM + the `postgres` driver straight to the Supabase-hosted Postgres instance, with `@supabase/ssr` handling only auth/session state. That split made the schema and queries ordinary, typed TypeScript instead of stringly-typed `.from().select()` chains, and made the row-level-security policies something I could reason about directly in SQL rather than through a client abstraction.",
      },
      {
        title: "Progress dashboard and contest tracker",
        body: "Every solved problem rolls up into a per-topic completion percentage so a member can see exactly where the gaps are, instead of a flat checklist. The contest tracker sits alongside it, pulling upcoming CP contests so the roadmap and the competitive side of the club live in one place instead of three different Discord pins.",
      },
    ],
    challenges: [
      "Supabase connection pooling: Drizzle's direct Postgres connections needed the pooled (pgbouncer) connection string in production, not the direct one — the direct connection works fine locally and then silently exhausts connections under concurrent load on Vercel's serverless functions.",
      "Row-level security policies had to be written to match exactly how Drizzle issues queries (as the authenticated Postgres role via Supabase's JWT claims), not how the Supabase dashboard's policy editor assumes a supabase-js call shapes them.",
      "Scraped problem metadata drifts — LeetCode/CodeChef occasionally change slugs or difficulty labels, so the roadmap needed a re-scrape path that updates in place without duplicating 669 rows.",
    ],
    takeaway:
      "The real lesson here wasn't the scraping or the roadmap curation — it was that going through an ORM instead of the platform's own client SDK pays off the moment you need RLS policies, connection pooling, and typed queries to actually agree with each other. The club gets a tool; I got a much clearer picture of what Supabase is actually doing underneath its own client library.",
  },
  {
    id: "criclens",
    title: "CricLens: Breaking a Cricket Shot Into Frames, Joints, and a Score",
    tags: ["PyTorch", "ViTPose", "YOLO11", "FastAPI", "ByteTrack"],
    byline: "Solo project, submitted across a deep-learning and a classical-CV course — Sept–Nov 2026",
    overview:
      "CricLens takes a raw video of a cricket shot and turns it into three things: which shot it was (one of eight, 81.2% test accuracy), a per-body-part technique score (head, shoulders, hands, hips, feet), and a short rule-based coaching note grounded in the actual measured numbers — not an LLM guessing at commentary. It's a genuinely end-to-end pipeline: detect the batter, track their pose, resample the sequence, classify, score, and render an overlay, all served through a FastAPI backend with a plain HTML/JS frontend.",
    architecture: [
      "Raw clip → YOLO11 (custom-trained detector + player-type classifier) finds the striker",
      "Striker crop → ViTPose-Base extracts 17-joint pose per frame",
      "Pose sequence → contact-anchored window, T=32 resampling, hip-centred normalisation",
      "Normalised sequence → LSTM shot classifier + contrastive technique scorer",
      "Scored result → pitch calibration (stride/swing metrics) → rule-based coaching text → overlay video",
    ],
    sections: [
      {
        title: "Finding the right player in a crowded frame",
        body: "A raw clip usually has a bowler, fielders, and an umpire in frame along with the batter. A generic person detector can't tell you which box is the striker. CricLens runs a custom-trained \"player type\" YOLO model (striker / bat / other) on top of a ByteTrack-driven detector, with a confidence threshold (finder_p ≥ 0.9) borrowed directly from the threshold used to decide which clips were even trustworthy enough to train on in the first place — the same bar the training data had to clear is the bar inference has to clear.",
      },
      {
        title: "Technique scoring: contrastive regression beats a plain VAE",
        body: "The first version of the technique scorer was a VAE regressor predicting absolute per-part scores. It worked, but barely discriminated between parts (partial-rho 0.019 against the overall score). The second version — a contrastive scorer trained on residual targets against same-shot exemplar clips — pushed that to 0.137: a real, if modest, improvement in telling a batter's hand position apart from their footwork instead of just echoing the overall quality score five times. The five shots without enough scored exemplars (lofted, scoop, sweep) fall back to the original VAE.",
      },
      {
        title: "Coaching text that's templated, not generated",
        body: "An LLM phrasing pass (Qwen2.5-1.5B-Instruct) was prototyped and then deliberately dropped: the project's scope is classification and technique scoring, and free-text generation doesn't add anything an LLM-naive grader — or a real coach — would trust over a number. Every coaching line traces back to a measured value through fixed templates, and body-part call-outs are only made when a part's percentile is clearly apart from the others, because the data showed the five part-scores otherwise carry almost no independent signal.",
      },
    ],
    challenges: [
      "Matching the training-time data path exactly at inference: same 480p resize, same contact-anchored window (0.8s before / 0.6s after contact, never crossing a camera cut), same T=32 resampling — any drift here silently degrades predictions without throwing an error.",
      "Late-contact clips (where the follow-through happens after the recording ends) measurably hurt swing scoring — found by checking contact-timing against accuracy on the 48-clip smoke test, not by assumption.",
      "The 2.9GB local LLM prototype for coaching text was fully built and then cut once the measurement showed template text was just as trustworthy and far cheaper to serve — keeping it would have made the whole app undeployable on any free hosting tier.",
    ],
    takeaway:
      "The hardest part of CricLens wasn't the model architecture — LSTMs and contrastive regressors are well-trodden ground. It was making every stage of inference provably mirror training, and being willing to cut the flashiest feature (LLM coaching) once the numbers showed it wasn't earning its cost. A pipeline that's honest about what its 81.2% accuracy and 0.137 partial-rho actually mean is worth more than one with an LLM bolted on for demo appeal.",
  },
  {
    id: "examen",
    title: "Examen: An AI Study Platform That Teaches Back What You Fed It",
    tags: ["FastAPI", "LangGraph", "RAG", "ChromaDB", "MCP"],
    byline: "Multi-agent study platform — Jun–Jul 2026",
    overview:
      "Examen is built around a simple complaint with most \"AI study tools\": they summarize a PDF once and hand you a wall of text. Examen instead has a Study Agent that parses a PDF into a structure-aware outline and teaches it back section by section — like a tutor working through a textbook with you, not a search bar — plus a separate multi-agent Research Agent that produces cited reports when you need information the PDF doesn't have.",
    architecture: [
      "PDF upload → structure-aware parsing → section outline",
      "Outline → Study Agent (LangGraph) teaches section by section, cites back to source",
      "Query without a source doc → multi-agent Research Agent → cited report",
      "Both agents → ChromaDB (sentence-transformer embeddings + cross-encoder reranking) for retrieval",
      "MCP tool servers → notes, quizzes, live search as callable tools for either agent",
    ],
    sections: [
      {
        title: "Two agents, two different jobs",
        body: "The Study Agent and the Research Agent are deliberately not the same agent wearing different prompts. The Study Agent's whole job is staying faithful to one document — teach back only what's in the outline, in order, citing the section it came from. The Research Agent's job is the opposite: go find information the uploaded material doesn't have, across multiple sources, and come back with a cited report. Keeping them separate kept each one's prompt and tool access small enough to actually reason about, instead of one agent juggling both modes and silently drifting between them.",
      },
      {
        title: "Retrieval: embeddings plus reranking, not just a vector search",
        body: "The RAG pipeline runs on ChromaDB with sentence-transformer embeddings for the first retrieval pass, then a cross-encoder reranker narrows that down before anything reaches the agent's context. A first-pass embedding search alone tends to surface passages that are topically close but not actually the right answer to a specific question; the reranking step is what keeps the Study Agent's citations pointing at the section that actually supports what it just taught.",
      },
      {
        title: "MCP tool servers for notes, quizzes, and live search",
        body: "Rather than hard-coding \"take notes\" or \"generate a quiz\" as special-cased functions inside the agent loop, those live as MCP tool servers the agent can call like any other tool. That keeps the agent's core loop (plan → retrieve → answer) and its feature set (notes, quizzes, search) on separate axes — adding a new study feature means adding a new MCP tool, not touching the agent's reasoning logic.",
      },
    ],
    challenges: [
      "Structure-aware PDF parsing has to survive real student PDFs: scanned slide decks, inconsistent heading styles, two-column layouts — a naive page-by-page chunker breaks the section outline the whole Study Agent flow depends on.",
      "Deploying this for free is a genuinely open problem: it needs a persistent vector DB, LLM API calls for both agents, and MCP tool servers running continuously — none of which fit comfortably inside a single free-tier web service the way a stateless API does.",
      "Keeping the Research Agent's citations honest (not inventing a source) required the cross-encoder reranking step to be strict enough to reject weak matches rather than always returning its top-k regardless of relevance.",
    ],
    takeaway:
      "Examen is the project where the agent design mattered more than the model. Splitting \"stay faithful to this document\" from \"go research this topic\" into two agents, and pushing features out into MCP tools instead of special-cased functions, is what kept a RAG pipeline with this many moving parts from turning into one unmanageable prompt. It's also the project most honestly still a prototype — the retrieval and agent logic work, but it doesn't yet have a deployment story that fits a free tier.",
  },
  {
    id: "vayu",
    title: "Vayu: Forecasting Delhi's Air Quality From Satellite Data, Five Models at a Time",
    tags: ["Python", "scikit-learn", "CatBoost", "TensorFlow", "Google Earth Engine"],
    byline: "Satellite + weather ensemble, deployed and live — Mar–May 2026",
    overview:
      "Vayu pulls Google Earth Engine satellite imagery (MODIS, Sentinel-5P) and Open-Meteo weather data for five Delhi regions, runs it through a five-model ensemble — CatBoost, LightGBM, XGBoost, Random Forest, and a GRU — and forecasts next-step PM2.5, auto-refreshing every two hours. It's live at vayu-aqi-forecasting.onrender.com, not a notebook that produced one good-looking chart.",
    architecture: [
      "GEE (MODIS AOD/NO₂/CO/SO₂) + Open-Meteo (weather, 2-hourly) → feature pipeline",
      "Lag/rolling/time features, log1p target → CatBoost / LightGBM / XGBoost / Random Forest / GRU, per region",
      "APScheduler → re-pulls data and refreshes forecasts every 2 hours",
      "Flask app → dashboard, auto-refreshing on its own schedule",
    ],
    sections: [
      {
        title: "Five models, one pipeline, per region",
        body: "Rather than picking one \"best\" model, Vayu trains all five per Delhi region and the dashboard shows the ensemble's forecast. The feature engineering — lag features, rolling windows, time-of-day features, and a log1p-transformed PM2.5 target — is shared across every model so the comparison between them is actually fair, and metrics are reported back on the inverse-transformed (expm1) scale so an R² number means what it looks like it means.",
      },
      {
        title: "Fixing a GRU that was quietly broken",
        body: "Two of the five regions were producing negative R² on the GRU — worse than predicting the mean. The cause was satellite-reading outliers (one region's feature values peaked near 11,500 against another's ~4,000) blowing out a StandardScaler's mean/std, which fed the GRU garbage-scaled inputs. Switching to a RobustScaler, clipping the scaled inputs to [-8, 8], shrinking the network, and lowering the learning rate with gradient clipping turned all five regions positive (R² 0.46–0.60) — a reminder that a negative R² on a neural net is almost always a data problem wearing a model-architecture costume.",
      },
      {
        title: "Shipping it for free: the real deployment problem",
        body: "The blocker wasn't the ML, it was the deploy: TensorFlow needed a specific Python version Render's default didn't have, and the Gemini SDK's dependency on `google-ai-generativelanguage` hard-pinned a protobuf version that directly conflicted with TensorFlow's own protobuf requirement. Both were genuine, unresolvable version conflicts, not configuration mistakes — fixed by pinning `.python-version` to 3.12 and swapping to the actively maintained `google-genai` client, which has no such pin.",
      },
    ],
    challenges: [
      "A negative-R² GRU traced back to StandardScaler being destabilized by satellite outliers across regions with very different feature magnitudes — fixed with RobustScaler + clipping + gradient clipping, not by abandoning the GRU.",
      "`pip install -r requirements.txt` on a clean host correctly rejected a dependency combination that worked locally only because packages had been installed out of order, one at a time — a reminder that a working local environment isn't proof a clean install will succeed.",
      "Render's free-tier Python version had no TensorFlow wheel available until pinned explicitly via `.python-version`.",
    ],
    takeaway:
      "Vayu's forecasts are only as honest as the scaling and evaluation choices under them — the GRU fix mattered more than any hyperparameter tuning would have. And the deploy failures weren't noise to push through; each one (missing Python version, a real protobuf conflict) was a genuine bug that a clean, from-scratch install surfaces and a comfortable local environment hides.",
  },
];
