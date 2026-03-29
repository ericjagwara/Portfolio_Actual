import { C } from "@/constants/theme";
import { Tag } from "@/components/common";

interface FooterProps {
  setPage: (page: string) => void;
}

export function Footer({ setPage }: FooterProps) {
  const contacts = [
    { id: "email", icon: "✉", label: "ericjagwara@gmail.com", href: "mailto:ericjagwara@gmail.com" },
  ];

  const profiles = [
    { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/ericjagwara" },
    { id: "github", label: "GitHub", href: "https://github.com/ericjagwara" },
    { id: "twitter", label: "X (Twitter)", href: "https://x.com/ericjagwara" },
    { id: "zindi", label: "Zindi", href: "https://zindi.africa/users/Jagwara" },
    { id: "orcid", label: "ORCID", href: "https://orcid.org/0009-0003-4935-3667" },
    { id: "medium", label: "Medium", href: "https://medium.com/@ericjagwara_65224" },
    { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@ericjagwara" },
    { id: "facebook", label: "Facebook", href: "https://www.facebook.com/eric.jagwara/" },
    { id: "credly", label: "Credly", href: "https://www.credly.com/users/eric-jagwara" },
    { id: "aiforgood", label: "AI for Good", href: "https://aiforgood.itu.int/speaker/eric-ofuono-jagwara/" },
  ];

  const openTo = [
    { id: "research", label: "Research Collaborations" },
    { id: "speaking", label: "Speaking Engagements" },
    { id: "ai-consulting", label: "AI Consulting" },
    { id: "webdev", label: "Web Development" },
    { id: "uiux", label: "UI/UX Design" },
    { id: "cybersec", label: "Cybersecurity Audits" },
    { id: "mentorship", label: "Mentorship" },
    { id: "workshops", label: "Workshop Facilitation" },
  ];

  const quickLinks = [
    { id: "experience", label: "Experience", page: "Experience" },
    { id: "research", label: "Research", page: "Research" },
    { id: "community", label: "Community", page: "Community" },
    { id: "opensource", label: "Open Source", page: "Open Source" },
    { id: "blog", label: "Blog", page: "Blog" },
    { id: "events", label: "Events", page: "Events" },
  ];

  return (
    <footer className="py-14 px-6" style={{ borderTop: `1px solid ${C.border}`, background: C.card }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-9 mb-9">
          {/* Column 1: Name & contact */}
          <div>
            <div className="text-xl mb-3" style={{ fontFamily: "'Instrument Serif',serif", color: C.accent }}>
              Jagwara Eric Ofuono
            </div>
            <div className="text-sm mb-4" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
              Kampala, Uganda
            </div>
            {contacts.map((c) => (
              <a
                key={c.id}
                href={c.href}
                className="flex items-center gap-2 text-xs mb-2 hover:opacity-80 transition-opacity"
                style={{ color: C.text, fontFamily: "'Inter',sans-serif", textDecoration: "none" }}
              >
                <span>{c.icon}</span>
                <span>{c.label}</span>
              </a>
            ))}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <div
              className="text-xs uppercase tracking-wider mb-3"
              style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
            >
              Quick Links
            </div>
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((q) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setPage(q.page);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-xs px-3 py-1 rounded-full hover:opacity-80 transition-opacity text-left"
                  style={{ color: C.text, border: `1px solid ${C.border}`, fontFamily: "'Inter',sans-serif" }}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Profiles */}
          <div>
            <div
              className="text-xs uppercase tracking-wider mb-3"
              style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
            >
              Profiles
            </div>
            <div className="flex flex-wrap gap-2">
              {profiles.map((p) => (
                <a
                  key={p.id}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs px-3 py-1 rounded-full hover:opacity-80 transition-opacity"
                  style={{ color: C.text, border: `1px solid ${C.border}`, fontFamily: "'Inter',sans-serif", textDecoration: "none" }}
                >
                  {p.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Open to */}
          <div>
            <div
              className="text-xs uppercase tracking-wider mb-3"
              style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
            >
              Open To
            </div>
            <div className="flex flex-wrap gap-1.5">
              {openTo.map((s) => (
                <Tag key={s.id} color={C.teal}>
                  {s.label}
                </Tag>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-5 text-center" style={{ borderColor: C.border }}>
          <span className="text-xs" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
            © {new Date().getFullYear()} Jagwara Eric Ofuono · Kampala, Uganda
          </span>
        </div>
      </div>
    </footer>
  );
}
