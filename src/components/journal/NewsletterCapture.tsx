"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, Loader2, Check } from "lucide-react";

interface NewsletterCaptureProps {
  triggerAt?: number; // Percentage of scroll to trigger (default 40%)
  articleTitle?: string;
}

export function NewsletterCapture({ triggerAt = 40, articleTitle }: NewsletterCaptureProps) {
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const scrollDepthRef = useRef(0);
  const triggeredRef = useRef(false);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollDepthRef.current = scrollPercent;

      if (!triggeredRef.current && scrollPercent >= triggerAt) {
        triggeredRef.current = true;
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [triggerAt]);

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && visible) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
    // Don't show again for this session
    sessionStorage.setItem("newsletter-dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("A valid email is required to seal the covenant");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, articleTitle }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "The ritual failed. Try again.");
      }

      setSubmitted(true);
      setSubmitting(false);
      
      // Hide after showing success
      setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("newsletter-subscribed", "true");
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The spirits are restless. Try again.");
      setSubmitting(false);
    }
  };

  // Don't show if already dismissed or subscribed
  if (
    typeof window !== "undefined" &&
    (sessionStorage.getItem("newsletter-dismissed") === "true" ||
      sessionStorage.getItem("newsletter-subscribed") === "true")
  ) {
    return null;
  }

  if (!visible || submitted) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] bg-void-950/80 backdrop-blur-sm"
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4 z-[91]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden">
            {/* Decorative top border */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-blood-400 via-wine-400 to-blood-400 rounded-b-full" />
            
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 rounded-lg text-pallor-400 hover:text-pallor-100 hover:bg-void-800 transition-colors"
              aria-label="Dismiss newsletter invitation"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-gradient-to-br from-blood-400/20 to-wine-400/20 border border-blood-400/30">
                    <Mail className="w-8 h-8 text-blood-400" />
                  </div>
                  <h3 id="newsletter-title" className="font-display text-step-3 text-pallor-50 mb-2">
                    Swear Fealty to the Coven
                  </h3>
                  <p className="font-body text-step-0 text-pallor-300 leading-relaxed">
                    Receive the Grimoire, new rituals, and confessions — forged in production fires, delivered to your inbox.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 rounded-lg bg-blood-400/10 border border-blood-400/30 text-blood-400 text-step-0 font-ui"
                      role="alert"
                    >
                      <span className="flex-shrink-0">⚠</span>
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <div className="relative">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pallor-400" aria-hidden="true" />
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="input pl-12 pr-4 py-3.5 text-step-0 w-full"
                      disabled={submitting}
                      autoComplete="email"
                      autoFocus
                      aria-describedby={error ? "newsletter-error" : undefined}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full py-3.5 text-step-0 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" aria-hidden="true" />
                        Sealing the covenant...
                      </>
                    ) : (
                      "I Swear Fealty"
                    )}
                  </button>

                  <p className="font-ui text-step--1 text-pallor-400 text-center">
                    No spam. No marketing. Only the Grimoire. Unseal anytime.
                  </p>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-gradient-to-br from-wine-400/20 to-blood-400/20 border border-wine-400/30">
                  <Check className="w-8 h-8 text-wine-400" />
                </div>
                <h3 className="font-display text-step-3 text-pallor-50 mb-2">
                  The Covenant Is Sealed
                </h3>
                <p className="font-body text-step-0 text-pallor-300 leading-relaxed">
                  The Grimoire awakens in your inbox. Check for the summoning ritual.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}