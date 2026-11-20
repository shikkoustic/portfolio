import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/caseStudies";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ id: c.id }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const study = caseStudies.find((c) => c.id === id);
  const project = projects.find((p) => p.id === id);
  if (!study || !project) notFound();

  return (
    <main className="bg-cream text-ink">
      <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-10 sm:py-20">
        <Link
          href="/#work"
          className="text-xs font-bold uppercase tracking-widest text-ink-soft hover:text-ink"
        >
          ← Back to projects
        </Link>

        <div className="mt-8 flex flex-wrap gap-1.5">
          {study.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>

        <h1 className="font-display mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
          {study.title}
        </h1>
        <p className="mt-3 text-sm text-ink-soft sm:text-base">{study.byline}</p>

        {project.href !== "#" && (
          <a
            href={project.href}
            target={project.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide text-cream"
            style={{ background: project.accent }}
          >
            View the live project ↗
          </a>
        )}

        <section className="mt-10 border-t border-line pt-8">
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
            Overview
          </h2>
          <p className="mt-3 text-base leading-relaxed sm:text-lg">{study.overview}</p>
        </section>

        <section className="mt-10 border-t border-line pt-8">
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
            System Architecture
          </h2>
          <div className="mt-4 flex flex-col gap-2">
            {study.architecture.map((stage, i) => (
              <div key={stage} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-cream"
                  style={{ background: project.accent }}
                >
                  {i + 1}
                </span>
                <p className="font-mono text-xs leading-relaxed text-ink-soft sm:text-sm">
                  {stage}
                </p>
              </div>
            ))}
          </div>
        </section>

        {study.sections.map((s) => (
          <section key={s.title} className="mt-10 border-t border-line pt-8">
            <h2 className="font-display text-lg font-extrabold sm:text-xl">{s.title}</h2>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-soft sm:text-base">{s.body}</p>
          </section>
        ))}

        <section className="mt-10 border-t border-line pt-8">
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
            Engineering Challenges
          </h2>
          <ul className="mt-3 flex flex-col gap-3">
            {study.challenges.map((c) => (
              <li key={c} className="flex gap-3 text-sm leading-relaxed sm:text-base">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: project.accent }} />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 border-t border-line pt-8 pb-4">
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
            Engineering Takeaway
          </h2>
          <p className="mt-3 text-base leading-relaxed italic text-ink-soft sm:text-lg">
            {study.takeaway}
          </p>
        </section>
      </div>
    </main>
  );
}
