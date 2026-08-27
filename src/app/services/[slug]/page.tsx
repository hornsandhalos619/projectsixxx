import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLayout } from "@/components/services/ServiceLayout";
import { PricingTable } from "@/components/services/PricingTable";
import { CaseStudyCard } from "@/components/services/CaseStudyCard";
import { TestimonialCarousel } from "@/components/services/TestimonialCarousel";
import { CalendlyEmbed } from "@/components/services/CalendlyEmbed";
import { LeadMagnetForm } from "@/components/services/LeadMagnetForm";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { FAQAccordion } from "@/components/services/FAQAccordion";
import { cn } from "@/lib/utils";
import { getAllServices, getService, getCaseStudiesForService, getFAQsForService, generateStaticParams } from "@/lib/content";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  
  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.title,
    description: service.valueProp,
    openGraph: {
      title: service.title,
      description: service.valueProp,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.valueProp,
    },
  };
}

export { generateStaticParams };

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  
  if (!service) {
    notFound();
  }

  // Get related case studies
  const caseStudies = getCaseStudiesForService(slug);
  const faqs = getFAQsForService(slug);
  const testimonials = caseStudies.map(cs => cs.testimonial);

  // Build structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.valueProp,
    provider: {
      "@type": "Organization",
      name: "Projectsixxx",
      url: "https://projectsixxx.com",
    },
    serviceType: service.category,
    areaServed: "Worldwide",
    offers: service.tierPricing.map((tier: any) => ({
      "@type": "Offer",
      name: tier.name,
      description: tier.description,
      price: tier.price,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: tier.price,
        priceCurrency: "USD",
        billingDuration: tier.interval === "monthly" ? "P1M" : 
                         tier.interval === "hourly" ? "PT1H" :
                         tier.interval === "daily" ? "P1D" :
                         tier.interval === "weekly" ? "P1W" : "P1Y",
      },
      availability: "https://schema.org/InStock",
    })),
    hasFAQ: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq: any) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  };

  return (
    <ServiceLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center px-4 md:px-8">
          <div className="absolute inset-0 bg-gradient-to-b from-void-950 via-void-900 to-void-800" />
          <div className="absolute inset-0 texture-cracked-obsidian" aria-hidden="true" />
          <div className="absolute inset-0 texture-gold-leaf opacity-50" aria-hidden="true" />
          
          <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
            <span className="inline-block btn-ritual px-6 py-2 text-step--1 mb-8 animate-in">
              {service.category.toUpperCase()}
            </span>
            <h1 className="font-display text-step-5 md:text-step-6 lg:text-step-7 mb-6 animate-in animate-in-delay-1 text-text-primary">
              {service.title}
            </h1>
            <p className="font-display-alt text-step-2 md:text-step-3 text-accent-primary mb-8 animate-in animate-in-delay-2">
              {service.tagline}
            </p>
            <p className="body-ritual text-step-1 md:text-step-2 text-text-secondary max-w-3xl mx-auto mb-10 animate-in animate-in-delay-3">
              {service.valueProp}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in animate-in-delay-4">
              <CalendlyEmbed 
                url={service.calendlyUrl} 
                serviceName={service.title}
                prefill={{ 
                  service: service.title,
                  source: "service-page"
                }}
              />
              <a 
                href={`/services/grimoire/${service.slug}`}
                className="btn-ritual-secondary inline-flex items-center gap-2"
              >
                <span>Claim the Grimoire</span>
              </a>
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ProcessTimeline />
          </div>
        </section>

        {/* Case Studies / Proof */}
        {caseStudies.length > 0 && (
          <section className="py-20 md:py-32 px-4 md:px-8 bg-void-800/50 border-y border-border-subtle">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="heading-ritual text-step-4 md:text-step-5 mb-4">Sworn Oaths</h2>
                <p className="body-ritual text-step-1 text-text-secondary max-w-2xl mx-auto">
                  Those who have walked the path before you. Their words, sealed in blood.
                </p>
              </div>

              {/* Testimonial Carousel */}
              {testimonials.length > 0 && (
                <div className="mb-16 max-w-4xl mx-auto">
                  <TestimonialCarousel testimonials={testimonials} />
                </div>
              )}

              {/* Case Study Cards */}
              <div className="space-y-8">
                {caseStudies.map((cs: any) => (
                  <CaseStudyCard
                    key={cs.slug}
                    title={cs.title}
                    client={cs.client}
                    industry={cs.industry}
                    challenge={cs.challenge}
                    solution={cs.solution}
                    results={cs.results}
                    metrics={cs.metrics}
                    testimonial={cs.testimonial}
                    featured={cs.featured}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Pricing */}
        <section className="py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="heading-ritual text-step-4 md:text-step-5 mb-4">The Tithe</h2>
              <p className="body-ritual text-step-1 text-text-secondary max-w-2xl mx-auto">
                Three tiers. Transparent scope. No hidden rituals. Choose your covenant.
              </p>
            </div>

            <PricingTable 
              tiers={service.tierPricing}
              onCtaClick={(tier: any) => {
                if (tier.price === 0 && tier.interval === "custom") {
                  window.open(service.calendlyUrl, "_blank");
                }
              }}
            />
          </div>
        </section>

        {/* Lead Magnet */}
        <section className="py-20 md:py-32 px-4 md:px-8 bg-void-800/50 border-y border-border-subtle">
          <div className="max-w-3xl mx-auto">
            <LeadMagnetForm
              serviceSlug={service.slug}
              serviceName={service.title}
              grimoireTitle={service.leadMagnet.title}
              grimoireDescription={service.leadMagnet.description}
              pdfUrl={service.leadMagnet.pdfUrl}
            />
          </div>
        </section>

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="py-20 md:py-32 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              <FAQAccordion 
                items={faqs.map((f: any) => ({
                  question: f.question,
                  answer: f.answer,
                  confession: f.confession,
                }))}
                title="Confessions"
              />
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-void-900 to-void-950 border-t border-border-subtle">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-ritual text-step-4 md:text-step-5 mb-6">
              Ready to Begin the Ritual?
            </h2>
            <p className="body-ritual text-step-1 text-text-secondary mb-8">
              The first step is a conversation. No pressure. No pitch. Just clarity 
              on whether we're the right coven for your quest.
            </p>
            <CalendlyEmbed 
              url={service.calendlyUrl} 
              serviceName={service.title}
              prefill={{ 
                service: service.title,
                source: "service-page-cta"
              }}
            />
          </div>
        </section>
      </main>
    </ServiceLayout>
  );
}