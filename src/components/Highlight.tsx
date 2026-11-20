export function Highlight({
  children,
  color = "#3659E3",
  dark = false,
}: {
  children: React.ReactNode;
  color?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={`rounded-md px-1.5 py-0.5 font-semibold ${dark ? "text-cream" : "text-ink"}`}
      style={{ background: dark ? `${color}55` : `${color}33` }}
    >
      {children}
    </span>
  );
}
