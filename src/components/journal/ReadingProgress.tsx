"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setProgress(scrollPercent);
      setVisible(scrollPercent > 5 && scrollPercent < 95);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        exit={{ scaleX: 0, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-[100] h-1 pointer-events-none"
        style={{ transformOrigin: "left center" }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      >
        <motion.div
          animate={{ scaleX: progress / 100 }}
          style={{ transformOrigin: "left center" }}
          className="h-full bg-gradient-to-r from-blood-400 via-wine-400 to-blood-400"
          aria-hidden="true"
        />
      </motion.div>
    </AnimatePresence>
  );
}