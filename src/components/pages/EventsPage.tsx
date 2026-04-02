import { C } from "@/constants/theme";
import { FadeIn, SH, EL, IL } from "@/components/common";
import { SEO, PAGE_SEO } from "@/components/common/SEO";

interface EventsPageProps {
  setPage: (page: string) => void;
}

export function EventsPage({ setPage }: EventsPageProps) {
  return (
    <section className="min-h-screen py-24 px-6">
      <SEO {...PAGE_SEO.events} />
      <div className="max-w-6xl mx-auto">
        <SH title="Events" sub="Upcoming and past events — talks, workshops, and community gatherings" />
        <FadeIn>
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: `1px solid ${C.border}`, background: "#fff" }}
          >
            <iframe
              src="https://lu.ma/embed/calendar/cal-TIYVNRzD7u9v1ta/events?lt=light"
              width="100%"
              height="650"
              style={{ border: "none", display: "block", background: "#fff" }}
              allowFullScreen
              aria-hidden={false}
              tabIndex={0}
              allow="payment"
            />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-6 text-center">
            <p className="text-xs" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
              Powered by <EL href="https://lu.ma">Luma</EL> · <EL href="https://lu.ma/cal-TIYVNRzD7u9v1ta">View full calendar</EL>
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
              Read my <IL page="Blog" setPage={setPage}>Blog</IL> · View my <IL page="Research" setPage={setPage}>Research</IL>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
