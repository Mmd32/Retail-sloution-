'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Original "retail network" system visualization: a central leadership/analytics
 * hub connected to standardized store nodes, with a controlled expansion ring.
 * Pure inline SVG — no external assets, fully theme-aware, motion optional.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();

  const nodes = [
    { x: 60, y: 70 },
    { x: 250, y: 48 },
    { x: 340, y: 150 },
    { x: 300, y: 268 },
    { x: 120, y: 288 },
    { x: 36, y: 190 },
  ];
  const center = { x: 200, y: 168 };

  return (
    <div className="relative mx-auto w-full max-w-lg" aria-hidden>
      <svg viewBox="0 0 400 336" className="w-full" role="img">
        <defs>
          <radialGradient id="hub" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1FAEE4" />
            <stop offset="100%" stopColor="#0782B5" />
          </radialGradient>
        </defs>

        {/* expansion ring */}
        <circle cx={center.x} cy={center.y} r="150" fill="none" stroke="#E3E8EF" strokeDasharray="2 6" />

        {/* connections */}
        {nodes.map((n, i) => (
          <motion.line
            key={i}
            x1={center.x}
            y1={center.y}
            x2={n.x}
            y2={n.y}
            stroke="#8FA3BF"
            strokeWidth="1.25"
            initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
            animate={reduce ? undefined : { pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.15 * i, ease: 'easeOut' }}
          />
        ))}

        {/* store nodes */}
        {nodes.map((n, i) => (
          <motion.g
            key={`n-${i}`}
            initial={reduce ? undefined : { scale: 0, opacity: 0 }}
            animate={reduce ? undefined : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <circle cx={n.x} cy={n.y} r="16" fill="#fff" stroke="#CBD4DF" />
            <rect x={n.x - 6} y={n.y - 5} width="12" height="10" rx="1" fill="none" stroke="#37507A" strokeWidth="1.4" />
            <path d={`M${n.x - 7} ${n.y - 5} h14`} stroke="#0AA2DE" strokeWidth="1.8" />
          </motion.g>
        ))}

        {/* central hub */}
        <motion.g
          initial={reduce ? undefined : { scale: 0 }}
          animate={reduce ? undefined : { scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${center.x}px ${center.y}px` }}
        >
          <circle cx={center.x} cy={center.y} r="34" fill="url(#hub)" />
          <circle cx={center.x} cy={center.y} r="34" fill="none" stroke="#fff" strokeOpacity="0.25" />
          {/* simple analytics bars */}
          <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
            <line x1={center.x - 10} y1={center.y + 8} x2={center.x - 10} y2={center.y - 2} />
            <line x1={center.x} y1={center.y + 8} x2={center.x} y2={center.y - 8} />
            <line x1={center.x + 10} y1={center.y + 8} x2={center.x + 10} y2={center.y + 1} />
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
