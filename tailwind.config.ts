import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: "var(--void-950)",
          900: "var(--void-900)",
          800: "var(--void-800)",
          700: "var(--void-700)",
        },
        blood: {
          400: "var(--blood-400)",
          500: "var(--blood-500)",
          600: "var(--blood-600)",
        },
        wine: {
          300: "var(--wine-300)",
          400: "var(--wine-400)",
          500: "var(--wine-500)",
        },
        pallor: {
          50: "var(--pallor-50)",
          100: "var(--pallor-100)",
          200: "var(--pallor-200)",
          300: "var(--pallor-300)",
          400: "var(--pallor-400)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          primary: "var(--accent-primary)",
          secondary: "var(--accent-secondary)",
        },
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        border: {
          subtle: "var(--border-subtle)",
          focus: "var(--border-focus)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        "display-alt": ["var(--font-display-alt)", "Georgia", "serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        ui: ["var(--font-ui)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "step--2": "var(--step--2)",
        "step--1": "var(--step--1)",
        "step-0": "var(--step-0)",
        "step-1": "var(--step-1)",
        "step-2": "var(--step-2)",
        "step-3": "var(--step-3)",
        "step-4": "var(--step-4)",
        "step-5": "var(--step-5)",
        "step-6": "var(--step-6)",
        "step-7": "var(--step-7)",
      },
      transitionTimingFunction: {
        flutter: "var(--ease-flutter)",
        sigh: "var(--ease-sigh)",
        ritual: "var(--ease-ritual)",
        caress: "var(--ease-caress)",
      },
      transitionDuration: {
        flutter: "var(--dur-flutter)",
        sigh: "var(--dur-sigh)",
        ritual: "var(--dur-ritual)",
        caress: "var(--dur-caress)",
      },
      backgroundImage: {
        "velvet-gloss": "var(--velvet-gloss)",
        "silk-sheen": "var(--silk-sheen)",
        "obsidian-glass": "var(--obsidian-glass)",
      },
      boxShadow: {
        velvet: "0 0 24px rgba(192, 57, 43, 0.15), 0 4px 16px rgba(0, 0, 0, 0.3)",
        "blood-glow": "0 0 24px rgba(192, 57, 43, 0.4)",
        "wine-glow": "0 0 24px rgba(212, 165, 116, 0.3)",
      },
      animation: {
        "velvet-shimmer": "velvetShimmer 1.5s ease-in-out infinite",
        "gold-drift": "goldDrift 60s linear infinite",
        "pulse-blood": "pulseBlood 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        velvetShimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        goldDrift: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "400px 400px" },
        },
        pulseBlood: {
          "0%, 100%": { boxShadow: "0 0 12px rgba(192, 57, 43, 0.3)" },
          "50%": { boxShadow: "0 0 24px rgba(192, 57, 43, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;