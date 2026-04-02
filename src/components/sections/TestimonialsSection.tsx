import { Quote } from "lucide-react";
import { C } from "@/constants/theme";
import { FadeIn, Cd, EL, IL } from "@/components/common";

interface TestimonialsSectionProps {
  setPage: (page: string) => void;
}

export function TestimonialsSection({ setPage }: TestimonialsSectionProps) {
  const testimonials = [
    {
      id: "paul-soddo",
      quote: "Eric was not just a contributor but a driving force in realising our company's vision for AI and IoT. His unique ability to operate at the intersection of hardware and software was a particular strength. I recommend him without the slightest reservation for any advanced professional or technical opportunity.",
      name: "Paul Soddo",
      title: "Founder",
      org: "IntelliSys Uganda",
      link: "https://www.linkedin.com/in/soddo-paul/",
    },
    {
      id: "paul-kennedy",
      quote: "Eric served as a Zindi Community Ambassador before rising to become Uganda's Country Ambassador, a role that reflects the trust and impact he has built within the community. He has participated in over 80 competitions and has ranked among the top worldwide, holding first place on Uganda's leaderboard for three years. I confidently recommend Eric as a talented data scientist and community leader.",
      name: "Paul Kennedy",
      title: "Chief of Staff",
      org: "Zindi Africa",
      link: "https://zindi.africa",
    },
    {
      id: "peter-kakobya",
      quote: "Throughout our time together, I've often marveled at how Eric Jagwara adeptly balances the dynamic world of technology with the traditional realm of civil engineering. Eric's ability to integrate these two fields sets him apart and undoubtedly contributes to his success in both domains. He is indeed a valuable addition to any team.",
      name: "Peter Kakobya",
      title: "Civil/Structural Engineer & iOS Developer",
      org: "LinkedIn",
    },
    {
      id: "jonathan-kewaza",
      quote: "Throughout our professional and personal relationship, I've had the privilege of witnessing Eric's expertise in various technical domains. I've been particularly impressed by his proficiency not only in data analysis but also in robotics, IoTs, and web development. Eric's seamless navigation across these diverse areas highlights his versatility and mastery in the evolving tech landscape.",
      name: "Jonathan Kewaza",
      title: "Civil/Structural Engineer",
      org: "Hamit Structures Ltd",
      link: "https://www.linkedin.com/in/jonathan-kewaza/",
    },
    {
      id: "gora-watson",
      quote: "Eric has consistently demonstrated a high level of technical expertise, problem-solving abilities, and a commitment to excellence in repairs and maintenance while at Ndejje. His knowledge of tech repairs and maintenance is exceptional, and he has played a key role in the university. I highly recommend him for any related positions.",
      name: "Gora Watson Simon",
      title: "Project Engineer & National Technical Lead",
      org: "WASH | Infrastructure | GIS | DRR",
      link: "https://www.linkedin.com/in/gora-watson-simon/",
    },
  ];

  // Note: Google does not support review/aggregateRating on Person type
  // Testimonials display visually but structured data is omitted to avoid GSC errors

  return (
    <section className="py-16 px-6" style={{ background: `${C.card}80` }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-9">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "'Instrument Serif',serif", color: C.bright }}
          >
            What People Say
          </h2>
          <div className="w-12 h-0.5 mt-3.5 rounded-sm" style={{ background: C.accent, opacity: 0.6 }} />
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <FadeIn key={t.id} delay={i * 0.04}>
              <Cd className="h-full relative flex flex-col">
                <Quote
                  className="absolute top-4 left-4 w-10 h-10 opacity-15"
                  style={{ color: C.accent }}
                />
                <p
                  className="text-xs leading-relaxed mt-12 mb-auto italic"
                  style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}
                >
                  {t.quote}
                </p>
                <div className="border-t pt-3.5 mt-4" style={{ borderColor: C.border }}>
                  <div className="font-bold text-sm" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                    {t.link ? (
                      <a href={t.link} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: C.bright }}>
                        {t.name}
                      </a>
                    ) : (
                      t.name
                    )}
                  </div>
                  <div className="text-xs mt-1" style={{ color: C.accent, fontFamily: "'Inter',sans-serif" }}>
                    {t.title} · {t.org}
                  </div>
                </div>
              </Cd>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div className="mt-7 text-center">
            <p className="text-xs" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
              More on <EL href="https://linkedin.com/in/ericjagwara">LinkedIn</EL> · Explore my <IL page="Experience" setPage={setPage}>Experience</IL> · View my <IL page="Research" setPage={setPage}>Research</IL>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
