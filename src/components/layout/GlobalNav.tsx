"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, User, Crown } from "lucide-react";
import { useCartStore } from "@/components/providers/CartProvider";
import { useToastStore } from "@/components/providers/ToastProvider";

const navLinks = [
  { href: "/shop", label: "SHOP", megaMenu: "shop" },
  { href: "/services", label: "SERVICES", megaMenu: "services" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/journal", label: "JOURNAL" },
  { href: "/contact", label: "CONTACT" },
];

const shopCategories = [
  { href: "/shop/hnh", label: "Horns & Halos Official", description: "Core collection" },
  { href: "/shop/spreadshirt", label: "Spreadshirt", description: "Print on demand" },
  { href: "/shop/threadless", label: "Threadless", description: "Artist collective" },
  { href: "/shop/etsy", label: "Etsy Curated", description: "Handpicked dark arts" },
  { href: "/shop/affiliates", label: "Affiliate Marketplace", description: "Trusted partners" },
];

const servicesList = [
  { href: "/services/formation", label: "LLC & C-Corp Formation", icon: "⚖️" },
  { href: "/services/business-model", label: "Business Model Design", icon: "🏗️" },
  { href: "/services/digital-production", label: "Digital Production", icon: "🎬" },
  { href: "/services/web-dev", label: "Web Dev & Deployment", icon: "🕸️" },
  { href: "/services/agentic-bots", label: "Agentic Bot Integrations", icon: "🤖" },
  { href: "/services/custom-features", label: "Custom Features & Apps", icon: "⚙️" },
  { href: "/services/tech-support", label: "Tech Support", icon: "🛡️" },
  { href: "/services/financial", label: "Financial Services", icon: "💰" },
  { href: "/services/data", label: "Data Management", icon: "🗃️" },
  { href: "/services/art-music", label: "Art & Music Production", icon: "🎨" },
  { href: "/services/collab", label: "Collaboration Services", icon: "🤝" },
  { href: "/services/consulting", label: "General Consulting", icon: "🔮" },
];

export function GlobalNav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [megaMenuPosition, setMegaMenuPosition] = useState<{ x: number; width: number } | null>(null);
  const navRef = useRef<HTMLNavElement>(null);
  const { getTotalItems } = useCartStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMegaMenu(null);
  }, [pathname]);

  const handleMegaMenuEnter = (menuKey: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    setActiveMegaMenu(menuKey);
    const rect = event.currentTarget.getBoundingClientRect();
    const navRect = navRef.current?.getBoundingClientRect();
    if (navRect) {
      setMegaMenuPosition({
        x: rect.left - navRect.left,
        width: rect.width,
      });
    }
  };

  const handleMegaMenuLeave = () => {
    // Delay to allow moving into mega menu
    setTimeout(() => {
      if (!activeMegaMenu) return;
      setActiveMegaMenu(null);
    }, 100);
  };

  const totalCartItems = getTotalItems();

  return (
    <motion.nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-caress ${
        isScrolled
          ? "glass py-4 md:py-5 shadow-velvet"
          : "py-5 md:py-6 bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 z-10 flex-shrink-0"
            aria-label="Projectsixxx - Home"
          >
            <span className="font-display text-step-5 md:text-step-6 text-pallor-50 tracking-tight select-none">
              PROJECTSIXXX
            </span>
            <span className="hidden md:inline font-display-alt text-step--2 text-blood-400 uppercase tracking-widest">
              HORNS & HALOS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.megaMenu && handleMegaMenuEnter(link.megaMenu, { currentTarget: { getBoundingClientRect: () => ({ left: 0, width: 0 }) } } as React.MouseEvent<HTMLAnchorElement>)}
                onMouseLeave={handleMegaMenuLeave}
              >
                <Link
                  href={link.href}
                  className={`font-display-alt text-step-0 uppercase tracking-wider transition-all duration-300 ease-caress px-4 py-3 rounded-lg relative ${
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? "text-blood-400"
                      : "text-pallor-300 hover:text-wine-400"
                  }`}
                >
                  {link.label}
                  {/* Blood underline indicator */}
                  <motion.span
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-blood-400 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: pathname === link.href || pathname.startsWith(link.href + "/") ? 1 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </Link>

                {/* Mega Menu */}
                {link.megaMenu && (
                  <AnimatePresence>
                    {activeMegaMenu === link.megaMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        className="absolute left-0 top-full mt-2 w-[600px] md:w-[800px] glass rounded-2xl p-6 shadow-velvet border border-border-subtle backdrop-blur-2xl"
                        style={{ transformOrigin: "top center" }}
                        onMouseEnter={() => setActiveMegaMenu(link.megaMenu!)}
                        onMouseLeave={handleMegaMenuLeave}
                        role="menu"
                      >
                        {link.megaMenu === "shop" ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {shopCategories.map((cat) => (
                              <Link
                                key={cat.href}
                                href={cat.href}
                                className="group p-4 rounded-xl bg-void-800/50 border border-border-subtle hover:border-wine-400/50 hover:bg-void-700/50 transition-all duration-300 ease-caress"
                                role="menuitem"
                              >
                                <p className="font-display-alt text-step-1 text-pallor-50 group-hover:text-wine-300 transition-colors">
                                  {cat.label}
                                </p>
                                <p className="font-ui text-step-0 text-pallor-400 mt-1 group-hover:text-pallor-300 transition-colors">
                                  {cat.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {servicesList.map((svc) => (
                              <Link
                                key={svc.href}
                                href={svc.href}
                                className="group p-4 rounded-xl bg-void-800/50 border border-border-subtle hover:border-blood-400/50 hover:bg-void-700/50 transition-all duration-300 ease-caress"
                                role="menuitem"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-step-2">{svc.icon}</span>
                                  <p className="font-display-alt text-step-0 text-pallor-50 group-hover:text-blood-400 transition-colors">
                                    {svc.label}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart */}
            <Link
              href="/account/cart"
              className="relative p-2.5 rounded-xl bg-void-800/50 border border-border-subtle hover:border-wine-400/50 hover:bg-void-700/50 transition-all duration-300 ease-caress text-pallor-300 hover:text-wine-300"
              aria-label={`Cart ${totalCartItems > 0 ? `with ${totalCartItems} items` : "empty"}`}
            >
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              {totalCartItems > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 w-5 h-5 bg-blood-400 text-pallor-50 text-step-0 font-ui font-bold rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  {totalCartItems > 99 ? "99+" : totalCartItems}
                </motion.span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/account"
              className="p-2.5 rounded-xl bg-void-800/50 border border-border-subtle hover:border-wine-400/50 hover:bg-void-700/50 transition-all duration-300 ease-caress text-pallor-300 hover:text-wine-300"
              aria-label="Account"
            >
              <User className="w-5 h-5" aria-hidden="true" />
            </Link>

            {/* CTA - Summon */}
            <Link
              href="/contact/services"
              className="btn-primary px-6 py-2.5 text-step-0"
            >
              <Crown className="w-4 h-4" aria-hidden="true" />
              SUMMON
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 rounded-xl bg-void-800/50 border border-border-subtle hover:border-wine-400/50 hover:bg-void-700/50 transition-all duration-300 ease-caress text-pallor-300 hover:text-wine-300 z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 md:hidden bg-void-950/95 backdrop-blur-2xl flex flex-col"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-border-subtle">
                <span className="font-display text-step-4 text-pallor-50">MENU</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-void-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-pallor-300" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex-1 overflow-y-auto p-6 space-y-2" role="navigation">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      className={`block px-4 py-4 rounded-xl font-display-alt text-step-1 uppercase tracking-wider transition-all duration-300 ease-caress ${
                        pathname === link.href || pathname.startsWith(link.href + "/")
                          ? "bg-blood-400/10 text-blood-400 border border-blood-400/30"
                          : "text-pallor-200 hover:text-wine-400 hover:bg-void-800/50"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>

                    {/* Mobile Mega Menu */}
                    {link.megaMenu === "shop" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-2 space-y-2 ml-4 border-l-2 border-border-subtle pl-4"
                      >
                        {shopCategories.map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            className="block p-3 rounded-lg bg-void-800/50 text-pallor-300 hover:text-wine-400 hover:bg-void-700/50 transition-all duration-300 ease-caress"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <p className="font-display-alt text-step-0">{cat.label}</p>
                            <p className="font-ui text-step-0 text-pallor-400">{cat.description}</p>
                          </Link>
                        ))}
                      </motion.div>
                    )}

                    {link.megaMenu === "services" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-2 space-y-2 ml-4 border-l-2 border-border-subtle pl-4"
                      >
                        {servicesList.map((svc) => (
                          <Link
                            key={svc.href}
                            href={svc.href}
                            className="block p-3 rounded-lg bg-void-800/50 text-pallor-300 hover:text-blood-400 hover:bg-void-700/50 transition-all duration-300 ease-caress flex items-center gap-3"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="text-step-1">{svc.icon}</span>
                            <p className="font-display-alt text-step-0">{svc.label}</p>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}

                {/* Mobile Actions */}
                <div className="mt-8 space-y-3 pt-6 border-t border-border-subtle">
                  <Link
                    href="/account/cart"
                    className="flex items-center gap-4 px-4 py-4 rounded-xl bg-void-800/50 border border-border-subtle text-pallor-200 hover:border-wine-400/50 hover:bg-void-700/50 transition-all duration-300 ease-caress"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingBag className="w-6 h-6 text-wine-400" />
                    <span className="font-display-alt text-step-0">CART</span>
                    {totalCartItems > 0 && (
                      <span className="ml-auto bg-blood-400 text-pallor-50 text-step-0 font-ui font-bold rounded-full px-3 py-1">
                        {totalCartItems}
                      </span>
                    )}
                  </Link>

                  <Link
                    href="/account"
                    className="flex items-center gap-4 px-4 py-4 rounded-xl bg-void-800/50 border border-border-subtle text-pallor-200 hover:border-wine-400/50 hover:bg-void-700/50 transition-all duration-300 ease-caress"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-6 h-6 text-wine-400" />
                    <span className="font-display-alt text-step-0">ACCOUNT</span>
                  </Link>

                  <Link
                    href="/contact/services"
                    className="btn-primary w-full text-center py-4 text-step-0"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Crown className="w-5 h-5" />
                    SUMMON THE GUILD
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}