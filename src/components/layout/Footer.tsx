import Link from "next/link";
import { cn } from "@/lib/utils";

const footerLinks = {
  shop: [
    { name: "Horns & Halos", href: "/shop/hnh" },
    { name: "Spreadshirt", href: "/shop/spreadshirt" },
    { name: "Threadless", href: "/shop/threadless" },
    { name: "Etsy Curated", href: "/shop/etsy" },
    { name: "Affiliates", href: "/shop/affiliates" },
  ],
  services: [
    { name: "Formation", href: "/services/formation" },
    { name: "Business Model", href: "/services/business-model" },
    { name: "Digital Production", href: "/services/digital-production" },
    { name: "Web Development", href: "/services/web-dev" },
    { name: "Agentic Bots", href: "/services/agentic-bots" },
    { name: "Custom Features", href: "/services/custom-features" },
    { name: "Tech Support", href: "/services/tech-support" },
    { name: "Financial", href: "/services/financial" },
    { name: "Data Management", href: "/services/data" },
    { name: "Art & Music", href: "/services/art-music" },
    { name: "Collaboration", href: "/services/collab" },
    { name: "Consulting", href: "/services/consulting" },
  ],
  gallery: [
    { name: "Digital Art", href: "/gallery/digital" },
    { name: "Photography", href: "/gallery/photography" },
    { name: "Generative", href: "/gallery/generative" },
    { name: "Commissions", href: "/gallery/commissions" },
    { name: "Prints", href: "/gallery/prints" },
  ],
  journal: [
    { name: "Essays", href: "/journal/articles" },
    { name: "Rituals", href: "/journal/rituals" },
    { name: "Confessions", href: "/journal/confessions" },
    { name: "Summonings", href: "/journal/announcements" },
    { name: "Boards", href: "/journal/boards" },
  ],
  contact: [
    { name: "Services Inquiry", href: "/contact/services" },
    { name: "Collaboration", href: "/contact/collab" },
    { name: "Press", href: "/contact/press" },
    { name: "General", href: "/contact/general" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Shipping", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Accessibility", href: "/accessibility" },
  ],
};

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/projectsixxx", icon: "twitter" },
  { name: "Instagram", href: "https://instagram.com/projectsixxx", icon: "instagram" },
  { name: "Discord", href: "https://discord.gg/projectsixxx", icon: "discord" },
  { name: "GitHub", href: "https://github.com/projectsixxx", icon: "github" },
  { name: "YouTube", href: "https://youtube.com/@projectsixxx", icon: "youtube" },
];

export function Footer() {
  return (
    <footer className="bg-void-950 border-t border-border-subtle texture-cracked-obsidian" role="contentinfo">
      <div className="container-nocturne">
        <div className="py-16 md:py-24 lg:py-32">
          {/* Main Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 mb-16">
            {/* Brand Column - Span 2 on mobile, 1 on lg */}
            <div className="col-span-2 lg:col-span-1 lg:col-start-1">
              <Link href="/" className="flex items-center gap-3 mb-6" aria-label="Projectsixxx Home">
                <span className="text-display text-step-4 gradient-blood" aria-hidden="true">
                  H&H
                </span>
              </Link>
              <p className="text-body text-step-0 text-text-secondary mb-6 max-w-xs">
                Streetwear meets Dark Divinity. Where luxury bleeds into the profane.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-10 h-10 rounded-obsidian bg-void-800/50 border border-border-subtle",
                      "flex items-center justify-center text-text-secondary",
                      "hover:bg-void-700 hover:border-wine-300/30 hover:text-wine-300",
                      "transition-all duration-[var(--dur-flutter)] ease-[var(--ease-flutter)]"
                    )}
                    aria-label={social.name}
                  >
                    <SocialIcon name={social.icon} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Column */}
            <nav aria-label="Shop">
              <h3 className="text-display-alt text-step-1 text-text-primary mb-4">The Bazaar</h3>
              <ul className="space-y-3" role="list">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-ui text-step-0 text-text-secondary",
                        "hover:text-accent-primary transition-colors duration-[var(--dur-flutter)]",
                        "link-oath"
                      )}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Services Column */}
            <nav aria-label="Services">
              <h3 className="text-display-alt text-step-1 text-text-primary mb-4">The Guild</h3>
              <ul className="space-y-3" role="list">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-ui text-step-0 text-text-secondary",
                        "hover:text-accent-primary transition-colors duration-[var(--dur-flutter)]",
                        "link-oath"
                      )}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Gallery Column */}
            <nav aria-label="Gallery">
              <h3 className="text-display-alt text-step-1 text-text-primary mb-4">The Sanctum</h3>
              <ul className="space-y-3" role="list">
                {footerLinks.gallery.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-ui text-step-0 text-text-secondary",
                        "hover:text-accent-primary transition-colors duration-[var(--dur-flutter)]",
                        "link-oath"
                      )}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Journal Column */}
            <nav aria-label="Journal">
              <h3 className="text-display-alt text-step-1 text-text-primary mb-4">The Scriptorium</h3>
              <ul className="space-y-3" role="list">
                {footerLinks.journal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-ui text-step-0 text-text-secondary",
                        "hover:text-accent-primary transition-colors duration-[var(--dur-flutter)]",
                        "link-oath"
                      )}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact & Legal Column */}
            <div className="lg:col-span-2 space-y-8">
              <nav aria-label="Contact">
                <h3 className="text-display-alt text-step-1 text-text-primary mb-4">The Confessional</h3>
                <ul className="space-y-3" role="list">
                  {footerLinks.contact.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={cn(
                          "text-ui text-step-0 text-text-secondary",
                          "hover:text-accent-primary transition-colors duration-[var(--dur-flutter)]",
                          "link-oath"
                        )}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label="Legal">
                <h3 className="text-display-alt text-step-1 text-text-primary mb-4">The Scrolls</h3>
                <ul className="space-y-3" role="list">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={cn(
                          "text-ui text-step-0 text-text-secondary",
                          "hover:text-accent-primary transition-colors duration-[var(--dur-flutter)]",
                          "link-oath"
                        )}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-blood-400 to-transparent" />
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Copyright */}
            <p className="text-ui text-step--1 text-text-muted">
              © {new Date().getFullYear()} Projectsixxx. All rites reserved.
              <span className="hidden md:inline mx-2">•</span>
              <span className="md:hidden block mt-1">•</span>
              Horns & Halos® is a registered trademark.
            </p>

            {/* Newsletter */}
            <form className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto" action="/api/newsletter" method="POST">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="footer-email"
                name="email"
                placeholder="Swear fealty with your email..."
                className={cn(
                  "flex-1 px-4 py-2.5 rounded-obsidian",
                  "bg-void-800/50 border border-border-subtle text-text-primary",
                  "placeholder:text-text-muted",
                  "focus:outline-none focus:ring-2 focus:ring-blood-400 focus:border-transparent",
                  "transition-all duration-[var(--dur-flutter)]"
                )}
                required
              />
              <Button type="submit" variant="ritual" size="sm" className="whitespace-nowrap">
                Join the Coven
              </Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, JSX.Element> = {
    twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.695L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    discord: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.675 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.081.081 0 0 0 .031.057 19.9 19.9 0 0 0 5.995 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.007-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.364 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.005-3.03.077.077 0 0 0 .032-.054c.384-4.055-.547-8.483-1.789-11.874a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  };

  return icons[name] || null;
}