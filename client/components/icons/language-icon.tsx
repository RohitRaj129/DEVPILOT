import type { IconType } from "react-icons";
import {
  SiC,
  SiCplusplus,
  SiClojure,
  SiSharp,
  SiDart,
  SiElixir,
  SiErlang,
  SiFsharp,
  SiGo,
  SiGnubash,
  SiHaskell,
  SiHtml5,
  SiJavascript,
  SiJulia,
  SiKotlin,
  SiLua,
  SiMysql,
  SiOcaml,
  SiPerl,
  SiPhp,
  SiPowers,
  SiPostgresql,
  SiPython,
  SiR,
  SiRuby,
  SiRust,
  SiScala,
  SiSolidity,
  SiSwift,
  SiTypescript,
} from "react-icons/si";
import { FaCode, FaJava } from "react-icons/fa6";

/**
 * Icons for common programming languages and query/shell languages.
 * Keys are normalized to lowercase; aliases are included for common file names
 * and language identifiers returned by code-hosting APIs.
 */
export const languageIcons: Record<string, IconType> = {
  // Programming languages
  c: SiC,
  "c++": SiCplusplus,
  cpp: SiCplusplus,
  "c plus plus": SiCplusplus,
  "c#": SiSharp,
  csharp: SiSharp,
  "c-sharp": SiSharp,
  java: FaJava,
  javascript: SiJavascript,
  js: SiJavascript,
  jsx: SiJavascript,
  typescript: SiTypescript,
  ts: SiTypescript,
  tsx: SiTypescript,
  python: SiPython,
  py: SiPython,
  go: SiGo,
  golang: SiGo,
  rust: SiRust,
  rs: SiRust,
  ruby: SiRuby,
  rb: SiRuby,
  php: SiPhp,
  swift: SiSwift,
  kotlin: SiKotlin,
  kt: SiKotlin,
  dart: SiDart,
  r: SiR,
  scala: SiScala,
  perl: SiPerl,
  pl: SiPerl,
  lua: SiLua,
  haskell: SiHaskell,
  hs: SiHaskell,
  elixir: SiElixir,
  ex: SiElixir,
  erlang: SiErlang,
  erl: SiErlang,
  clojure: SiClojure,
  clj: SiClojure,
  fsharp: SiFsharp,
  "f#": SiFsharp,
  ocaml: SiOcaml,
  julia: SiJulia,
  jl: SiJulia,
  solidity: SiSolidity,
  sol: SiSolidity,

  // Markup, styles, databases and shells often reported as repository languages
  html: SiHtml5,
  css: FaCode,
  sql: SiMysql,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  bash: SiGnubash,
  sh: SiGnubash,
  shell: SiGnubash,
  zsh: SiGnubash,
  powershell: SiPowers,
  ps1: SiPowers,
};

export interface LanguageIconProps {
  /** Language name, extension, or common language identifier. */
  language: string;
  /** Icon size in pixels or any valid React CSS size. */
  size?: number | string;
  /** Icon color. Defaults to the icon library's current text color. */
  color?: string;
  /** Additional CSS class names. */
  className?: string;
  /** Accessible label override. Set to null to mark the icon decorative. */
  ariaLabel?: string | null;
}

/** Renders the matching Simple Icons logo, or a generic code icon as fallback. */
export function LanguageIcon({
  language,
  size = 20,
  color = "currentColor",
  className,
  ariaLabel,
}: LanguageIconProps) {
  const key = language.trim().toLowerCase();
  const Icon = languageIcons[key] ?? FaCode;

  return (
    <Icon
      size={size}
      color={color}
      className={className}
      aria-label={
        ariaLabel === null ? undefined : (ariaLabel ?? `${language} icon`)
      }
      aria-hidden={ariaLabel === null ? true : undefined}
      role={ariaLabel === null ? undefined : "img"}
    />
  );
}

export default LanguageIcon;
