import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { C } from "@/constants/theme";
import { BackgroundPattern } from "@/components/common/BackgroundPattern";
import { Nav } from "@/components/common/Nav";
import { Footer } from "@/components/common/Footer";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import {
  HomePage,
  ExperiencePage,
  ResearchPage,
  CommunityPage,
  OpenSourcePage,
  BlogPage,
  EventsPage,
} from "@/components/pages";
import { BlogPostPage } from "@/components/pages/BlogPostPage";

// Route configuration
const ROUTE_MAP: Record<string, string> = {
  Home: "/",
  Experience: "/experience",
  Research: "/research",
  Community: "/community",
  "Open Source": "/open-source",
  Blog: "/blog",
  Events: "/events",
};

const PATH_TO_PAGE: Record<string, string> = {
  "/": "Home",
  "/experience": "Experience",
  "/research": "Research",
  "/community": "Community",
  "/open-source": "Open Source",
  "/blog": "Blog",
  "/events": "Events",
};

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Inner app component that uses router hooks
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle blog post pages
  const currentPage = location.pathname.startsWith("/blog/") 
    ? "Blog" 
    : (PATH_TO_PAGE[location.pathname] || "Home");

  const setPage = (page: string) => {
    const path = ROUTE_MAP[page] || "/";
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Add floating animation keyframes
    const style = document.createElement("style");
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(-10px) translateX(-10px); }
        75% { transform: translateY(-30px) translateX(5px); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: C.bg, color: C.text }}>
      <BackgroundPattern />
      <Nav page={currentPage} setPage={setPage} />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage setPage={setPage} />} />
          <Route path="/experience" element={<ExperiencePage setPage={setPage} />} />
          <Route path="/research" element={<ResearchPage setPage={setPage} />} />
          <Route path="/community" element={<CommunityPage setPage={setPage} />} />
          <Route path="/open-source" element={<OpenSourcePage setPage={setPage} />} />
          <Route path="/blog" element={<BlogPage setPage={setPage} />} />
          <Route path="/blog/:slug" element={<BlogPostPage setPage={setPage} />} />
          <Route path="/events" element={<EventsPage setPage={setPage} />} />
          {/* Fallback to Home for unknown routes */}
          <Route path="*" element={<HomePage setPage={setPage} />} />
        </Routes>
      </ErrorBoundary>
      <div className="relative z-10">
        <Footer setPage={setPage} />
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppContent />
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
