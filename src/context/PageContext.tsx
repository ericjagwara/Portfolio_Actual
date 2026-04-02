import { createContext, useContext, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

interface PageContextType {
  currentPage: string;
  setPage: (page: string) => void;
  navigateTo: (page: string) => void;
}

const PageContext = createContext<PageContextType | null>(null);

export function PageProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = PATH_TO_PAGE[location.pathname] || "Home";

  const setPage = (page: string) => {
    const path = ROUTE_MAP[page] || "/";
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Alias for clarity
  const navigateTo = setPage;

  return (
    <PageContext.Provider value={{ currentPage, setPage, navigateTo }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePageNavigation() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageNavigation must be used within a PageProvider");
  }
  return context;
}

// Export route maps for use elsewhere
export { ROUTE_MAP, PATH_TO_PAGE };
