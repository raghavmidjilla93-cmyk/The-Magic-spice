export default function TMSLogo({ size = 56, showText = true }: { size?: number; showText?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {/* Circular emblem */}
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer ring */}
        <circle cx="60" cy="60" r="57" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
        <circle cx="60" cy="60" r="52" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.5" />

        {/* Curved top text: THE MAGIC SPICE */}
        <path id="topArc" d="M 15,60 A 45,45 0 0,1 105,60" fill="none" />
        <text fontSize="8" fill="#D4AF37" fontFamily="Poppins,sans-serif" fontWeight="600" letterSpacing="3">
          <textPath href="#topArc" startOffset="50%" textAnchor="middle">THE MAGIC SPICE</textPath>
        </text>

        {/* Curved bottom text: MULTI CUISINE RESTAURANT */}
        <path id="bottomArc" d="M 18,68 A 42,42 0 0,0 102,68" fill="none" />
        <text fontSize="5.5" fill="#D4AF37" fontFamily="Poppins,sans-serif" letterSpacing="1.5" opacity="0.85">
          <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">MULTI CUISINE RESTAURANT</textPath>
        </text>

        {/* Horizontal decorative lines */}
        <line x1="22" y1="62" x2="40" y2="62" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6" />
        <line x1="80" y1="62" x2="98" y2="62" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6" />

        {/* Fork — left */}
        <g transform="translate(28, 36)" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.9">
          <line x1="0" y1="0" x2="0" y2="20" />
          <line x1="-3" y1="0" x2="-3" y2="8" />
          <line x1="3" y1="0" x2="3" y2="8" />
          <path d="M-3,8 Q0,11 3,8" />
        </g>

        {/* Spoon — right */}
        <g transform="translate(92, 36)" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.9">
          <line x1="0" y1="7" x2="0" y2="20" />
          <ellipse cx="0" cy="4" rx="3" ry="4" />
        </g>

        {/* Flame icon — center top */}
        <g transform="translate(60, 28)" fill="#D4AF37">
          <path d="M0,-8 C-2,-5 -5,-3 -4,1 C-3,4 0,5 0,5 C0,5 3,4 4,1 C5,-3 2,-5 0,-8Z" opacity="0.95" />
          <path d="M0,-3 C-1,-1 -2,0 -1.5,2 C-1,3 0,3.5 0,3.5 C0,3.5 1,3 1.5,2 C2,0 1,-1 0,-3Z" fill="#0A0A0A" opacity="0.4" />
        </g>

        {/* TMS letters */}
        <text x="60" y="58" textAnchor="middle" fontSize="16" fontWeight="700"
              fill="#D4AF37" fontFamily="Playfair Display,serif" letterSpacing="2">
          TMS
        </text>

        {/* Bottom ornament */}
        <g transform="translate(60, 72)" fill="#D4AF37" opacity="0.7">
          <rect x="-12" y="0" width="24" height="0.8" />
          <polygon points="0,-3 2,0 -2,0" />
        </g>
      </svg>

      {/* Word mark */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-bold tracking-[0.15em] uppercase text-white"
                style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.05rem' }}>
            The Magic Spice
          </span>
          <span className="tracking-[0.3em] uppercase text-[0.55rem] mt-0.5"
                style={{ fontFamily: 'Poppins,sans-serif', color: '#D4AF37' }}>
            Multi Cuisine Restaurant
          </span>
        </div>
      )}
    </div>
  );
}
