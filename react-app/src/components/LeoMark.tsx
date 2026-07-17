export default function LeoMark() {
  return (
    <div className="leo-mark">
      <svg viewBox="0 0 520 260" aria-label="LEO identity mark" role="img">
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
          className="lm-fadein lm-flare"
          x="40"
          y="104"
          width="440"
          height="1"
          fill="url(#flareLine)"
        />

        {/* tiny flare dots at intersections */}
        <circle className="lm-fadein lm-dot-a" cx="128" cy="104" r="8" fill="url(#dotFlare)" />
        <circle className="lm-fadein lm-dot-b" cx="388" cy="104" r="10" fill="url(#dotFlare)" />

        {/* LEO letterforms — drawn in via stroke-dashoffset (see home.css) */}
        <g
          className="lm-g"
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

          {/* O */}
          <circle cx="408" cy="104" r="48" />
        </g>

        {/* faint inner glow on L vertical + O */}
        <g className="lm-inner" filter="url(#hudGlow)">
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
        <text className="lm-fadein lm-name" x="260" y="210" textAnchor="middle">
          乐洋
        </text>

        {/* divider */}
        <g className="lm-fadein lm-divider">
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
        </g>

        {/* Chinese subtitle */}
        <text className="lm-fadein lm-sub-zh" x="260" y="243" textAnchor="middle">
          AI 学习者 · 构建者 · 探索者
        </text>

        {/* English subtitle */}
        <text className="lm-fadein lm-sub-en" x="260" y="258" textAnchor="middle">
          BUILDER · AI NATIVE · EARLY RISER
        </text>
      </svg>
    </div>
  );
}
