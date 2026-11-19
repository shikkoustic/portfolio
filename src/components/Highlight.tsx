export function Highlight({
  children,
  color = "#2A4FD6",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span
      className="rounded-md px-1.5 py-0.5 font-semibold text-ink"
      style={{ background: `${color}33` }}
    >
      {children}
    </span>
  );
}
