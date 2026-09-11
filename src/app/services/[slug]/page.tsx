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
import { getService, getCaseStudiesForService, getFAQsForService, generateStaticParams } from "@/lib/content";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.valueProp,
    openGraph: { title: service.title, description: service.valueProp, type: "website" },
  };
}

export { generateStaticParams };

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const caseStudies = getCaseStudiesForService(slug);
  const faqs = getFAQsForService(slug);
  const testimonials = caseStudies.map((cs: { testimonial: unknown }) => cs.testimonial);

  return (
    <ServiceLayout>
      <main className="min-h-screen">
        <section className="relative min-h-[70vh] flex items-center justify-center px-4 md:px-8">
          <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
            <span className="inline-block px-6 py-2 text-step--1 mb-8">{String(service.category).toUpperCase()}</span>
            <h1 className="font-display text-step-5 md:text-step-6 mb-6 text-text-primary">{service.title}</h1>
            <p className="font-display-alt text-step-2 text-accent-primary mb-8">{service.tagline}</p>
            <p className="body-ritual text-step-1 text-text-secondary max-w-3xl mx-auto mb-10">{service.valueProp}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CalendlyEmbed url={service.calendlyUrl} serviceName={service.title} prefill={{ service: service.title, source: "service-page" }} />
              <a href={`/services/grimoire/${service.slug}`} className="btn-ritual-secondary inline-flex items-center gap-2">Claim the Grimoire</a>
            </div>
          </div>
        </section>
        <section className="py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-7xl mx-auto"><ProcessTimeline /></div>
        </section>
        {caseStudies.length > 0 ? (
          <section className="py-20 md:py-32 px-4 md:px-8 bg-void-800/50 border-y border-border-subtle">
            <div className="max-w-7xl mx-auto">
              {testimonials.length > 0 ? (
                <div className="mb-16 max-w-4xl mx-auto">
                  <TestimonialCarousel testimonials={testimonials as never} />
                </div>
              ) : null}
              <div className="space-y-8">
                {caseStudies.map((cs: Record<string, never>) => (
                  <CaseStudyCard key={cs.slug} {...cs} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
        <section className="py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <PricingTable tiers={service.tierPricing} />
          </div>
        </section>
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
        {faqs.length > 0 ? (
          <section className="py-20 md:py-32 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              <FAQAccordion items={faqs.map((f: { question: string; answer: string; confession?: string }) => ({ question: f.question, answer: f.answer, confession: f.confession }))} title="Confessions" />
            </div>
          </section>
        ) : null}
      </main>
    </ServiceLayout>
  );
}
