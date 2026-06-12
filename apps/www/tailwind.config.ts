import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* ── DocsUI semantic tokens ── */
        info: {
          border: "var(--mdxui-info-border)",
          bg: "var(--mdxui-info-bg)",
          text: "var(--mdxui-info-text)",
          accent: "var(--mdxui-info-accent)",
          "badge-bg": "var(--mdxui-info-badge-bg)",
          "badge-text": "var(--mdxui-info-badge-text)",
        },
        note: {
          border: "var(--mdxui-note-border)",
          bg: "var(--mdxui-note-bg)",
          text: "var(--mdxui-note-text)",
          accent: "var(--mdxui-note-accent)",
          "badge-bg": "var(--mdxui-note-badge-bg)",
          "badge-text": "var(--mdxui-note-badge-text)",
        },
        tip: {
          border: "var(--mdxui-tip-border)",
          bg: "var(--mdxui-tip-bg)",
          text: "var(--mdxui-tip-text)",
          accent: "var(--mdxui-tip-accent)",
          "badge-bg": "var(--mdxui-tip-badge-bg)",
          "badge-text": "var(--mdxui-tip-badge-text)",
        },
        warning: {
          border: "var(--mdxui-warning-border)",
          bg: "var(--mdxui-warning-bg)",
          text: "var(--mdxui-warning-text)",
          accent: "var(--mdxui-warning-accent)",
          "badge-bg": "var(--mdxui-warning-badge-bg)",
          "badge-text": "var(--mdxui-warning-badge-text)",
        },
        danger: {
          border: "var(--mdxui-danger-border)",
          bg: "var(--mdxui-danger-bg)",
          text: "var(--mdxui-danger-text)",
          accent: "var(--mdxui-danger-accent)",
          "badge-bg": "var(--mdxui-danger-badge-bg)",
          "badge-text": "var(--mdxui-danger-badge-text)",
        },
        success: {
          border: "var(--mdxui-success-border)",
          bg: "var(--mdxui-success-bg)",
          text: "var(--mdxui-success-text)",
          accent: "var(--mdxui-success-accent)",
          "badge-bg": "var(--mdxui-success-badge-bg)",
          "badge-text": "var(--mdxui-success-badge-text)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "JetBrains Mono",
          "monospace",
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
