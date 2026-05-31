// ─── CSS / Tailwind constants injected by `init` ─────────────────────────────
// Kept here so init.ts stays focused on logic, not string literals.

const SHIKI_CSS = `
/* Shiki syntax highlighting — light/dark dual theme */
[data-code-block] code span {
  color: var(--shiki-light);
  font-style: var(--shiki-light-font-style);
  font-weight: var(--shiki-light-font-weight);
}
.dark [data-code-block] code span {
  color: var(--shiki-dark);
  font-style: var(--shiki-dark-font-style);
  font-weight: var(--shiki-dark-font-weight);
}
`;

const CSS_VARS_ROOT = `
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 142 71% 45%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 142 71% 45%;
  }`;

export const CSS_VARS_BLOCK_V3 = `
@layer base {${CSS_VARS_ROOT}
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
${SHIKI_CSS}`;

export const CSS_VARS_BLOCK_V4 = `
@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}
${CSS_VARS_ROOT}

*, *::before, *::after {
  border-color: hsl(var(--border));
}
body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
${SHIKI_CSS}`;

// Users can override any variable to rebrand callout, alert, and badge colors.
export const MDXUI_SEMANTIC_TOKENS = `
@layer base {
  /* ── MDX UI semantic tokens ─────────────────────────────────────────────────
     Override these variables to rebrand callout, alert, and badge colors.
     Light mode uses Tailwind palette hex values as defaults.              */
  :root {
    --mdxui-info-border:        #7dd3fc; /* sky-300   */
    --mdxui-info-bg:            #f0f9ff; /* sky-50    */
    --mdxui-info-text:          #0c4a6e; /* sky-900   */
    --mdxui-info-accent:        #0369a1; /* sky-700   */
    --mdxui-info-badge-bg:      #e0f2fe; /* sky-100   */
    --mdxui-info-badge-text:    #075985; /* sky-800   */

    --mdxui-note-border:        #cbd5e1; /* slate-300 */
    --mdxui-note-bg:            #f8fafc; /* slate-50  */
    --mdxui-note-text:          #0f172a; /* slate-900 */
    --mdxui-note-accent:        #475569; /* slate-600 */
    --mdxui-note-badge-bg:      #f1f5f9; /* slate-100 */
    --mdxui-note-badge-text:    #334155; /* slate-700 */

    --mdxui-tip-border:         #6ee7b7; /* emerald-300 */
    --mdxui-tip-bg:             #ecfdf5; /* emerald-50  */
    --mdxui-tip-text:           #064e3b; /* emerald-900 */
    --mdxui-tip-accent:         #059669; /* emerald-600 */
    --mdxui-tip-badge-bg:       #d1fae5; /* emerald-100 */
    --mdxui-tip-badge-text:     #065f46; /* emerald-800 */

    --mdxui-warning-border:     #fcd34d; /* amber-300 */
    --mdxui-warning-bg:         #fffbeb; /* amber-50  */
    --mdxui-warning-text:       #78350f; /* amber-900 */
    --mdxui-warning-accent:     #d97706; /* amber-600 */
    --mdxui-warning-badge-bg:   #fef3c7; /* amber-100 */
    --mdxui-warning-badge-text: #92400e; /* amber-800 */

    --mdxui-danger-border:      #fca5a5; /* red-300 */
    --mdxui-danger-bg:          #fef2f2; /* red-50  */
    --mdxui-danger-text:        #7f1d1d; /* red-900 */
    --mdxui-danger-accent:      #dc2626; /* red-600 */
    --mdxui-danger-badge-bg:    #fee2e2; /* red-100 */
    --mdxui-danger-badge-text:  #991b1b; /* red-800 */

    --mdxui-success-border:     #6ee7b7; /* emerald-300 */
    --mdxui-success-bg:         #ecfdf5; /* emerald-50  */
    --mdxui-success-text:       #064e3b; /* emerald-900 */
    --mdxui-success-accent:     #059669; /* emerald-600 */
    --mdxui-success-badge-bg:   #d1fae5; /* emerald-100 */
    --mdxui-success-badge-text: #065f46; /* emerald-800 */
  }
  .dark {
    --mdxui-info-border:        #0369a1;
    --mdxui-info-bg:            rgb(8 47 73 / 0.45);
    --mdxui-info-text:          #e0f2fe;
    --mdxui-info-accent:        #7dd3fc;
    --mdxui-info-badge-bg:      rgb(8 47 73 / 0.5);
    --mdxui-info-badge-text:    #7dd3fc;

    --mdxui-note-border:        #475569;
    --mdxui-note-bg:            rgb(30 41 59 / 0.45);
    --mdxui-note-text:          #f1f5f9;
    --mdxui-note-accent:        #cbd5e1;
    --mdxui-note-badge-bg:      rgb(30 41 59 / 0.5);
    --mdxui-note-badge-text:    #cbd5e1;

    --mdxui-tip-border:         #059669;
    --mdxui-tip-bg:             rgb(2 44 34 / 0.45);
    --mdxui-tip-text:           #d1fae5;
    --mdxui-tip-accent:         #6ee7b7;
    --mdxui-tip-badge-bg:       rgb(2 44 34 / 0.5);
    --mdxui-tip-badge-text:     #6ee7b7;

    --mdxui-warning-border:     #d97706;
    --mdxui-warning-bg:         rgb(67 20 7 / 0.45);
    --mdxui-warning-text:       #fef3c7;
    --mdxui-warning-accent:     #fcd34d;
    --mdxui-warning-badge-bg:   rgb(67 20 7 / 0.5);
    --mdxui-warning-badge-text: #fcd34d;

    --mdxui-danger-border:      #dc2626;
    --mdxui-danger-bg:          rgb(69 10 10 / 0.45);
    --mdxui-danger-text:        #fee2e2;
    --mdxui-danger-accent:      #fca5a5;
    --mdxui-danger-badge-bg:    rgb(69 10 10 / 0.5);
    --mdxui-danger-badge-text:  #fca5a5;

    --mdxui-success-border:     #059669;
    --mdxui-success-bg:         rgb(2 44 34 / 0.45);
    --mdxui-success-text:       #d1fae5;
    --mdxui-success-accent:     #6ee7b7;
    --mdxui-success-badge-bg:   rgb(2 44 34 / 0.5);
    --mdxui-success-badge-text: #6ee7b7;
  }
}
`;

