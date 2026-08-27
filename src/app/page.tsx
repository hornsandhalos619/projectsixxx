"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardMedia } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { 
  WaxSeal, 
  Crown, 
  Key, 
  Skull, 
  Rose, 
  Bat, 
  Chalice, 
  Grimoire, 
  Candle, 
  BloodDrop, 
  VelvetRibbon, 
  Ouroboros, 
  Sigil 
} from "@/components/ui/icon";

export default function Home() {
  useEffect(() => {
    // Register GSAP ScrollTrigger animations
    if (typeof window !== "undefined") {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        if (window.gsap) {
          window.gsap.registerPlugin(ScrollTrigger);
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-void-900 text-text-primary">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(192,57,43,0.15)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(212,165,116,0.1)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(192,57,43,0.08)_0%,transparent_50%)]" />
          <div className="absolute inset-0 texture-velvet" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: Math.random() > 0.5 ? "var(--blood-400)" : "var(--wine-300)",
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <Container className="relative z-10 py-20">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Logo/Wordmark */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <WaxSeal className="w-16 h-16 text-blood-400 animate-pulse-blood" />
              <Typography
                element="h1"
                className="font-display text-step-7 md:text-step-7 tracking-tight text-pallor-50"
              >
                Projectsixxx
              </Typography>
            </div>

            {/* Tagline */}
            <Typography
              element="p"
              className="font-body text-step-2 md:text-step-3 text-pallor-200 max-w-2xl mx-auto leading-relaxed"
            >
              Where luxury bleeds into the profane. Enter the Cathedral.
            </Typography>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
              <Link href="/shop">
                <Button variant="primary" size="xl" className="w-full sm:w-auto">
                  <Crown className="w-5 h-5 mr-2" />
                  Enter the Bazaar
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="velvet" size="xl" className="w-full sm:w-auto">
                  <Key className="w-5 h-5 mr-2" />
                  Summon the Guild
                </Button>
              </Link>
              <Link href="/gallery">
                <Button variant="blood" size="xl" className="w-full sm:w-auto">
                  <Skull className="w-5 h-5 mr-2" />
                  Enter the Sanctum
                </Button>
              </Link>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce motion-reduce:hidden">
              <BloodDrop className="w-8 h-8 text-blood-400/50" />
            </div>
          </div>
        </Container>
      </section>

      {/* Portal Cards Section */}
      <Section className="relative">
        <Container>
          <div className="text-center mb-16">
            <Typography element="span" className="caption text-accent-primary mb-4 block">
              The Three Pillars
            </Typography>
            <Typography element="h2" className="heading-1">
              Choose Your Path
            </Typography>
            <Typography element="p" className="body-large text-text-secondary mt-4 max-w-2xl mx-auto">
              Each portal opens to a different realm of the Horns & Halos empire. Choose wisely.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Shop Portal */}
            <Link href="/shop" className="block">
              <Card variant="interactive" className="portal-card h-full overflow-hidden">
                <CardMedia aspectRatio="4/3" className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blood-400/20 via-transparent to-wine-400/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Crown className="w-24 h-24 text-pallor-100/30" />
                  </div>
                </CardMedia>
                <CardContent className="p-8 text-center">
                  <Typography element="span" className="caption text-blood-400 mb-3 block">
                    THE BAZAAR
                  </Typography>
                  <Typography element="h3" className="heading-3 mb-4">
                    Shop
                  </Typography>
                  <Typography element="p" className="body text-text-secondary mb-6">
                    Unified marketplace aggregator — Horns & Halos official, Spreadshirt, Threadless, Etsy, and curated affiliates. One cart. Infinite darkness.
                  </Typography>
                  <div className="flex items-center justify-center gap-2 text-sm text-pallor-400">
                    <span>Shopify</span>
                    <span aria-hidden="true">•</span>
                    <span>Spreadshirt</span>
                    <span aria-hidden="true">•</span>
                    <span>Threadless</span>
                    <span aria-hidden="true">•</span>
                    <span>Etsy</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Services Portal */}
            <Link href="/services" className="block">
              <Card variant="interactive" className="portal-card h-full overflow-hidden">
                <CardMedia aspectRatio="4/3" className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-wine-400/20 via-transparent to-blood-400/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Key className="w-24 h-24 text-pallor-100/30" />
                  </div>
                </CardMedia>
                <CardContent className="p-8 text-center">
                  <Typography element="span" className="caption text-wine-400 mb-3 block">
                    THE GUILD
                  </Typography>
                  <Typography element="h3" className="heading-3 mb-4">
                    Services
                  </Typography>
                  <Typography element="p" className="body text-text-secondary mb-6">
                    Twelve disciplines of dark craft. LLC formation, business architecture, web development, agentic bots, financial services, and more.
                  </Typography>
                  <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-pallor-400">
                    <span>12 Disciplines</span>
                    <span aria-hidden="true">•</span>
                    <span>Tiered Pricing</span>
                    <span aria-hidden="true">•</span>
                    <span>Case Studies</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Gallery Portal */}
            <Link href="/gallery" className="block">
              <Card variant="interactive" className="portal-card h-full overflow-hidden">
                <CardMedia aspectRatio="4/3" className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blood-400/10 via-transparent to-wine-400/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Skull className="w-24 h-24 text-pallor-100/30" />
                  </div>
                </CardMedia>
                <CardContent className="p-8 text-center">
                  <Typography element="span" className="caption text-accent-secondary mb-3 block">
                    THE SANCTUM
                  </Typography>
                  <Typography element="h3" className="heading-3 mb-4">
                    Gallery
                  </Typography>
                  <Typography element="p" className="body text-text-secondary mb-6">
                    Dark art showcase with WebGL shaders. Digital, photography, generative. Commission portal. Print sales. Soul-bound editions.
                  </Typography>
                  <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-pallor-400">
                    <span>WebGL Shaders</span>
                    <span aria-hidden="true">•</span>
                    <span>Commissions</span>
                    <span aria-hidden="true">•</span>
                    <span>Prints</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Currently Haunting - Live Activity Feed */}
      <Section className="relative">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <div>
              <Typography element="span" className="caption text-accent-primary mb-3 block">
                CURRENTLY HAUNTING
              </Typography>
              <Typography element="h2" className="heading-2">
                Live Activity Feed
              </Typography>
            </div>
            <Link href="/journal" className="link">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="feed" aria-label="Recent activity">
            {/* Activity items */}
            {[
              {
                type: "order",
                icon: Chalice,
                title: "New Order",
                description: "\"Crimson Crown\" Tee • Size L • Midnight Black",
                time: "2 minutes ago",
                color: "blood",
              },
              {
                type: "gallery",
                icon: Rose,
                title: "Gallery Upload",
                description: "\"Void Walker\" by @shadowartist • Digital",
                time: "15 minutes ago",
                color: "wine",
              },
              {
                type: "journal",
                icon: Grimoire,
                title: "New Essay",
                description: "\"The Architecture of Darkness\" • Ritual",
                time: "1 hour ago",
                color: "accent",
              },
              {
                type: "order",
                icon: Chalice,
                title: "New Order",
                description: "\"Obsidian Sigil\" Hoodie • Size M • Blood Red",
                time: "3 hours ago",
                color: "blood",
              },
              {
                type: "gallery",
                icon: Bat,
                title: "Commission Complete",
                description: "\"Witch Queen\" portrait delivered to client",
                time: "4 hours ago",
                color: "wine",
              },
              {
                type: "journal",
                icon: Candle,
                title: "Confession",
                description: "\"Why I Chose the Void Over Venture Capital\"",
                time: "6 hours ago",
                color: "accent",
              },
            ].map((activity, index) => (
              <Card key={index} variant="interactive" className="group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-gothic-md flex items-center justify-center text-xl ${activity.color === "blood" ? "bg-blood-400/20 text-blood-400" : activity.color === "wine" ? "bg-wine-400/20 text-wine-400" : "bg-accent-primary/20 text-accent-primary"}`}
                    >
                      <activity.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Typography element="h4" className="heading-4 mb-1">
                        {activity.title}
                      </Typography>
                      <Typography element="p" className="body text-text-secondary mb-2">
                        {activity.description}
                      </Typography>
                      <Typography element="span" className="caption text-text-muted">
                        {activity.time}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Newsletter - Swear Fealty */}
      <Section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blood-400/5 via-void-900 to-wine-400/5" aria-hidden="true" />
        <Container>
          <Card variant="gradient-border" className="max-w-2xl mx-auto">
            <CardContent className="p-10 md:p-14 text-center">
              <WaxSeal className="w-20 h-20 mx-auto mb-6 text-blood-400" />
              <Typography element="h2" className="heading-1 mb-4">
                Swear Fealty
              </Typography>
              <Typography element="p" className="body-large text-text-secondary mb-8 max-w-lg mx-auto">
                Join the inner circle. Receive dark missives, early access to drops, ritual announcements, and forbidden knowledge. No spam. Only summonings.
              </Typography>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <div className="flex-1">
                  <label htmlName="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    className="input w-full"
                    required
                    autoComplete="email"
                  />
                </div>
                <Button variant="primary" type="submit" className="w-full sm:w-auto">
                  <BloodDrop className="w-4 h-4 mr-2" />
                  Seal the Covenant
                </Button>
              </form>
              <Typography element="p" className="caption text-text-muted mt-6">
                By entering, you agree to receive rituals at your inbox. Unsummon anytime.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border-subtle bg-void-950">
        <Container className="py-16 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <WaxSeal className="w-10 h-10 text-blood-400" />
                <Typography element="span" className="font-display text-step-4 text-pallor-50">
                  Projectsixxx
                </Typography>
              </div>
              <Typography element="p" className="body text-text-secondary max-w-sm mb-6">
                Horns & Halos — Streetwear meets Dark Divinity. Where luxury bleeds into the profane.
              </Typography>
              <div className="flex gap-4">
                <a href="#" className="text-pallor-400 hover:text-wine-400 transition-colors" aria-label="Instagram">
                  <Rose className="w-6 h-6" />
                </a>
                <a href="#" className="text-pallor-400 hover:text-wine-400 transition-colors" aria-label="Twitter/X">
                  <Bat className="w-6 h-6" />
                </a>
                <a href="#" className="text-pallor-400 hover:text-wine-400 transition-colors" aria-label="Discord">
                  <Skull className="w-6 h-6" />
                </a>
                <a href="#" className="text-pallor-400 hover:text-wine-400 transition-colors" aria-label="YouTube">
                  <Candle className="w-6 h-6" />
                </a>
                <a href="#" className="text-pallor-400 hover:text-wine-400 transition-colors" aria-label="Email">
                  <Grimoire className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <Typography element="h4" className="caption text-pallor-200 mb-4 uppercase tracking-wider">
                The Bazaar
              </Typography>
              <nav className="space-y-3">
                <Link href="/shop" className="link-muted block">All Products</Link>
                <Link href="/shop/hnh" className="link-muted block">Horns & Halos Official</Link>
                <Link href="/shop/spreadshirt" className="link-muted block">Spreadshirt</Link>
                <Link href="/shop/threadless" className="link-muted block">Threadless</Link>
                <Link href="/shop/etsy" className="link-muted block">Etsy Curated</Link>
                <Link href="/shop/affiliates" className="link-muted block">Affiliate Marketplace</Link>
                <Link href="/cart" className="link-muted block">Cart</Link>
              </nav>
            </div>

            {/* Services Links */}
            <div>
              <Typography element="h4" className="caption text-pallor-200 mb-4 uppercase tracking-wider">
                The Guild
              </Typography>
              <nav className="space-y-3">
                <Link href="/services" className="link-muted block">All Services</Link>
                <Link href="/services/formation" className="link-muted block">LLC & C-Corp Formation</Link>
                <Link href="/services/business-model" className="link-muted block">Business Model Design</Link>
                <Link href="/services/web-dev" className="link-muted block">Web Dev & Deployment</Link>
                <Link href="/services/agentic-bots" className="link-muted block">Agentic Bot Integrations</Link>
                <Link href="/services/custom-features" className="link-muted block">Custom Features & Apps</Link>
                <Link href="/services/tech-support" className="link-muted block">Tech Support</Link>
              </nav>
            </div>

            {/* Connect */}
            <div>
              <Typography element="h4" className="caption text-pallor-200 mb-4 uppercase tracking-wider">
                Connect
              </Typography>
              <nav className="space-y-3">
                <Link href="/gallery" className="link-muted block">The Sanctum (Gallery)</Link>
                <Link href="/journal" className="link-muted block">The Scriptorium (Journal)</Link>
                <Link href="/contact" className="link-muted block">The Confessional (Contact)</Link>
                <Link href="/contact/newsletter" className="link-muted block">Swear Fealty (Newsletter)</Link>
                <Link href="/account" className="link-muted block">Inner Circle (Account)</Link>
              </nav>
            </div>
          </div>

          {/* Legal */}
          <div className="pt-8 border-t border-border-subtle">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <Typography element="p" className="caption text-text-muted">
                © {new Date().getFullYear()} Projectsixxx. All rights reserved. The darkness endures.
              </Typography>
              <nav className="flex flex-wrap items-center justify-center gap-6">
                <Link href="/legal/privacy" className="caption text-text-muted hover:text-wine-400 transition-colors">
                  Privacy
                </Link>
                <Link href="/legal/terms" className="caption text-text-muted hover:text-wine-400 transition-colors">
                  Terms
                </Link>
                <Link href="/legal/accessibility" className="caption text-text-muted hover:text-wine-400 transition-colors">
                  Accessibility
                </Link>
                <Link href="/legal/cookies" className="caption text-text-muted hover:text-wine-400 transition-colors">
                  Cookies
                </Link>
              </nav>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}