"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  className?: string;
}

export function TableOfContents({ headings, className = "" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66% 0px",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`sticky top-24 w-full max-w-xs ${className}`}
        role="navigation"
        aria-label="Table of contents"
      >
        <div className="glass rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-step--1 font-ui uppercase tracking-wider text-pallor-300">
            <BookOpen className="w-5 h-5 text-blood-400" />
            <span>Table of Contents</span>
          </div>
          <nav className="space-y-2" aria-label="Article sections">
            <ul className="space-y-1" role="list">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <Link
                    href={`#${heading.id}`}
                    className={`block px-3 py-1.5 rounded-lg transition-all duration-300 ease-caress ${
                      activeId === heading.id
                        ? "bg-blood-400/15 text-blood-400 border-l-2 border-blood-400"
                        : "text-pallor-400 hover:text-pallor-200 hover:bg-void-800/50"
                    } ${heading.level === 3 ? "ml-4 text-step--1" : "text-step-0 font-medium"}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(heading.id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                        history.pushState(null, "", `#${heading.id}`);
                        setActiveId(heading.id);
                      }
                    }}
                  >
                    {heading.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="pt-4 border-t border-border-subtle">
            <p className="font-ui text-step--1 text-pallor-400 text-center">
              Scroll to explore the ritual
            </p>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}

export function useTableOfContents(contentRef: React.RefObject<HTMLElement | null>): Heading[] {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    if (!contentRef.current) return;

    const headingElements = contentRef.current.querySelectorAll("h2, h3");
    const extractedHeadings: Heading[] = Array.from(headingElements).map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: parseInt(el.tagName.charAt(1)),
    }));

    setHeadings(extractedHeadings);
  }, [contentRef]);

  return headings;
}