import type { Config } from 'tailwindcss';

/**
 * Retail Solutions — Brand & Digital Design System v1.0
 *
 * Every value below is taken from the approved system. Do not introduce raw
 * values in components; add a token here instead (see §13.4 Token governance).
 */
const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* §5.1 Core palette */
        cyan: {
          DEFAULT: '#00B0F0', // Retail Cyan — signal, fills, charts, large display only
          50: '#E6F7FE',
          100: '#D9F5FF',
          200: '#A8E7FC',
          300: '#66D3F8',
          400: '#33C2F4',
          500: '#00B0F0',
          600: '#009BD3',
          700: '#0086B6',
        },
        navy: {
          DEFAULT: '#16213E', // Executive Navy — headings, dark surfaces, authority
          50: '#F2F4F8',
          100: '#DFE3EC',
          200: '#BFC6D8',
          300: '#8E99B4',
          400: '#5D6B90',
          500: '#3A4870',
          600: '#28355A',
          700: '#1D2A49',
          800: '#16213E',
          900: '#0F172C',
        },
        fog: '#F1F2F5', // Retail Fog — background, section separation
        nude: '#F4EEE6', // Warm nude — alternating mid-page bands

        /* §5.3 Extended palette */
        functional: {
          DEFAULT: '#007DAA', // Functional Blue — links, focus, accessible emphasis
          hover: '#00668C',
        },
        capability: '#18B6A4', // Capability Teal
        decision: '#F2B544', // Decision Amber
        human: '#E85D75', // Human Coral
        insight: '#5B5BD6', // Insight Violet

        /* §5.4 Semantic */
        success: '#2D9D78',
        warning: '#F2B544',
        error: '#D94A56',
        info: '#007DAA',

        /* Callout surfaces §14.4 */
        callout: {
          info: '#D9F5FF',
          attention: '#FFF5DE',
          success: '#E8F7F1',
          critical: '#FDECEF',
        },

        /* Text + surfaces */
        ink: {
          DEFAULT: '#16213E', // text.primary
          muted: '#4C5878',
          /* Was #7C87A3, which measured 3.59:1 on white — below WCAG AA for
             normal text (§25). Darkened to clear 4.5:1 on both white (5.06)
             and Fog (4.52), the two surfaces it actually appears on. */
          faint: '#646E8C',
        },
        line: {
          DEFAULT: '#E2E5EC',
          strong: '#C9CEDA',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F7F3EC', // warm tint — sits between white and the nude band
        },
      },

      fontFamily: {
        /* §6.1 — Inter for Latin, IRANSansX→Vazirmatn for Persian */
        sans: ['var(--font-latin)', 'Arial', 'Helvetica', 'sans-serif'],
        fa: ['IRANSansX', 'var(--font-fa)', 'IRANYekan', 'sans-serif'],
        display: ['var(--font-latin)', 'Arial', 'Helvetica', 'sans-serif'],
      },

      /**
       * §6.2 / §6.3 Type scale. Desktop values with the documented mobile
       * step-down expressed as clamp() so the ramp is continuous.
       * Persian overrides live in globals.css.
       */
      fontSize: {
        label: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }], // 14/20 Medium
        body: ['clamp(1rem, 0.9rem + 0.5vw, 1.125rem)', { lineHeight: '1.667' }], // 16→18 / 30
        h3: ['clamp(1.375rem, 1.3rem + 0.35vw, 1.5rem)', { lineHeight: '1.333', fontWeight: '600' }], // 22→24 / 32
        h2: ['clamp(1.75rem, 1.4rem + 1.4vw, 2.25rem)', { lineHeight: '1.222', fontWeight: '700' }], // 28→36 / 44
        h1: ['clamp(2.25rem, 1.85rem + 1.7vw, 3rem)', { lineHeight: '1.167', fontWeight: '700' }], // 36→48 / 56
        display: ['clamp(2.5rem, 1.5rem + 4.2vw, 4rem)', { lineHeight: '1.125', fontWeight: '700' }], // 40→64 / 72
      },

      /* §7.2 Maximum widths */
      maxWidth: {
        container: '1200px',
        reading: '760px',
      },

      /* §7.4 Spacing scale — 4px base */
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        6: '24px',
        8: '32px',
        12: '48px',
        16: '64px',
      },

      /* §8.1 Radius */
      borderRadius: {
        control: '8px',
        button: '12px',
        card: '16px',
        feature: '24px',
        full: '999px',
      },

      /* §8.2 Elevation */
      boxShadow: {
        card: '0 4px 16px rgba(22, 33, 62, 0.08)',
        popover: '0 12px 32px rgba(22, 33, 62, 0.14)',
        modal: '0 24px 64px rgba(22, 33, 62, 0.20)',
      },

      /* §17 Motion. Four tiers, matched to what is moving:
         micro = state feedback, standard = a card or menu, reveal = a section
         entering, diagram = an explanatory drawing that has to be followed. */
      transitionDuration: {
        micro: '180ms',
        standard: '280ms',
        emphasis: '360ms',
        reveal: '560ms',
        diagram: '800ms',
        /* kept so existing call sites keep compiling */
        narrative: '320ms',
      },
      transitionTimingFunction: {
        /* Decelerating; motion arrives rather than snaps. */
        standard: 'cubic-bezier(0.22, 1, 0.36, 1)',
        exit: 'cubic-bezier(0.4, 0, 1, 1)',
      },
      keyframes: {
        'rs-rise': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'rs-fade': { from: { opacity: '0' }, to: { opacity: '1' } },
        'rs-draw': { from: { strokeDashoffset: '1' }, to: { strokeDashoffset: '0' } },
      },
      animation: {
        'rs-rise': 'rs-rise 560ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'rs-fade': 'rs-fade 360ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },

      letterSpacing: {
        label: '0.08em',
      },
    },
  },
  plugins: [],
};

export default config;
