"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Instagram,
  Twitter,
  TikTok,
  Discord,
  Youtube,
  Mail,
  Crown,
  Skull,
  BookOpen,
  Heart,
  ExternalLink,
} from "lucide-react";

const footerLinks = {
  brand: [
    { href: "/", label: "The Altar (Home)" },
    { href: "/shop", label: "The Bazaar (Shop)" },
    { href: "/services", label: "The Guild (Services)" },
    { href: "/gallery", label: "The Sanctum (Gallery)" },
    { href: "/journal", label: "The Scriptorium (Journal)" },
    { href: "/contact", label: "The Confessional (Contact)" },
  ],
  shop: [
    { href: "/shop/hnh", label: "Horns & Halos Official" },
    { href: "/shop/spreadshirt", label: "Spreadshirt Collection" },
    { href: "/shop/threadless", label: "Threadless Collection" },
    { href: "/shop/etsy", label: "Etsy Curated" },
    { href: "/shop/affiliates", label: "Affiliate Marketplace" },
  ],
  services: [
    { href: "/services/formation", label: "LLC & C-Corp Formation" },
    { href: "/services/business-model", label: "Business Model Design" },
    { href: "/services/digital-production", label: "Digital Production" },
    { href: "/services/web-dev", label: "Web Dev & Deployment" },
    { href: "/services/agentic-bots", label: "Agentic Bot Integrations" },
    { href: "/services/custom-features", label: "Custom Features & Apps" },
    { href: "/services/tech-support", label: "Tech Support" },
    { href: "/services/financial", label: "Financial Services" },
    { href: "/services/data", label: "Data Management" },
    { href: "/services/art-music", label: "Art & Music Production" },
    { href: "/services/collab", label: "Collaboration Services" },
    { href: "/services/consulting", label: "General Consulting" },
  ],
  connect: [
    { href: "/contact/services", label: "Service Inquiries" },
    { href: "/contact/collab", label: "Collaboration Requests" },
    { href: "/contact/press", label: "Press & Media" },
    { href: "/contact/general", label: "General Contact" },
    { href: "/account", label: "Inner Circle (Account)" },
  ],
};

const socialLinks = [
  { href: "https://instagram.com/projectsixxx", label: "Instagram", icon: Instagram, ariaLabel: "Follow us on Instagram" },
  { href: "https://twitter.com/projectsixxx", label: "Twitter/X", icon: Twitter, ariaLabel: "Follow us on Twitter" },
  { href: "https://tiktok.com/@projectsixxx", label: "TikTok", icon: TikTok, ariaLabel: "Follow us on TikTok" },
  { href: "https://discord.gg/projectsixxx", label: "Discord", icon: Discord, ariaLabel: "Join our Discord" },
  { href: "https://youtube.com/@projectsixxx", label: "YouTube", icon: Youtube, ariaLabel: "Subscribe on YouTube" },
  { href: "mailto:coven@projectsixxx.com", label: "Email", icon: Mail, ariaLabel: "Email the Coven" },
];

const legalLinks = [
  { href: "/legal/privacy", label: "Privacy Scroll" },
  { href: "/legal/terms", label: "Terms of Covenant" },
  { href: "/legal/accessibility", label: "Accessibility Vow" },
  { href: "/legal/cookies", label: "Cookie Rites" },
];

