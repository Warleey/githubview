// ============================================================
// Paleta oficial de cores de linguagens do GitHub (linguist)
// https://github.com/github-linguist/linguist
// ============================================================

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Less: '#1d365d',
  Python: '#3572a5',
  Java: '#b07219',
  Kotlin: '#a97bff',
  Go: '#00add8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  PHP: '#4f5d95',
  Ruby: '#701516',
  Swift: '#f05138',
  'Objective-C': '#438eff',
  Dart: '#00b4ab',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  'Jupyter Notebook': '#da5b0b',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Astro: '#ff5a03',
  Lua: '#000080',
  Elixir: '#6e4a7e',
  Erlang: '#b83998',
  Haskell: '#5e5086',
  Scala: '#c22d40',
  R: '#198ce7',
  MATLAB: '#e16737',
  Perl: '#0298c3',
  Groovy: '#4298b8',
  PowerShell: '#012456',
  Nix: '#7e7eff',
  Zig: '#ec915c',
  MDX: '#fcb32c',
  Makefile: '#427819',
  CMake: '#da3434',
  TeX: '#3d6117',
  Solidity: '#aa6746',
  Clojure: '#db5855',
  OCaml: '#ef7a08',
  'F#': '#b845fc',
  Assembly: '#6e4c13',
}

const FALLBACK_COLOR = '#8b949e'

/** Retorna a cor oficial da linguagem; cinza neutro como fallback */
export function getLanguageColor(language: string): string {
  return LANGUAGE_COLORS[language] ?? FALLBACK_COLOR
}
