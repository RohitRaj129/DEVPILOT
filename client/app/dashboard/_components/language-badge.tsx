"use client";

import type { IconType } from "react-icons";
import {
  SiApachegroovy,
  SiApple,
  SiAstro,
  SiC,
  SiClojure,
  SiCmake,
  SiCoffeescript,
  SiCplusplus,
  SiCrystal,
  SiDart,
  SiDocker,
  SiDotnet,
  SiElixir,
  SiElm,
  SiErlang,
  SiFortran,
  SiFsharp,
  SiGnu,
  SiGnubash,
  SiGo,
  SiHandlebarsdotjs,
  SiHaskell,
  SiHtml5,
  SiJavascript,
  SiJson,
  SiJulia,
  SiJupyter,
  SiKotlin,
  SiLatex,
  SiLess,
  SiLua,
  SiMarkdown,
  SiMdx,
  SiNim,
  SiOcaml,
  SiOpenjdk,
  SiPerl,
  SiPhp,
  SiPostgresql,
  SiPug,
  SiPython,
  SiR,
  SiRuby,
  SiRust,
  SiSass,
  SiScala,
  SiSolidity,
  SiStylus,
  SiSvelte,
  SiSwift,
  SiTypescript,
  SiVim,
  SiVuedotjs,
  SiWebassembly,
  SiYaml,
  SiZig,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";
import { Code2 } from "lucide-react";

type Lang = { Icon: IconType; color: string };

// Key = GitHub's exact language name (case-sensitive).
// "currentColor" follows the theme (for black/white brand logos).
const LANGS: Record<string, Lang> = {
  // Web
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  HTML: { Icon: SiHtml5, color: "#E34F26" },
  CSS: { Icon: FaCss3Alt, color: "#1572B6" },
  SCSS: { Icon: SiSass, color: "#CC6699" },
  Sass: { Icon: SiSass, color: "#CC6699" },
  Less: { Icon: SiLess, color: "#2B5EA8" },
  Stylus: { Icon: SiStylus, color: "#FF6347" },
  Vue: { Icon: SiVuedotjs, color: "#4FC08D" },
  Svelte: { Icon: SiSvelte, color: "#FF3E00" },
  Astro: { Icon: SiAstro, color: "#BC52EE" },
  MDX: { Icon: SiMdx, color: "#FCB32C" },
  Handlebars: { Icon: SiHandlebarsdotjs, color: "#F0772B" },
  Pug: { Icon: SiPug, color: "#A86454" },
  CoffeeScript: { Icon: SiCoffeescript, color: "#A67C52" },
  WebAssembly: { Icon: SiWebassembly, color: "#654FF0" },
  // General purpose
  Python: { Icon: SiPython, color: "#3776AB" },
  "Jupyter Notebook": { Icon: SiJupyter, color: "#F37626" },
  Java: { Icon: SiOpenjdk, color: "#ED8B00" },
  Kotlin: { Icon: SiKotlin, color: "#7F52FF" },
  Groovy: { Icon: SiApachegroovy, color: "#4298B8" },
  Scala: { Icon: SiScala, color: "#DC322F" },
  "C#": { Icon: SiDotnet, color: "#6F4FD8" },
  "F#": { Icon: SiFsharp, color: "#378BBA" },
  C: { Icon: SiC, color: "#A8B9CC" },
  "C++": { Icon: SiCplusplus, color: "#00599C" },
  "Objective-C": { Icon: SiApple, color: "#A2AAAD" },
  Swift: { Icon: SiSwift, color: "#F05138" },
  Dart: { Icon: SiDart, color: "#0175C2" },
  Go: { Icon: SiGo, color: "#00ADD8" },
  Rust: { Icon: SiRust, color: "#CE422B" },
  Zig: { Icon: SiZig, color: "#F7A41D" },
  Nim: { Icon: SiNim, color: "#FFE953" },
  Crystal: { Icon: SiCrystal, color: "currentColor" },
  Ruby: { Icon: SiRuby, color: "#CC342D" },
  PHP: { Icon: SiPhp, color: "#777BB4" },
  Perl: { Icon: SiPerl, color: "#5A6BD0" },
  Lua: { Icon: SiLua, color: "#4B5FD1" },
  R: { Icon: SiR, color: "#276DC3" },
  Julia: { Icon: SiJulia, color: "#9558B2" },
  Fortran: { Icon: SiFortran, color: "#734F96" },
  // Functional
  Haskell: { Icon: SiHaskell, color: "#8F7BC7" },
  Elixir: { Icon: SiElixir, color: "#9B6FB0" },
  Erlang: { Icon: SiErlang, color: "#CB0F3E" },
  Clojure: { Icon: SiClojure, color: "#5881D8" },
  OCaml: { Icon: SiOcaml, color: "#EC6813" },
  Elm: { Icon: SiElm, color: "#1293D8" },
  // Other
  Solidity: { Icon: SiSolidity, color: "#8C8C8C" },
  Shell: { Icon: SiGnubash, color: "#4EAA25" },
  Dockerfile: { Icon: SiDocker, color: "#2496ED" },
  Makefile: { Icon: SiGnu, color: "#A42E2B" },
  CMake: { Icon: SiCmake, color: "#3B8FD6" },
  PLpgSQL: { Icon: SiPostgresql, color: "#4169E1" },
  TeX: { Icon: SiLatex, color: "#008080" },
  "Vim Script": { Icon: SiVim, color: "#019733" },
  Markdown: { Icon: SiMarkdown, color: "currentColor" },
  JSON: { Icon: SiJson, color: "currentColor" },
  YAML: { Icon: SiYaml, color: "#CB171E" },
};

export function LanguageIcon({
  language,
  className = "size-10 rounded-xl",
}: {
  language?: string | null;
  className?: string;
}) {
  const match = language ? LANGS[language] : undefined;

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center border border-border bg-muted ${className}`}
      aria-hidden
    >
      {match ? (
        <match.Icon className="size-1/2" style={{ color: match.color }} />
      ) : (
        <Code2 className="size-1/2 text-muted-foreground" />
      )}
    </span>
  );
}

export function LanguageBadge({ language }: { language?: string | null }) {
  if (!language) return null;
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 py-1 pl-1 pr-3 text-xs font-semibold text-foreground">
      <LanguageIcon language={language} className="size-6 rounded-full" />
      {language}
    </span>
  );
}
