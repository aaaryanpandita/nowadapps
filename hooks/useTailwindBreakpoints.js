// useTailwindBreakpoints.js
import { useEffect, useState } from "react";

const DEFAULT_BP = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function useTailwindBreakpoints(customBreakpoints = {}) {
  const bp = { ...DEFAULT_BP, ...customBreakpoints };

  const queries = {
    sm: `(min-width: ${bp.sm}px)`,
    md: `(min-width: ${bp.md}px)`,
    lg: `(min-width: ${bp.lg}px)`,
    xl: `(min-width: ${bp.xl}px)`,
    "2xl": `(min-width: ${bp["2xl"]}px)`,
  };

  const getMatches = () => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return { sm: false, md: false, lg: false, xl: false, "2xl": false };
    }
    return {
      sm: window.matchMedia(queries.sm).matches,
      md: window.matchMedia(queries.md).matches,
      lg: window.matchMedia(queries.lg).matches,
      xl: window.matchMedia(queries.xl).matches,
      "2xl": window.matchMedia(queries["2xl"]).matches,
    };
  };

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    const mediaQueryLists = Object.values(queries).map((q) =>
      window.matchMedia(q)
    );

    const handler = () => setMatches(getMatches());

    mediaQueryLists.forEach((mql) => mql.addEventListener("change", handler));
    return () => {
      mediaQueryLists.forEach((mql) =>
        mql.removeEventListener("change", handler)
      );
    };
  }, []);

  return matches;
}
