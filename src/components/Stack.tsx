const TOOLS = [
  "Python",
  "TypeScript",
  "Next.js",
  "React",
  "FastAPI",
  "Flask",
  "PyTorch",
  "YOLO",
  "OpenCV",
  "scikit-learn",
  "Supabase",
  "PostgreSQL",
  "Tailwind",
  "LangGraph",
  "Gemini API",
];

export default function Stack() {
  const loop = [...TOOLS, ...TOOLS];
  return (
    <section className="flex h-full flex-col items-center justify-center gap-6 border-b border-line bg-cream px-5">
      <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">
        ( Tools I reach for )
      </span>
      <div className="scrollbar-none w-full overflow-x-hidden">
        <div className="marquee-track flex w-max gap-10 px-5">
          {loop.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="font-display whitespace-nowrap text-2xl font-extrabold uppercase tracking-tight text-ink-soft/70 sm:text-3xl"
            >
              {t} <span className="text-ink-soft/30">✺</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
