import React from 'react';

interface CoffeeIllustrationProps {
  type: 'pourover' | 'espresso' | 'coldbrew' | 'bean' | 'dessert' | 'voucher' | 'dripbag' | 'gear';
  accentColor?: string;
  className?: string;
}

export const CoffeeCardIllustration: React.FC<CoffeeIllustrationProps> = ({
  type,
  accentColor = '#c29054',
  className = 'w-full h-full',
}) => {
  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center select-none ${className}`}
      style={{
        background: `radial-gradient(circle at 50% 40%, rgba(30, 24, 20, 0.95), rgba(12, 10, 9, 1))`,
      }}
    >
      {/* Background subtle woodgrain/concentric rings */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50%" cy="50%" r="40%" fill="none" stroke={accentColor} strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="50%" cy="50%" r="65%" fill="none" stroke={accentColor} strokeWidth="0.75" />
        <circle cx="50%" cy="50%" r="88%" fill="none" stroke={accentColor} strokeWidth="0.5" strokeDasharray="2 8" />
      </svg>

      {/* Specialty Type SVG illustrations */}
      {type === 'pourover' && (
        <div className="relative flex flex-col items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
          {/* Subtle steam */}
          <div className="flex gap-1.5 mb-1 opacity-60">
            <span className="w-1 h-4 rounded-full bg-amber-200/40 blur-[1px] animate-pulse" />
            <span className="w-1 h-6 rounded-full bg-amber-100/50 blur-[1px] animate-pulse delay-100" />
            <span className="w-1 h-3 rounded-full bg-amber-200/40 blur-[1px] animate-pulse delay-200" />
          </div>

          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pourGlass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#78350f" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="dripperGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5f0eb" />
                <stop offset="100%" stopColor="#d6cec5" />
              </linearGradient>
            </defs>

            {/* V60 Ceramic Dripper */}
            <path d="M30 25 L90 25 L75 62 L45 62 Z" fill="url(#dripperGrad)" stroke="#1c1917" strokeWidth="2" />
            {/* Ribs on dripper */}
            <line x1="40" y1="26" x2="48" y2="60" stroke="#b5aca1" strokeWidth="1.5" />
            <line x1="60" y1="26" x2="60" y2="60" stroke="#b5aca1" strokeWidth="1.5" />
            <line x1="80" y1="26" x2="72" y2="60" stroke="#b5aca1" strokeWidth="1.5" />

            {/* Dripper Base collar */}
            <rect x="36" y="62" width="48" height="5" rx="2" fill="#292524" />

            {/* Coffee Drops */}
            <circle cx="60" cy="74" r="3" fill="#f59e0b" className="animate-bounce" />

            {/* Glass Server/Carafe */}
            <path
              d="M44 76 L76 76 L86 106 C86 110 82 112 76 112 L44 112 C38 112 34 110 34 106 Z"
              fill="#1c1917"
              stroke="#57534e"
              strokeWidth="2"
            />
            {/* Liquid Amber Coffee */}
            <path d="M38 94 C48 93 72 93 82 94 L85 106 C85 109 82 110 76 110 L44 110 C38 110 35 109 35 106 Z" fill="url(#pourGlass)" />

            {/* Server Handle */}
            <path d="M86 82 C96 82 96 100 86 104" fill="none" stroke="#57534e" strokeWidth="3" strokeLinecap="round" />
            {/* Carafe spout */}
            <path d="M44 76 L39 73" stroke="#57534e" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {type === 'espresso' && (
        <div className="relative flex flex-col items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ceramic Saucer */}
            <ellipse cx="60" cy="98" rx="46" ry="10" fill="#26221f" stroke="#44403c" strokeWidth="2" />
            <ellipse cx="60" cy="97" rx="34" ry="6" fill="#1c1917" />

            {/* Ceramic Cup Body */}
            <path
              d="M28 48 C28 82 40 92 60 92 C80 92 92 82 92 48 Z"
              fill="#e7e0d8"
              stroke="#292524"
              strokeWidth="2"
            />
            {/* Cup Interior / Coffee Surface */}
            <ellipse cx="60" cy="48" rx="32" ry="12" fill="#451a03" stroke="#292524" strokeWidth="1.5" />
            <ellipse cx="60" cy="48" rx="30" ry="11" fill="#78350f" />

            {/* Latte Art (Rosetta / Tulip) */}
            <path
              d="M60 41 C54 44 54 48 60 52 C66 48 66 44 60 41 Z"
              fill="#fef3c7"
            />
            <path
              d="M60 48 C51 51 52 56 60 58 C68 56 69 51 60 48 Z"
              fill="#fef3c7"
            />
            <line x1="60" y1="40" x2="60" y2="58" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" />

            {/* Cup Handle */}
            <path
              d="M91 55 C104 55 104 75 90 77"
              fill="none"
              stroke="#e7e0d8"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      {type === 'coldbrew' && (
        <div className="relative flex flex-col items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="whiskeyCold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
            </defs>

            {/* Heavy Whiskey Rocks Glass */}
            <path
              d="M34 35 L40 102 C40 106 44 108 48 108 L72 108 C76 108 80 106 80 102 L86 35 Z"
              fill="#171412"
              stroke="#57534e"
              strokeWidth="2"
            />
            {/* Liquid */}
            <path
              d="M36 52 L40 102 C40 106 44 107 48 107 L72 107 C76 107 80 106 80 102 L84 52 Z"
              fill="url(#whiskeyCold)"
            />

            {/* Large Clear Ice Cube */}
            <rect
              x="48"
              y="58"
              width="24"
              height="24"
              rx="4"
              fill="#ffffff"
              fillOpacity="0.18"
              stroke="#ffffff"
              strokeOpacity="0.4"
              transform="rotate(12 60 70)"
            />
            {/* Dehydrated Orange Garnish slice */}
            <circle cx="72" cy="45" r="14" fill="#ea580c" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="72" cy="45" r="10" fill="#f97316" fillOpacity="0.8" />
            <line x1="72" y1="35" x2="72" y2="55" stroke="#ffedd5" strokeWidth="1" />
            <line x1="62" y1="45" x2="82" y2="45" stroke="#ffedd5" strokeWidth="1" />
          </svg>
        </div>
      )}

      {type === 'bean' && (
        <div className="relative flex flex-col items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="kraftBag" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#78593c" />
                <stop offset="100%" stopColor="#4a3523" />
              </linearGradient>
            </defs>

            {/* Standup Coffee Bag */}
            <path
              d="M34 26 L86 26 L92 98 C92 102 88 104 82 104 L38 104 C32 104 28 102 28 98 Z"
              fill="url(#kraftBag)"
              stroke="#291d14"
              strokeWidth="2"
            />
            {/* Top Seal Fold */}
            <rect x="32" y="24" width="56" height="8" rx="2" fill="#2d2016" stroke="#c29054" strokeWidth="1" />
            <line x1="34" y1="28" x2="86" y2="28" stroke="#a16207" strokeWidth="1" strokeDasharray="2 3" />

            {/* Minimalist Typographic Label */}
            <rect x="42" y="44" width="36" height="42" rx="2" fill="#fafaf9" />
            <line x1="47" y1="52" x2="73" y2="52" stroke="#292524" strokeWidth="2" />
            <line x1="47" y1="58" x2="68" y2="58" stroke="#78716c" strokeWidth="1.5" />
            <line x1="47" y1="64" x2="73" y2="64" stroke="#c29054" strokeWidth="1.5" />
            <circle cx="60" cy="74" r="4" fill="#a16207" />

            {/* Scattered Roasted Coffee Beans at base */}
            <ellipse cx="28" cy="100" rx="6" ry="4" fill="#29180c" transform="rotate(-20 28 100)" />
            <line x1="26" y1="99" x2="30" y2="101" stroke="#451a03" strokeWidth="1" />

            <ellipse cx="94" cy="98" rx="7" ry="4.5" fill="#3b2210" transform="rotate(35 94 98)" />
            <line x1="92" y1="98" x2="96" y2="98" stroke="#573014" strokeWidth="1" />
          </svg>
        </div>
      )}

      {type === 'dessert' && (
        <div className="relative flex flex-col items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ceramic Plate */}
            <ellipse cx="60" cy="94" rx="48" ry="12" fill="#221e1b" stroke="#443c36" strokeWidth="2" />
            <ellipse cx="60" cy="93" rx="38" ry="8" fill="#181513" />

            {/* Pound Cake Slice Triangular Prism */}
            <path
              d="M36 78 L78 68 L84 88 L42 98 Z"
              fill="#4d7c0f"
              stroke="#365314"
              strokeWidth="1.5"
            />
            {/* Top surface */}
            <path
              d="M36 56 L78 46 L78 68 L36 78 Z"
              fill="#65a30d"
              stroke="#365314"
              strokeWidth="1.5"
            />
            {/* Cake Side Face */}
            <path
              d="M78 46 L90 56 L90 78 L78 68 Z"
              fill="#3f6212"
              stroke="#365314"
              strokeWidth="1.5"
            />

            {/* White Glaze Drizzle */}
            <path
              d="M40 55 C48 58 52 52 62 55 C70 58 74 53 78 54"
              fill="none"
              stroke="#fefce8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Salted Caramel Drip */}
            <circle cx="56" cy="62" r="2.5" fill="#d97706" />
            <circle cx="68" cy="66" r="2" fill="#d97706" />
          </svg>
        </div>
      )}

      {type === 'voucher' && (
        <div className="relative flex flex-col items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="22" y="38" width="76" height="48" rx="6" fill="#1c1917" stroke="#c29054" strokeWidth="1.5" />
            <line x1="44" y1="38" x2="44" y2="86" stroke="#c29054" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="44" cy="38" r="4" fill="#0c0a09" stroke="#c29054" strokeWidth="1" />
            <circle cx="44" cy="86" r="4" fill="#0c0a09" stroke="#c29054" strokeWidth="1" />
            <text x="32" y="66" fill="#c29054" fontSize="16" fontWeight="bold" textAnchor="middle">
              券
            </text>
            <line x1="52" y1="52" x2="86" y2="52" stroke="#e7e5e4" strokeWidth="2" />
            <line x1="52" y1="60" x2="78" y2="60" stroke="#a8a29e" strokeWidth="1.5" />
            <line x1="52" y1="68" x2="82" y2="68" stroke="#d97706" strokeWidth="1.5" />
          </svg>
        </div>
      )}

      {type === 'dripbag' && (
        <div className="relative flex flex-col items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="30" width="60" height="68" rx="4" fill="#292524" stroke="#a8a29e" strokeWidth="1.5" />
            <rect x="36" y="26" width="48" height="6" rx="2" fill="#44403c" />
            <circle cx="60" cy="56" r="16" fill="none" stroke="#c29054" strokeWidth="1.5" />
            <path d="M54 56 L60 50 L66 56 L60 62 Z" fill="#c29054" />
            <text x="60" y="84" fill="#d6d3d1" fontSize="9" textAnchor="middle" letterSpacing="1">
              DRIP BAG
            </text>
          </svg>
        </div>
      )}

      {type === 'gear' && (
        <div className="relative flex flex-col items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Brass scoop */}
            <ellipse cx="76" cy="44" rx="18" ry="14" fill="#b45309" stroke="#f59e0b" strokeWidth="2" transform="rotate(-25 76 44)" />
            <ellipse cx="76" cy="44" rx="14" ry="10" fill="#78350f" transform="rotate(-25 76 44)" />
            {/* Long hammered handle */}
            <line x1="64" y1="52" x2="26" y2="96" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
            <circle cx="26" cy="96" r="3" fill="#fef3c7" />
          </svg>
        </div>
      )}
    </div>
  );
};
