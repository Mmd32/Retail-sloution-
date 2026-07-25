/**
 * The hero thesis, drawn: one governing system at the centre, standardized
 * stores on the network, a controlled expansion boundary. Rendered on a navy
 * panel so it reads as a deliberate visual block rather than a thin diagram
 * floating in grey.
 *
 * Pure CSS/SVG with a single short entrance — no per-node stagger, so the
 * composition settles in well under a second.
 */
export function HeroVisual() {
  const nodes = [
    { x: 92, y: 74 },
    { x: 268, y: 58 },
    { x: 330, y: 178 },
    { x: 268, y: 292 },
    { x: 96, y: 282 },
    { x: 44, y: 180 },
  ];
  const c = { x: 190, y: 178 };

  return (
    <div className="media-frame animate-rise rounded-card" style={{ animationDelay: '160ms' }}>
      <svg viewBox="0 0 380 356" className="w-full" role="img" aria-hidden>
        <defs>
          <radialGradient id="rs-hub" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#4FC4EE" />
            <stop offset="100%" stopColor="#0782B5" />
          </radialGradient>
        </defs>

        {/* controlled expansion boundary */}
        <circle cx={c.x} cy={c.y} r="150" fill="none" stroke="#22375C" strokeDasharray="3 7" />
        <circle cx={c.x} cy={c.y} r="108" fill="none" stroke="#14264A" />

        {/* system connections */}
        {nodes.map((n, i) => (
          <line key={`l-${i}`} x1={c.x} y1={c.y} x2={n.x} y2={n.y} stroke="#37507A" strokeWidth="1.5" />
        ))}

        {/* standardized store nodes — identical by design */}
        {nodes.map((n, i) => (
          <g key={`n-${i}`}>
            <circle cx={n.x} cy={n.y} r="19" fill="#0B1F3A" stroke="#37507A" strokeWidth="1.5" />
            <rect
              x={n.x - 7}
              y={n.y - 6}
              width="14"
              height="12"
              rx="1.5"
              fill="none"
              stroke="#8FA3BF"
              strokeWidth="1.6"
            />
            <path d={`M${n.x - 9} ${n.y - 6} h18`} stroke="#0AA2DE" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        ))}

        {/* governing hub: leadership + analytics */}
        <circle cx={c.x} cy={c.y} r="42" fill="url(#rs-hub)" />
        <circle cx={c.x} cy={c.y} r="42" fill="none" stroke="#93DCF6" strokeOpacity="0.35" strokeWidth="1.5" />
        <g stroke="#fff" strokeWidth="3" strokeLinecap="round">
          <line x1={c.x - 13} y1={c.y + 11} x2={c.x - 13} y2={c.y - 1} />
          <line x1={c.x} y1={c.y + 11} x2={c.x} y2={c.y - 12} />
          <line x1={c.x + 13} y1={c.y + 11} x2={c.x + 13} y2={c.y + 3} />
        </g>
      </svg>
    </div>
  );
}
