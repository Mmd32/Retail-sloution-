import type { Config } from 'tailwindcss';

/**
 * Retail Solutions — Brand & Digital Design System v1.0
 *
 * Every value below is taken from the approved system. Do not introduce raw
 * values in components; add a token here instead (see §13.4 Token governance).
 */
/** A colour stored as RGB channels in a CSS variable, so `/alpha` still works. */
const v = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

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
        /* Surfaces are CSS variables (globals.css) so light/dark swap in one
           place. `fog` and `nude` are kept as aliases of the sunken band. */
        paper: v('paper'),
        sunken: v('sunken'),
        fog: v('sunken'),
        nude: v('sunken'),

        /* §5.3 Extended palette */
        functional: {
          DEFAULT: v('action'), // links, focus, primary buttons
          hover: v('action-hover'),
        },
        'on-action': v('on-action'),
        capability: '#18B6A4',
        decision: '#F2B544',
        human: '#E85D75',
        insight: '#5B5BD6',

        /* Studio direction */
        cream: '#FEFBE3',

        /* §5.4 Semantic */
        success: '#2D9D78',
        warning: '#F2B544',
        error: '#D94A56',
        info: '#007DAA',

        /* Callout surfaces §14.4 */
        callout: {
          info: v('callout-info'),
          attention: v('callout-attention'),
          success: v('callout-success'),
          critical: v('callout-critical'),
        },

        /* Text + surfaces — all theme-aware */
        ink: {
          DEFAULT: v('ink'),
          muted: v('ink-2'),
          faint: v('ink-3'),
        },
        line: {
          DEFAULT: v('line'),
          strong: v('line-strong'),
        },
        surface: {
          DEFAULT: v('surface'),
          muted: v('surface-muted'),
        },
      },

      fontFamily: {
        sans: ['var(--font-latin)', 'Arial', 'Helvetica', 'sans-serif'],
        fa: ['var(--font-fa)', 'Tahoma', 'sans-serif'],
        display: ['var(--font-latin)', 'Arial', 'Helvetica', 'sans-serif'],
        mono: ['var(--font-mono)', 'var(--font-fa)', 'monospace'],
      },

      /**
       * §6.2 / §6.3 Type scale. Desktop values with the documented mobile
       * step-down expressed as clamp() so the ramp is continuous.
       * Persian overrides live in globals.css.
       */
      fontSize: {
        /* Small steps raised one notch: long stretches of 12–14px grey text read
           as thin and low-hierarchy, especially in Persian. */
        xs: ['0.8125rem', { lineHeight: '1.25rem' }], // 13/20 (was 12/16)
        sm: ['0.9375rem', { lineHeight: '1.5rem' }], // 15/24 (was 14/20)
        label: ['0.9375rem', { lineHeight: '1.5rem', fontWeight: '500' }], // 15/24 Medium (was 14/20)
        body: ['clamp(1rem, 0.9rem + 0.5vw, 1.125rem)', { lineHeight: '1.667' }], // 16→18 / 30
        h3: ['clamp(1.25rem, 1.18rem + 0.35vw, 1.5rem)', { lineHeight: '1.35', fontWeight: '400' }], // 20→24
        h2: ['clamp(1.875rem, 1.45rem + 1.7vw, 2.75rem)', { lineHeight: '1.2', fontWeight: '300', letterSpacing: '-0.01em' }], // 30→44, light
        h1: ['clamp(2.25rem, 1.7rem + 2.2vw, 3.5rem)', { lineHeight: '1.15', fontWeight: '300', letterSpacing: '-0.015em' }], // 36→56, light
        display: ['clamp(2.5rem, 1.5rem + 4vw, 4.5rem)', { lineHeight: '1.08', fontWeight: '300', letterSpacing: '-0.02em' }], // 40→72, light
      },

      /* §7.2 Maximum widths */
      maxWidth: {
        container: '1280px',
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
        control: '4px',
        button: '999px', // pill
        card: '8px',
        feature: '8px',
        full: '999px',
      },

      /* §8.2 Elevation */
      boxShadow: {
        card: '0 1px 2px rgb(var(--c-shadow) / 0.06), 0 8px 24px -12px rgb(var(--c-shadow) / 0.18)',
        popover: '0 2px 4px rgb(var(--c-shadow) / 0.06), 0 24px 48px -16px rgb(var(--c-shadow) / 0.28)',
        modal: '0 32px 80px -16px rgb(var(--c-shadow) / 0.40)',
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
