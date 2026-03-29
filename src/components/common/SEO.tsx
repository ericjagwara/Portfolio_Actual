import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
  pageType?: "WebPage" | "AboutPage" | "CollectionPage" | "ContactPage" | "ProfilePage";
  breadcrumb?: { name: string; url: string }[];
}

const BASE_URL = "https://ericjagwara.github.io";
const DEFAULT_TITLE = "Eric Jagwara: AI & Embedded Systems Engineer | Researcher | Community Builder";
const DEFAULT_DESCRIPTION = "AI & Embedded Systems Engineer, Researcher, and Community Builder. Specializing in machine learning, IoT, cybersecurity, and responsible AI. Available for consulting, speaking, and collaboration worldwide.";

export function SEO({ 
  title, 
  description, 
  path = "", 
  type = "website",
  pageType = "WebPage",
  breadcrumb
}: SEOProps) {
  const fullTitle = title ? `${title} | Eric Jagwara` : DEFAULT_TITLE;
  const fullDescription = description || DEFAULT_DESCRIPTION;
  const url = `${BASE_URL}${path}`;

  // Generate WebPage schema for each page
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": pageType,
    "@id": `${url}#webpage`,
    "url": url,
    "name": fullTitle,
    "description": fullDescription,
    "isPartOf": { "@id": "https://ericjagwara.github.io/#website" },
    "about": { "@id": "https://ericjagwara.github.io/#person" },
    "inLanguage": "en"
  };

  // Generate BreadcrumbList schema if breadcrumb provided
  const breadcrumbSchema = breadcrumb ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph - Dynamic */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter - Dynamic */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />

      {/* Per-page WebPage Schema */}
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>

      {/* Per-page Breadcrumb Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
}

// Re-export PAGE_SEO from centralized config
export { PAGE_SEO } from "@/constants/seo-config";
