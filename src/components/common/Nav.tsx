import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { C, PAGES } from "@/constants/theme";

interface NavProps {
  page: string;
  setPage: (page: string) => void;
}

export function Nav({ page, setPage }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled ? "rgba(7,9,14,0.94)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: isScrolled ? `1px solid ${C.border}` : "none",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
        <div
          onClick={() => {
            setPage("Home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="cursor-pointer flex items-baseline gap-2 flex-shrink-0"
        >
          <span className="text-2xl font-bold" style={{ fontFamily: "'Instrument Serif',serif", color: C.accent }}>
            EJ
          </span>
          <span className="text-xs tracking-widest font-medium" style={{ color: C.bright, opacity: 0.75, fontFamily: "'Space Mono',monospace" }}>
            JAGWARA
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-1 items-center">
          {PAGES.map((p) => (
            <button
              key={p}
              onClick={() => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-200"
              style={{
                background: "transparent",
                border: "1px solid transparent",
                borderBottom: page === p ? `1px solid ${C.accent}` : "1px solid transparent",
                color: page === p ? C.accent : C.muted,
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ color: C.muted }}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden px-4 pb-4"
          style={{ background: isScrolled ? "rgba(7,9,14,0.94)" : "rgba(7,9,14,0.98)" }}
        >
          <div className="flex flex-col gap-1">
            {PAGES.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setPage(p);
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-4 py-3 rounded-md text-sm font-medium text-left transition-all duration-200"
                style={{
                  background: "transparent",
                  border: "1px solid transparent",
                  borderBottom: page === p ? `1px solid ${C.accent}` : "1px solid transparent",
                  color: page === p ? C.accent : C.muted,
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
