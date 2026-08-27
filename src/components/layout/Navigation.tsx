"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

const navigation = [
  { name: "Shop", href: "/shop", description: "The Bazaar" },
  { name: "Services", href: "/services", description: "The Guild" },
  { name: "Gallery", href: "/gallery", description: "The Sanctum" },
  { name: "Journal", href: "/journal", description: "The Scriptorium" },
  { name: "Contact", href: "/contact", description: "The Confessional" },
];

const accountNav = [
  { name: "Dashboard", href: "/account/dashboard", description: "Your Realm" },
  { name: "Orders", href: "/account/orders", description: "Offerings" },
  { name: "Commissions", href: "/account/commissions", description: "Contracts" },
  { name: "Settings", href: "/account/settings", description: "Rituals" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-[300] glass-obsidian border-b border-border-subtle">
      <nav className="container-nocturne" aria-label="Main navigation">
        <Flex className="h-16 md:h-20" justify="between" align="center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-[301]" aria-label="Projectsixxx Home">
            <span className="text-display text-step-3 gradient-blood" aria-hidden="true">
              H&H
            </span>
            <span className="hidden md:block text-ui text-step--1 text-text-muted uppercase tracking-widest">
              Horns & Halos
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-ui text-step-0 font-medium transition-all duration-[var(--dur-flutter)] ease-[var(--ease-flutter)]",
                  "hover:text-accent-primary",
                  "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-accent-primary after:transition-all after:duration-[var(--dur-sigh)] after:ease-[var(--ease-sigh)]",
                  "hover:after:w-full hover:after:left-0 hover:after:-translate-x-0",
                  pathname === item.href && "text-accent-primary after:w-full after:left-0 after:-translate-x-0"
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <Flex className="items-center gap-3" align="center">
            {/* Account Dropdown - Desktop */}
            <div className="hidden md:block relative">
              <button
                className={cn(
                  "btn-whisper px-4 py-2 gap-2",
                  "hover:text-accent-secondary"
                )}
                aria-expanded="false"
                aria-haspopup="true"
                aria-label="Account menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-step-0">Account</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* CTA Button */}
            <Button variant="ritual" size="sm" asChild>
              <Link href="/shop">Enter the Bazaar</Link>
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden btn-whisper p-2"
              aria-label="Open menu"
              aria-expanded="false"
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </Flex>
        </Flex>

        {/* Mobile Menu */}
        <div id="mobile-menu" className="md:hidden overflow-hidden transition-all duration-[var(--dur-ritual)] ease-[var(--ease-ritual)] max-h-0 opacity-0" role="navigation" aria-label="Mobile navigation">
          <div className="py-6 space-y-4 border-t border-border-subtle">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-4 py-3 text-ui text-step-1 font-medium transition-colors duration-[var(--dur-flutter)]",
                  "hover:text-accent-primary",
                  "border-l-4 border-transparent hover:border-accent-primary pl-6",
                  pathname === item.href && "text-accent-primary border-accent-primary bg-void-800/50"
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                <Flex justify="between" align="center">
                  <span>{item.name}</span>
                  <span className="text-step--1 text-text-muted">{item.description}</span>
                </Flex>
              </Link>
            ))}
            <div className="pt-4 border-t border-border-subtle space-y-2">
              {accountNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-ui text-step-0 text-text-secondary hover:text-text-primary transition-colors duration-[var(--dur-flutter)]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}