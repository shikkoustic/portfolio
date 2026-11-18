export function ProjectGlyph({ id, className }: { id: string; className?: string }) {
  const common = {
    viewBox: "0 0 120 120",
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (id) {
    case "basecase":
      return (
        <svg {...common}>
          <rect x="18" y="14" width="84" height="92" rx="8" />
          <path d="M34 36h30M34 52h52M34 68h52M34 84h36" />
          <circle cx="90" cy="36" r="5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "resumeforge":
      return (
        <svg {...common}>
          <path d="M30 12h40l20 20v76a4 4 0 0 1-4 4H30a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4Z" />
          <path d="M70 12v20h20" />
          <path d="M38 58h44M38 72h44M38 86h28" />
          <path d="M88 92l6 6 12-14" />
        </svg>
      );
    case "criclens":
      return (
        <svg {...common}>
          <path d="M34 86 76 44" />
          <rect x="70" y="18" width="16" height="34" rx="7" transform="rotate(45 78 35)" />
          <circle cx="30" cy="90" r="10" />
          <path d="M22 98l-6 6" />
        </svg>
      );
    case "examen":
      return (
        <svg {...common}>
          <path d="M60 28c-10-8-24-10-36-6v62c12-4 26-2 36 6" />
          <path d="M60 28c10-8 24-10 36-6v62c-12-4-26-2-36 6" />
          <path d="M60 28v68" />
        </svg>
      );
    case "vayu":
      return (
        <svg {...common}>
          <path d="M16 46h58a14 14 0 1 0-12-21" />
          <path d="M16 66h74a14 14 0 1 1-12 21" />
          <path d="M16 86h46a10 10 0 1 1-8 16" />
        </svg>
      );
    default:
      return null;
  }
}
