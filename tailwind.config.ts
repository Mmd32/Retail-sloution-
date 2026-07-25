import type { Config } from 'tailwindcss';

/**
 * Design tokens for Retail Solutions.
 *
 * These roles are derived from the approved brand identity:
 *  - Deep navy typography, bright cyan-blue accent, white / very light
 *    cool-gray surfaces. Values live here as the single source of truth and
 *    are also exposed as CSS custom properties in globals.css so they can be
 *    themed from a CMS later without a rebuild.
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
        navy: {
          DEFAULT: '#0B1F3A',
          50: '#F2F5FA',
          100: '#E1E8F2',
          200: '#C2CEDF',
          300: '#8FA3BF',
          400: '#5E7495',
          500: '#37507A',
          600: '#22375C',
          700: '#14264A',
          800: '#0B1F3A',
          900: '#07162B',
        },
        accent: {
          DEFAULT: '#0AA2DE',
          50: '#EAF8FE',
          100: '#CBEEFB',
          200: '#93DCF6',
          300: '#4FC4EE',
          400: '#1FAEE4',
          500: '#0AA2DE',
          600: '#0782B5',
          700: '#08678F',
          800: '#0B5473',
          900: '#0E4760',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F4F6F9',
          sunken: '#EDF1F6',
        },
        ink: {
          DEFAULT: '#0A1526',
          muted: '#5B6B7F',
          faint: '#8C99A8',
        },
        line: {
          DEFAULT: '#E3E8EF',
          strong: '#CBD4DF',
        },
      },
      fontFamily: {
        sans: ['var(--font-latin)', 'system-ui', 'sans-serif'],
        fa: ['var(--font-fa)', 'Tahoma', 'sans-serif'],
        display: ['var(--font-latin)', 'system-ui', 'sans-serif'],
      },
      /**
       * One fluid type scale for the whole site. Sizes interpolate with the
       * viewport so there are no jarring breakpoint jumps. Line-height and
       * tracking are baked in for Latin; globals.css relaxes both for Persian,
       * which needs more leading and never takes negative tracking.
       */
      fontSize: {
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.14em', fontWeight: '600' }],
        small: ['0.875rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.65' }],
        lead: ['clamp(1.05rem, 0.95rem + 0.5vw, 1.25rem)', { lineHeight: '1.6' }],
        h3: ['clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem)', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        h2: ['clamp(1.75rem, 1.35rem + 1.7vw, 2.5rem)', { lineHeight: '1.14', letterSpacing: '-0.022em' }],
        h1: ['clamp(2.1rem, 1.5rem + 2.6vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.028em' }],
        display: ['clamp(2.6rem, 1.6rem + 4.2vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
      },
      maxWidth: {
        container: '1240px',
        prose: '68ch',
      },
      borderRadius: {
        xs: '3px',
        sm: '5px',
        DEFAULT: '7px',
        lg: '10px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11, 31, 58, 0.04), 0 8px 24px rgba(11, 31, 58, 0.06)',
        lift: '0 12px 40px rgba(11, 31, 58, 0.12)',
      },
      letterSpacing: {
        eyebrow: '0.14em',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
