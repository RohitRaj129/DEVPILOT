"use client";

const LANGS: Record<string, { short: string; bg: string; fg: string }> = {
  JavaScript: { short: "JS", bg: "#facc15", fg: "#1a1a1a" },
  TypeScript: { short: "TS", bg: "#3178c6", fg: "#ffffff" },
  Python: { short: "Py", bg: "#3776ab", fg: "#ffe873" },
  Java: { short: "Jv", bg: "#e76f00", fg: "#ffffff" },
  HTML: { short: "H5", bg: "#e44d26", fg: "#ffffff" },
  CSS: { short: "C3", bg: "#2965f1", fg: "#ffffff" },
  "Jupyter Notebook": { short: "Jn", bg: "#f37726", fg: "#ffffff" },
  C: { short: "C", bg: "#555555", fg: "#ffffff" },
  "C++": { short: "C+", bg: "#00599c", fg: "#ffffff" },
  Go: { short: "Go", bg: "#00add8", fg: "#ffffff" },
  Rust: { short: "Rs", bg: "#b7410e", fg: "#ffffff" },
  Shell: { short: "Sh", bg: "#4eaa25", fg: "#ffffff" },
};

const FALLBACK = { short: "··", bg: "#3f3f46", fg: "#e4e4e7" };

export function LanguageIcon({
  language,
  className = "size-10 text-sm rounded-xl",
}: {
  language?: string | null;
  className?: string;
}) {
  const l = (language && LANGS[language]) || FALLBACK;
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center font-extrabold ${className}`}
      style={{ background: l.bg, color: l.fg }}
      aria-hidden
    >
      {l.short}
    </span>
  );
}

export function LanguageBadge({ language }: { language?: string | null }) {
  if (!language) return null;
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 py-1 pl-1 pr-3 text-xs font-semibold text-foreground">
      <LanguageIcon
        language={language}
        className="size-6 rounded-full text-[10px]"
      />
      {language}
    </span>
  );
}
