import { Metadata } from "next";
import Link from "next/link";
import { ServiceLayout } from "@/components/services/ServiceLayout";
import { getAllServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: "Twelve Rites. One Covenant. We forge covenants, not services. Each engagement is a ritual — discovery, design, forge, deliver.",
};

export default function ServicesIndexPage() {
  const services = getAllServices();

  return (
    <ServiceLayout>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center px-4 md:px-8">
          <div className="absolute inset-0 bg-gradient-to-b from-void-950 via-void-900 to-void-800" />
          <div className="absolute inset-0 texture-cracked-obsidian" aria-hidden="true" />
          
          <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
            <span className="inline-block btn-ritual px-6 py-2 text-step--1 mb-8 animate-in">
              THE GUILD
            </span>
            <h1 className="font-display text-step-6 md:text-step-7 lg:text-step-8 mb-6 animate-in animate-in-delay-1 text-text-primary">
              Services
            </h1>
            <p className="font-display-alt text-step-3 md:text-step-4 text-accent-primary mb-8 animate-in animate-in-delay-2">
              Twelve Rites. One Covenant.
            </p>
            <p className="body-ritual text-step-1 md:text-step-2 text-text-secondary max-w-3xl mx-auto animate-in animate-in-delay-3">
              We do not offer services. We forge covenants. Each engagement is a ritual — 
              discovery, design, forge, deliver. No templates. No juniors. Only masters 
              who have built and broken things at the edge.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <ServiceCard key={service.slug} service={service} delay={index * 100} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 px-4 md:px-8 bg-void-800/50 border-y border-border-subtle">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-ritual text-step-4 md:text-step-5 mb-6">
              Seek a Rite Not Listed?
            </h2>
            <p className="body-ritual text-step-1 text-text-secondary mb-8">
              The twelve categories cover most dark arts. But some empires require 
              custom incantations. Speak your need — we'll tell you if we can forge it.
            </p>
            <Link href="/contact/services" className="btn-ritual inline-flex items-center gap-2">
              <span>Request Custom Ritual</span>
            </Link>
          </div>
        </section>
      </main>
    </ServiceLayout>
  );
}

function ServiceCard({ service, delay }: { service: any; delay: number }) {
  return (
    <article 
      className="card-ritual group relative overflow-hidden h-full flex flex-col"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blood-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
      
      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
        {/* Icon */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-void-800 border border-border-subtle flex items-center justify-center mb-6 group-hover:border-accent-primary/50 group-hover:shadow-[0_0_30px_rgba(192,57,43,0.2)] transition-all duration-500">
          <span className="text-3xl md:text-4xl" aria-hidden="true">{service.icon}</span>
        </div>

        {/* Category */}
        <span className="font-ui text-step--2 uppercase tracking-wider text-accent-secondary mb-2 block">
          {service.category}
        </span>

        {/* Title */}
        <h3 className="heading-ritual-alt text-step-2 md:text-step-3 mb-3 group-hover:text-accent-primary transition-colors">
          {service.title}
        </h3>

        {/* Tagline */}
        <p className="body-ritual text-step-0 text-text-secondary mb-6 flex-1">
          {service.tagline}
        </p>

        {/* Starting price */}
        <div className="mb-6 pt-6 border-t border-border-subtle">
          <span className="font-ui text-step--2 uppercase tracking-wider text-text-muted">
            Summoning begins at
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="heading-ritual text-step-3 font-semibold text-accent-primary">
              {service.tierPricing[0].price === 0 ? "Custom" : `$${service.tierPricing[0].price.toLocaleString()}`}
            </span>
            <span className="text-text-muted font-body">
              {service.tierPricing[0].interval === "one-time" ? "" : `/${service.tierPricing[0].interval}`}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link 
          href={`/services/${service.slug}`}
          className="btn-ritual w-full text-center group-hover:bg-accent-primary/10 group-hover:border-accent-primary transition-all duration-300"
        >
          <span>Summon This Service</span>
        </Link>
      </div>
    </article>
  );
}