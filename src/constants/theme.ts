// Color constants - centralized theme
export const C = {
  bg: "#07090e",
  card: "#12151e",
  cardHover: "#181c28",
  accent: "#c8973e",
  accentDim: "#a67c2e",
  teal: "#5a9e94",
  blue: "#5b82b5",
  purple: "#8a7cb8",
  text: "#c8ccd4",
  muted: "#6e7585",
  bright: "#eaedf2",
  border: "#1e222e",
  borderLight: "#2a2f3d",
};

export const PAGES = ["Home", "Experience", "Research", "Community", "Open Source", "Blog", "Events"] as const;

export type PageName = typeof PAGES[number];