// Tailwind v4 — @theme inline wires --mdxui-* vars into utility classes
// e.g. --color-info-bg → bg-info-bg, border-info-border, text-warning-text, etc.
export const MDXUI_V4_THEME = `
@theme inline {
  /* MDX UI semantic color scales */
  --color-info-border:        var(--mdxui-info-border);
  --color-info-bg:            var(--mdxui-info-bg);
  --color-info-text:          var(--mdxui-info-text);
  --color-info-accent:        var(--mdxui-info-accent);
  --color-info-badge-bg:      var(--mdxui-info-badge-bg);
  --color-info-badge-text:    var(--mdxui-info-badge-text);

  --color-note-border:        var(--mdxui-note-border);
  --color-note-bg:            var(--mdxui-note-bg);
  --color-note-text:          var(--mdxui-note-text);
  --color-note-accent:        var(--mdxui-note-accent);
  --color-note-badge-bg:      var(--mdxui-note-badge-bg);
  --color-note-badge-text:    var(--mdxui-note-badge-text);

  --color-tip-border:         var(--mdxui-tip-border);
  --color-tip-bg:             var(--mdxui-tip-bg);
  --color-tip-text:           var(--mdxui-tip-text);
  --color-tip-accent:         var(--mdxui-tip-accent);
  --color-tip-badge-bg:       var(--mdxui-tip-badge-bg);
  --color-tip-badge-text:     var(--mdxui-tip-badge-text);

  --color-warning-border:     var(--mdxui-warning-border);
  --color-warning-bg:         var(--mdxui-warning-bg);
  --color-warning-text:       var(--mdxui-warning-text);
  --color-warning-accent:     var(--mdxui-warning-accent);
  --color-warning-badge-bg:   var(--mdxui-warning-badge-bg);
  --color-warning-badge-text: var(--mdxui-warning-badge-text);

  --color-danger-border:      var(--mdxui-danger-border);
  --color-danger-bg:          var(--mdxui-danger-bg);
  --color-danger-text:        var(--mdxui-danger-text);
  --color-danger-accent:      var(--mdxui-danger-accent);
  --color-danger-badge-bg:    var(--mdxui-danger-badge-bg);
  --color-danger-badge-text:  var(--mdxui-danger-badge-text);

  --color-success-border:     var(--mdxui-success-border);
  --color-success-bg:         var(--mdxui-success-bg);
  --color-success-text:       var(--mdxui-success-text);
  --color-success-accent:     var(--mdxui-success-accent);
  --color-success-badge-bg:   var(--mdxui-success-badge-bg);
  --color-success-badge-text: var(--mdxui-success-badge-text);
}
`;

// Injected into an existing shadcn tailwind.config — only the 6 semantic scales
export const MDXUI_TAILWIND_COLOR_SCALES = `        /* MDX UI semantic tokens */
        info:    { border: "var(--mdxui-info-border)", bg: "var(--mdxui-info-bg)", text: "var(--mdxui-info-text)", accent: "var(--mdxui-info-accent)", "badge-bg": "var(--mdxui-info-badge-bg)", "badge-text": "var(--mdxui-info-badge-text)" },
        note:    { border: "var(--mdxui-note-border)", bg: "var(--mdxui-note-bg)", text: "var(--mdxui-note-text)", accent: "var(--mdxui-note-accent)", "badge-bg": "var(--mdxui-note-badge-bg)", "badge-text": "var(--mdxui-note-badge-text)" },
        tip:     { border: "var(--mdxui-tip-border)", bg: "var(--mdxui-tip-bg)", text: "var(--mdxui-tip-text)", accent: "var(--mdxui-tip-accent)", "badge-bg": "var(--mdxui-tip-badge-bg)", "badge-text": "var(--mdxui-tip-badge-text)" },
        warning: { border: "var(--mdxui-warning-border)", bg: "var(--mdxui-warning-bg)", text: "var(--mdxui-warning-text)", accent: "var(--mdxui-warning-accent)", "badge-bg": "var(--mdxui-warning-badge-bg)", "badge-text": "var(--mdxui-warning-badge-text)" },
        danger:  { border: "var(--mdxui-danger-border)", bg: "var(--mdxui-danger-bg)", text: "var(--mdxui-danger-text)", accent: "var(--mdxui-danger-accent)", "badge-bg": "var(--mdxui-danger-badge-bg)", "badge-text": "var(--mdxui-danger-badge-text)" },
        success: { border: "var(--mdxui-success-border)", bg: "var(--mdxui-success-bg)", text: "var(--mdxui-success-text)", accent: "var(--mdxui-success-accent)", "badge-bg": "var(--mdxui-success-badge-bg)", "badge-text": "var(--mdxui-success-badge-text)" },`;

// Full theme.extend patch for a fresh tailwind.config (shadcn base + mdx-ui scales)
export const TAILWIND_V3_THEME_EXTENSIONS = `
      colors: {
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
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
${MDXUI_TAILWIND_COLOR_SCALES}
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },`;
