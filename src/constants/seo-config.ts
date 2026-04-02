// Page-specific SEO configurations
// Titles follow pattern: "Page Focus | Eric Jagwara" for brand consistency
// Descriptions are global-first, mentioning Uganda/Africa as origin, not limitation

const BASE_URL = "https://ericjagwara.online";

export const PAGE_SEO = {
  home: {
    title: undefined, // Uses default from index.html
    description: "Eric Jagwara — AI & Embedded Systems Engineer, Researcher, and Community Builder. Specializing in machine learning, IoT, cybersecurity, and responsible AI. Available for consulting, speaking, and collaboration worldwide.",
    path: "/",
    pageType: "ProfilePage" as const,
    breadcrumb: [
      { name: "Home", url: BASE_URL }
    ]
  },
  experience: {
    title: "Experience & Career | Eric Jagwara",
    description: "Professional experience in AI engineering, data science, cybersecurity consulting, and IoT development. 80+ ML competitions, international collaborations with Athari NYC, and enterprise solutions. Open to global opportunities.",
    path: "/experience",
    pageType: "AboutPage" as const,
    breadcrumb: [
      { name: "Home", url: BASE_URL },
      { name: "Experience", url: `${BASE_URL}/experience` }
    ]
  },
  research: {
    title: "Research & Publications | Eric Jagwara",
    description: "AI research in health informatics, computer vision, NLP, and geospatial machine learning. ORCID: 0009-0003-4935-3667. Peer reviewer for MICCAI and CHI. Collaborating with researchers worldwide on impactful AI applications.",
    path: "/research",
    pageType: "CollectionPage" as const,
    breadcrumb: [
      { name: "Home", url: BASE_URL },
      { name: "Research", url: `${BASE_URL}/research` }
    ]
  },
  community: {
    title: "Community & Leadership | Eric Jagwara",
    description: "Building global AI communities as Zindi Ambassador, Young AI Leaders Hub Leader, and Deep Learning Indaba Mentor. Passionate about mentorship, knowledge sharing, and connecting technologists across borders.",
    path: "/community",
    pageType: "AboutPage" as const,
    breadcrumb: [
      { name: "Home", url: BASE_URL },
      { name: "Community", url: `${BASE_URL}/community` }
    ]
  },
  openSource: {
    title: "Open Source & Projects | Eric Jagwara",
    description: "Open source contributions: ML solutions, cybersecurity tools, WordPress plugins, AIoT prototypes, and public datasets. GitHub: ericjagwara. Committed to accessible, responsible AI development.",
    path: "/open-source",
    pageType: "CollectionPage" as const,
    breadcrumb: [
      { name: "Home", url: BASE_URL },
      { name: "Open Source", url: `${BASE_URL}/open-source` }
    ]
  },
  blog: {
    title: "Blog & Articles | Eric Jagwara",
    description: "Technical writing on AI, machine learning, cybersecurity, embedded systems, and emerging technology. Insights from real-world projects and research. Published on Medium.",
    path: "/blog",
    pageType: "CollectionPage" as const,
    breadcrumb: [
      { name: "Home", url: BASE_URL },
      { name: "Blog", url: `${BASE_URL}/blog` }
    ]
  },
  events: {
    title: "Events & Speaking | Eric Jagwara",
    description: "Conference speaker and workshop facilitator on AI, cybersecurity, data science, and responsible AI. Available for keynotes, panels, and technical training globally. Book Eric for your next event.",
    path: "/events",
    pageType: "CollectionPage" as const,
    breadcrumb: [
      { name: "Home", url: BASE_URL },
      { name: "Events", url: `${BASE_URL}/events` }
    ]
  },
};
