"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { BookOpen, Loader2, Mail, CheckCircle, AlertCircle } from "lucide-react";

interface LeadMagnetFormProps {
  serviceSlug: string;
  serviceName: string;
  grimoireTitle: string;
  grimoireDescription: string;
  pdfUrl: string;
  className?: string;
}

export function LeadMagnetForm({ 
  serviceSlug, 
  serviceName, 
  grimoireTitle, 
  grimoireDescription, 
  pdfUrl,
  className 
}: LeadMagnetFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/grimoire/deliver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          serviceSlug,
          serviceName,
          grimoireTitle,
          pdfUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "The ritual failed. The spirits are restless.");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "A seal is broken. Try again.");
    }
  };

  if (status === "success") {
    return (
      <div className={cn("card-ritual p-8 text-center relative overflow-hidden", className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-blood-400/10 to-wine-400/10" />
        <CheckCircle className="text-accent-primary mx-auto mb-4" size={64} />
        <h3 className="heading-ritual-alt text-step-3 mb-2">The Grimoire is Bound</h3>
        <p className="body-ritual text-text-secondary mb-6 max-w-md mx-auto">
          The {grimoireTitle} has been sent to your inbox. Check your spam sanctuary if you don't see it within a few heartbeats.
        </p>
        <a 
          href={pdfUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-ritual inline-flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>Read Now in Browser</span>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("card-ritual p-6 md:p-8 relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-blood-400/5 to-wine-400/5" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blood-400 to-blood-500 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-void-950" />
          </div>
          <div>
            <h3 className="heading-ritual-alt text-step-2">{grimoireTitle}</h3>
            <p className="muted-ritual text-step--1">{grimoireDescription}</p>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="grimoire-email" className="label-ritual">
            Scribe your email to receive the grimoire
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
            <input
              id="grimoire-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="input-ritual pl-10"
              required
              disabled={status === "loading"}
              aria-describedby={status === "error" ? "grimoire-error" : undefined}
            />
          </div>
          {status === "error" && (
            <p id="grimoire-error" className="mt-2 text-step--1 text-blood-400 flex items-center gap-1" role="alert">
              <AlertCircle className="w-4 h-4" />
              {errorMessage}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-ritual w-full inline-flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Binding the grimoire...</span>
            </>
          ) : (
            <>
              <BookOpen className="w-5 h-5" />
              <span>Receive the Grimoire</span>
            </>
          )}
        </button>

        <p className="muted-ritual text-step--2 text-center mt-4">
          By summoning this grimoire, you consent to receiving ritual missives from the Coven. 
          <a href="/privacy" className="text-accent-primary hover:underline">Unseal anytime.</a>
        </p>
      </div>
    </form>
  );
}