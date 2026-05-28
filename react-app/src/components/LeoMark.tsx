export default function LeoMark() {
  return (
    <div className="relative w-[440px] max-w-[55vw] select-none">
      <svg
        viewBox="0 0 520 260"
        className="w-full overflow-visible"
        aria-label="LEO identity mark"
      >
        <defs>
          {/* subtle letter glow */}
          <filter id="hudGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2" result="b1" />
            <feGaussianBlur stdDeviation="6" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* flare line gradient */}
          <linearGradient id="flareLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(180,215,255,0)" />
            <stop offset="40%" stopColor="rgba(210,235,255,0.22)" />
            <stop offset="50%" stopColor="rgba(235,248,255,0.32)" />
            <stop offset="60%" stopColor="rgba(210,235,255,0.22)" />
            <stop offset="100%" stopColor="rgba(180,215,255,0)" />
          </linearGradient>

          {/* tiny dot flare */}
          <radialGradient id="dotFlare" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(240,250,255,0.7)" />
            <stop offset="100%" stopColor="rgba(180,220,255,0)" />
          </radialGradient>
        </defs>

        {/* thin horizontal flare line */}
        <rect
          x="40"
          y="104"
          width="440"
          height="1"
          fill="url(#flareLine)"
          opacity="0.3"
        />

        {/* tiny flare dots at intersections */}
        <circle cx="128" cy="104" r="8" fill="url(#dotFlare)" opacity="0.35" />
        <circle cx="388" cy="104" r="10" fill="url(#dotFlare)" opacity="0.4" />

        {/* LEO letterforms */}
        <g
          filter="url(#hudGlow)"
          stroke="rgba(220,240,255,0.82)"
          strokeWidth="4.5"
          strokeLinecap="square"
          fill="none"
        >
          {/* L */}
          <line x1="88" y1="42" x2="88" y2="166" />
          <line x1="88" y1="166" x2="168" y2="166" />

          {/* E — three bars */}
          <line x1="208" y1="48" x2="318" y2="48" />
          <line x1="208" y1="104" x2="318" y2="104" />
          <line x1="208" y1="160" x2="318" y2="160" />

          {/* O — diameter ≈ 85% of E height (E spans 48..160 = 112, 85% ≈ 95, r ≈ 48) */}
          <circle cx="408" cy="104" r="48" />
        </g>

        {/* faint inner glow on L vertical + O */}
        <g opacity="0.2" filter="url(#hudGlow)">
          <line
            x1="88"
            y1="42"
            x2="88"
            y2="166"
            stroke="rgba(170,210,255,0.6)"
            strokeWidth="10"
          />
          <circle
            cx="408"
            cy="104"
            r="48"
            stroke="rgba(170,210,255,0.35)"
            strokeWidth="10"
            fill="none"
          />
        </g>

        {/* Chinese name */}
        <text
          x="260"
          y="210"
          textAnchor="middle"
          style={{
            fontSize: '23px',
            fontWeight: 300,
            letterSpacing: '0.18em',
            fill: 'rgba(225,240,252,0.82)',
            fontFamily: '"Noto Sans SC", "PingFang SC", sans-serif',
            filter: 'drop-shadow(0 0 6px rgba(180,220,255,0.3))',
          }}
        >
          乐洋
        </text>

        {/* divider */}
        <line
          x1="195"
          y1="226"
          x2="325"
          y2="226"
          stroke="rgba(170,205,235,0.2)"
          strokeWidth="0.5"
        />
        <circle
          cx="260"
          cy="226"
          r="1.5"
          fill="rgba(220,240,255,0.7)"
          filter="url(#hudGlow)"
        />

        {/* Chinese subtitle */}
        <text
          x="260"
          y="243"
          textAnchor="middle"
          style={{
            fontSize: '12px',
            fontWeight: 300,
            letterSpacing: '0.2em',
            fill: 'rgba(195,220,240,0.6)',
            fontFamily: '"Noto Sans SC", "PingFang SC", sans-serif',
          }}
        >
          AI 学习者 · 构建者 · 探索者
        </text>

        {/* English subtitle */}
        <text
          x="260"
          y="258"
          textAnchor="middle"
          style={{
            fontSize: '9px',
            letterSpacing: '0.42em',
            fill: 'rgba(175,205,230,0.5)',
            fontFamily: '"JetBrains Mono", "IBM Plex Mono", monospace',
          }}
        >
          BUILDER · AI NATIVE · EARLY RISER
        </text>
      </svg>
    </div>
  );
}
