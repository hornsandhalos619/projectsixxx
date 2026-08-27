import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLayout } from "@/components/services/ServiceLayout";
import { cn } from "@/lib/utils";
import { Calendar, CheckCircle, Clock, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getService } from "@/lib/content";

interface BookingPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ 
    confirmed?: string; 
    time?: string; 
    date?: string;
    tier?: string;
  }>;
}

export async function generateMetadata({ params }: BookingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  
  if (!service) {
    return { title: "Booking Confirmation" };
  }

  return {
    title: `Booking Confirmed — ${service.title}`,
    description: `Your consultation for ${service.title} has been scheduled.`,
    robots: "noindex, nofollow",
  };
}

export default async function BookingPage({ params, searchParams }: BookingPageProps) {
  const { slug } = await params;
  const { confirmed, time, date, tier } = await searchParams;
  const service = getService(slug);
  
  if (!service) {
    notFound();
  }

  const isConfirmed = confirmed === "true";

  return (
    <ServiceLayout>
      <main className="min-h-screen flex items-center justify-center px-4 md:px-8 py-20">
        <div className="max-w-2xl w-full">
          <div className="card-ritual p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blood-400/5 to-wine-400/5" aria-hidden="true" />
            
            <div className="relative z-10">
              {isConfirmed ? (
                <>
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blood-400 to-blood-500 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-void-950" />
                  </div>
                  
                  <h1 className="heading-ritual text-step-4 md:text-step-5 mb-4">
                    The Covenant is Sealed
                  </h1>
                  
                  <p className="body-ritual text-step-1 text-text-secondary mb-8 max-w-md mx-auto">
                    Your consultation for <span className="text-text-primary font-semibold">{service.title}</span> has been bound. 
                    The calendar spirits have confirmed your audience.
                  </p>

                  {/* Confirmation Details */}
                  <div className="bg-void-800/50 border border-border-subtle rounded-lg p-6 mb-8 text-left">
                    <h3 className="heading-ritual-alt text-step-1 mb-4 flex items-center gap-2">
                      <Calendar className="text-accent-primary" size={20} />
                      Summoning Details
                    </h3>
                    
                    <dl className="space-y-4">
                      <div className="flex items-center justify-between">
                        <dt className="muted-ritual text-step-0">Service</dt>
                        <dd className="body-ritual text-step-0 text-text-primary font-medium">{service.title}</dd>
                      </div>
                      {tier && (
                        <div className="flex items-center justify-between">
                          <dt className="muted-ritual text-step-0">Tier</dt>
                          <dd className="body-ritual text-step-0 text-text-primary font-medium text-accent-primary">{tier}</dd>
                        </div>
                      )}
                      {date && (
                        <div className="flex items-center justify-between">
                          <dt className="muted-ritual text-step-0">Date</dt>
                          <dd className="body-ritual text-step-0 text-text-primary font-medium">{new Date(date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</dd>
                        </div>
                      )}
                      {time && (
                        <div className="flex items-center justify-between">
                          <dt className="muted-ritual text-step-0">Time</dt>
                          <dd className="body-ritual text-step-0 text-text-primary font-medium">{time}</dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  {/* Next Steps */}
                  <div className="bg-void-800/50 border border-border-subtle rounded-lg p-6 mb-8 text-left">
                    <h3 className="heading-ritual-alt text-step-1 mb-4 flex items-center gap-2">
                      <Clock className="text-accent-secondary" size={20} />
                      What Happens Next
                    </h3>
                    <ol className="space-y-3 text-left">
                      <li className="body-ritual text-step-0 text-text-secondary flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-primary/20 text-accent-primary text-step--1 font-ui font-semibold flex items-center justify-center">1</span>
                        <span>Confirmation email sent to your inbox with calendar invite</span>
                      </li>
                      <li className="body-ritual text-step-0 text-text-secondary flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-primary/20 text-accent-primary text-step--1 font-ui font-semibold flex items-center justify-center">2</span>
                        <span>Pre-ritual questionnaire arrives 24 hours before (check spam sanctuary)</span>
                      </li>
                      <li className="body-ritual text-step-0 text-text-secondary flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-primary/20 text-accent-primary text-step--1 font-ui font-semibold flex items-center justify-center">3</span>
                        <span>Join the video circle at the appointed hour — link in calendar invite</span>
                      </li>
                      <li className="body-ritual text-step-0 text-text-secondary flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-primary/20 text-accent-primary text-step--1 font-ui font-semibold flex items-center justify-center">4</span>
                        <span>Post-ritual: summary, next steps, and grimoire access delivered within 24 hours</span>
                      </li>
                    </ol>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href={`/services/${service.slug}`} className="btn-ritual-secondary">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      <span>Return to Service</span>
                    </Link>
                    <a href={`/services/grimoire/${service.slug}`} className="btn-ritual">
                      <span>Claim Your Grimoire</span>
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-secondary to-accent-primary flex items-center justify-center animate-pulse">
                    <Calendar className="w-10 h-10 text-void-950" />
                  </div>
                  
                  <h1 className="heading-ritual text-step-4 md:text-step-5 mb-4">
                    Awaiting Confirmation
                  </h1>
                  
                  <p className="body-ritual text-step-1 text-text-secondary mb-8 max-w-md mx-auto">
                    Your booking request for <span className="text-text-primary font-semibold">{service.title}</span> has been received. 
                    The calendar spirits are aligning. Check your email for confirmation.
                  </p>

                  <div className="bg-void-800/50 border border-border-subtle rounded-lg p-6 mb-8 text-left">
                    <h3 className="heading-ritual-alt text-step-1 mb-4 flex items-center gap-2">
                      <Mail className="text-accent-secondary" size={20} />
                      While You Wait
                    </h3>
                    <ul className="space-y-3 text-left">
                      <li className="body-ritual text-step-0 text-text-secondary flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-secondary/20 text-accent-secondary text-step--1 font-ui font-semibold flex items-center justify-center">✦</span>
                        <span>Check your inbox (and spam) for the confirmation ritual</span>
                      </li>
                      <li className="body-ritual text-step-0 text-text-secondary flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-secondary/20 text-accent-secondary text-step--1 font-ui font-semibold flex items-center justify-center">✦</span>
                        <span>Review the <a href={`/services/grimoire/${service.slug}`} className="text-accent-primary hover:underline">grimoire</a> to prepare for the consultation</span>
                      </li>
                      <li className="body-ritual text-step-0 text-text-secondary flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-secondary/20 text-accent-secondary text-step--1 font-ui font-semibold flex items-center justify-center">✦</span>
                        <span>Gather any existing documents, metrics, or visions to share</span>
                      </li>
                    </ul>
                  </div>

                  <Link href={`/services/${service.slug}`} className="btn-ritual-secondary inline-flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Service</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </ServiceLayout>
  );
}