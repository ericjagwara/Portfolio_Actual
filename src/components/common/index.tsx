import { useState, ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { C } from "@/constants/theme";
import { useInView } from "@/hooks/useInView";

// FadeIn animation component
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.6s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Tag component
interface TagProps {
  children: ReactNode;
  color?: string;
}

export function Tag({ children, color = C.accent }: TagProps) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
      style={{
        background: `${color}18`,
        color,
        border: `1px solid ${color}30`,
      }}
    >
      {children}
    </span>
  );
}

// External Link component
interface ELProps {
  href: string;
  children: ReactNode;
}

export function EL({ href, children }: ELProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 font-semibold text-sm border-b transition-colors hover:opacity-80"
      style={{ color: C.accent, borderColor: `${C.accent}35` }}
    >
      {children} <ExternalLink className="w-3 h-3" />
    </a>
  );
}

// Internal Link component for cross-page navigation
interface ILProps {
  page: string;
  setPage: (page: string) => void;
  children: ReactNode;
}

export function IL({ page, setPage, children }: ILProps) {
  return (
    <button
      onClick={() => {
        setPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="inline-flex items-center gap-1 font-semibold text-sm border-b transition-colors hover:opacity-80"
      style={{ color: C.accent, borderColor: `${C.accent}35` }}
    >
      {children}
    </button>
  );
}

// Card component with hover effect
interface CdProps {
  children: ReactNode;
  className?: string;
}

export function Cd({ children, className = "" }: CdProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`rounded-xl p-6 transition-all duration-200 ${className}`}
      style={{
        background: isHovered ? C.cardHover : C.card,
        border: `1px solid ${isHovered ? C.borderLight : C.border}`,
      }}
    >
      {children}
    </div>
  );
}

// Section Header component
interface SHProps {
  title: string;
  sub?: string;
}

export function SH({ title, sub }: SHProps) {
  return (
    <FadeIn className="mb-11">
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-normal"
        style={{ fontFamily: "'Instrument Serif',serif", color: C.bright, lineHeight: 1.15 }}
      >
        {title}
      </h2>
      {sub && (
        <p className="text-sm mt-2.5 max-w-xl" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
          {sub}
        </p>
      )}
      <div className="w-12 h-0.5 mt-4 rounded-sm" style={{ background: C.accent, opacity: 0.6 }} />
    </FadeIn>
  );
}
