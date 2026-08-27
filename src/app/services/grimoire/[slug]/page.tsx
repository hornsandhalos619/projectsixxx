import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLayout } from "@/components/services/ServiceLayout";
import { cn } from "@/lib/utils";
import { BookOpen, ArrowLeft, Download, Shield, FileText } from "lucide-react";
import Link from "next/link";
import { getService } from "@/lib/content";

interface GrimoirePageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ delivered?: string }>;
}

export async function generateMetadata({ params }: GrimoirePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  
  if (!service) {
    return { title: "Grimoire Not Found" };
  }

  return {
    title: `${service.leadMagnet.title} — ${service.title}`,
    description: service.leadMagnet.description,
    robots: "noindex, nofollow",
    openGraph: {
      title: service.leadMagnet.title,
      description: service.leadMagnet.description,
      type: "website",
    },
  };
}

export default async function GrimoirePage({ params, searchParams }: GrimoirePageProps) {
  const { slug } = await params;
  const { delivered } = await searchParams;
  const service = getService(slug);
  
  if (!service) {
    notFound();
  }

  const isDelivered = delivered === "true";

  return (
    <ServiceLayout>
      <main className="min-h-screen flex items-center justify-center px-4 md:px-8 py-20">
        <div className="max-w-2xl w-full">
          <div className="card-ritual p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blood-400/5 to-wine-400/5" aria-hidden="true" />
            
            <div className="relative z-10">
              {/* Back link */}
              <div className="mb-8 text-left">
                <Link 
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-text-muted hover:text-accent-primary transition-colors font-ui text-step-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to {service.shortTitle}</span>
                </Link>
              </div>

              {/* Grimoire Icon */}
              <div className="w-24 h-24 mx-auto mb-8 rounded-xl bg-gradient-to-br from-blood-400 to-blood-500 flex items-center justify-center shadow-[0_0_40px_rgba(192,57,43,0.3)]">
                <BookOpen className="w-12 h-12 text-void-950" />
              </div>

              {isDelivered ? (
                // Success state - grimoire delivered
                <>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blood-400 to-blood-500 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-void-950" />
                  </div>
                  
                  <h1 className="heading-ritual text-step-4 md:text-step-5 mb-4">
                    The Grimoire is Unsealed
                  </h1>
                  
                  <p className="body-ritual text-step-1 text-text-secondary mb-8 max-w-md mx-auto">
                    <span className="text-text-primary font-semibold">{service.leadMagnet.title}</span> 
                    has been sent to your inbox. The knowledge is yours to wield.
                  </p>

                  {/* Download button */}
                  <div className="space-y-4">
                    <a 
                      href={service.leadMagnet.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ritual inline-flex items-center justify-center gap-3 w-full sm:w-auto"
                    >
                      <Download className="w-5 h-5" />
                      <span>Read the Grimoire</span>
                      <FileText className="w-5 h-5" />
                    </a>
                    
                    <p className="muted-ritual text-step--1 text-text-muted">
                      Opens in new tab. Right-click to save to your grimoire library.
                    </p>
                  </div>

                  {/* What's inside */}
                  <div className="mt-12 p-6 bg-void-800/50 border border-border-subtle rounded-lg text-left">
                    <h3 className="heading-ritual-alt text-step-1 mb-4 flex items-center gap-2">
                      <FileText className="text-accent-secondary" size={20} />
                      Within These Pages
                    </h3>
                    <p className="body-ritual text-step-0 text-text-secondary mb-4">
                      {service.leadMagnet.description}
                    </p>
                    <ul className="space-y-2 text-left" role="list">
                      <li className="body-ritual text-step-0 text-text-secondary flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-primary/20 text-accent-primary text-step--1 font-ui font-semibold flex items-center justify-center">✦</span>
                        <span>Strategic frameworks used in our own rituals</span>
                      </li>
                      <li className="body-ritual text-step-0 text-text-secondary flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-primary/20 text-accent-primary text-step--1 font-ui font-semibold flex items-center justify-center">✦</span>
                        <span>Templates and checklists for immediate use</span>
                      </li>
                      <li className="body-ritual text-step-0 text-text-secondary flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-primary/20 text-accent-primary text-step--1 font-ui font-semibold flex items-center justify-center">✦</span>
                        <span>Forbidden knowledge not found in common scrolls</span>
                      </li>
                    </ul>
                  </div>

                  {/* Next step CTA */}
                  <div className="mt-10 pt-8 border-t border-border-subtle">
                    <p className="body-ritual text-step-1 text-text-secondary mb-4">
                      The grimoire is a map. The territory awaits your boot.
                    </p>
                    <Link href={`/services/${service.slug}`} className="btn-ritual inline-flex items-center gap-2">
                      <span>Begin the Ritual</span>
                    </Link>
                  </div>
                </>
              ) : (
                // Capture form state
                <>
                  <h1 className="heading-ritual text-step-4 md:text-step-5 mb-4">
                    {service.leadMagnet.title}
                  </h1>
                  
                  <p className="body-ritual text-step-1 text-text-secondary mb-8 max-w-md mx-auto">
                    {service.leadMagnet.description}
                  </p>

                  {/* Preview of contents */}
                  <div className="mb-8 p-6 bg-void-800/50 border border-border-subtle rounded-lg text-left">
                    <h3 className="heading-ritual-alt text-step-1 mb-4 flex items-center gap-2">
                      <FileText className="text-accent-secondary" size={20} />
                      What Lies Within
                    </h3>
                    <p className="body-ritual text-step-0 text-text-secondary mb-4">
                      {service.leadMagnet.description}
                    </p>
                    <ul className="space-y-2 text-left" role="list">
                      <li className="body-ritual text-step-0 text-text-secondary flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-primary/20 text-accent-primary text-step--1 font-ui font-semibold flex items-center justify-center">✦</span>
                        <span>Strategic frameworks used in our own rituals</span>
                      </li>
                      <li className="body-ritual text-step-0 text-text-secondary flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-primary/20 text-accent-primary text-step--1 font-ui font-semibold flex items-center justify-center">✦</span>
                        <span>Templates and checklists for immediate use</span>
                      </li>
                      <li className="body-ritual text-step-0 text-text-secondary flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-primary/20 text-accent-primary text-step--1 font-ui font-semibold flex items-center justify-center">✦</span>
                        <span>Forbidden knowledge not found in common scrolls</span>
                      </li>
                    </ul>
                  </div>

                  {/* Email capture form */}
                  <form 
                    action={`/services/grimoire/${service.slug}?delivered=true`}
                    method="POST"
                    className="space-y-4"
                  >
                    <input type="hidden" name="serviceSlug" value={service.slug} />
                    <input type="hidden" name="serviceName" value={service.title} />
                    <input type="hidden" name="grimoireTitle" value={service.leadMagnet.title} />
                    <input type="hidden" name="pdfUrl" value={service.leadMagnet.pdfUrl} />
                    
                    <div>
                      <label htmlFor="grimoire-email" className="label-ritual">
                        Scribe your email to receive the grimoire
                      </label>
                      <div className="relative">
                        <input
                          id="grimoire-email"
                          name="email"
                          type="email"
                          placeholder="you@domain.com"
                          className="input-ritual"
                          required
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn-ritual w-full inline-flex items-center justify-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      <span>Receive the Grimoire</span>
                    </button>

                    <p className="muted-ritual text-step--2 text-center">
                      By summoning this grimoire, you consent to receiving ritual missives from the Coven. 
                      <a href="/privacy" className="text-accent-primary hover:underline">Unseal anytime.</a>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </ServiceLayout>
  );
}