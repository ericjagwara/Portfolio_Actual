import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SEO, PAGE_SEO } from "@/components/common/SEO";

interface HomePageProps {
  setPage: (page: string) => void;
}

export function HomePage({ setPage }: HomePageProps) {
  return (
    <div className="relative z-10">
      <SEO {...PAGE_SEO.home} />
      <HeroSection />
      <AboutSection />
      <TestimonialsSection setPage={setPage} />
    </div>
  );
}