export function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-void-950 border-t border-border-subtle">
      {/* Ambient texture */}
      <div className="absolute inset-0 texture-velvet pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 texture-gold-leaf pointer-events-none opacity-5" aria-hidden="true" />

      <div className="relative container px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center gap-3 mb-6" aria-label="Projectsixxx - Home">
              <span className="font-display text-step-5 text-pallor-50 tracking-tight">
                PROJECTSIXXX
              </span>
              <span className="font-display-alt text-step-0 text-blood-400 uppercase tracking-widest">
                HORNS & HALOS
              </span>
            </Link>
            <p className="font-body text-step-0 text-pallor-300 leading-relaxed mb-6">
              Streetwear meets Dark Divinity. Where luxury bleeds into the profane.
              Dracula&apos;s penthouse after midnight.
            </p>
            <div className="flex items-center gap-4">
              <span className="font-ui text-step-0 text-pallor-400">SWEAR FEALTY:</span>
              <Link
                href="/contact/newsletter"
                className="btn-sigil px-4 py-2 text-step-0"
              >
                JOIN THE COVEN
              </Link>
            </div>
          </motion.div>

          {/* Shop Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-1"
          >
            <h3 className="font-display-alt text-step-2 text-pallor-50 uppercase tracking-wider mb-6">
              THE BAZAAR
            </h3>
            <nav aria-label="Shop links">
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link text-step-0 group flex items-center gap-2"
                    >
                      <Crown className="w-4 h-4 text-blood-400 group-hover:text-wine-400 transition-colors" aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h3 className="font-display-alt text-step-2 text-pallor-50 uppercase tracking-wider mb-6">
              THE GUILD
            </h3>
            <nav aria-label="Services links">
              <ul className="space-y-2">
                {footerLinks.services.slice(0, 6).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link text-step-0 group flex items-center gap-2"
                    >
                      <Skull className="w-4 h-4 text-wine-400 group-hover:text-blood-400 transition-colors" aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <details className="group mt-2">
                <summary className="font-ui text-step-0 text-pallor-400 hover:text-wine-400 cursor-pointer flex items-center gap-2 list-none">
                  <span>+ 6 more services</span>
                  <BookOpen className="w-4 h-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <ul className="space-y-2 mt-2 ml-6 border-l-2 border-border-subtle pl-4">
                  {footerLinks.services.slice(6).map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="link text-step-0 group flex items-center gap-2"
                      >
                        <Skull className="w-3 h-3 text-wine-400 group-hover:text-blood-400 transition-colors" aria-hidden="true" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </nav>
          </motion.div>

          {/* Connect Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="lg:col-span-1"
          >
            <h3 className="font-display-alt text-step-2 text-pallor-50 uppercase tracking-wider mb-6">
              COMMUNE
            </h3>

            {/* Social Sigils */}
            <div className="mb-8">
              <p className="font-ui text-step-0 text-pallor-400 mb-4 uppercase tracking-wider">
                SOCIAL SIGILS
              </p>
              <div className="flex flex-wrap gap-3" role="list" aria-label="Social media links">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group relative p-3 rounded-xl bg-void-800/50 border border-border-subtle hover:border-wine-400/50 hover:bg-void-700/50 transition-all duration-300 ease-caress"
                    role="listitem"
                    aria-label={social.ariaLabel}
                  >
                    <social.icon
                      className="w-5 h-5 text-pallor-300 group-hover:text-wine-400 transition-colors"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{social.label}</span>
                    {social.href.startsWith("http") && (
                      <ExternalLink className="absolute -top-1 -right-1 w-3 h-3 text-pallor-400/50 group-hover:text-wine-400 transition-colors" aria-hidden="true" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Mini-Capture */}
            <div className="mb-8">
              <p className="font-ui text-step-0 text-pallor-400 mb-4 uppercase tracking-wider">
                THE COVEN'S WHISPER
              </p>
              <form className="space-y-3" action="/api/newsletter" method="POST">
                <label htmlName="footer-email" className="sr-only">
                  Email for newsletter
                </label>
                <input
                  type="email"
                  name="email"
                  id="footer-email"
                  placeholder="your@darkness.com"
                  className="input"
                  required
                  autoComplete="email"
                />
                <button type="submit" className="btn-primary w-full py-2 text-step-0">
                  <Heart className="w-4 h-4" aria-hidden="true" />
                  SWEAR FEALTY
                </button>
              </form>
              <p className="font-ui text-step-0 text-pallor-400 text-center">
                No spam. Only dark revelations. Unsummon anytime.
              </p>
            </div>

            {/* Connect Links */}
            <nav aria-label="Contact links">
              <ul className="space-y-2">
                {footerLinks.connect.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-muted text-step-0 group flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4 text-pallor-400 group-hover:text-wine-400 transition-colors" aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.05, 0.61, 0.41, 0.9], delay: 0.4 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-wine-400/30 to-transparent mb-10"
          aria-hidden="true"
        />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6"
            role="navigation"
            aria-label="Legal links"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-muted text-step-0 group"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="text-center md:text-right"
          >
            <p className="font-ui text-step-0 text-pallor-400">
              &copy; {currentYear} PROJECTSIXXX. ALL RITES RESERVED.
            </p>
            <p className="font-ui text-step-0 text-pallor-400 mt-1">
              HORNS & HALOS IS A DARK DIVINITY BRAND.
              <br />
              <span className="text-blood-400">THE VEIN REMEMBERS.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}