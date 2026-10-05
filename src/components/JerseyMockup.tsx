import React from 'react';
import { Jersey } from '../types/jersey';

interface JerseyMockupProps {
  jersey: Jersey;
  view?: 'front' | 'back';
  customName?: string;
  customNumber?: string;
  fontStyle?: 'modern' | 'retro-block' | 'continental';
  sleeveBadge?: string;
  className?: string;
}

export const JerseyMockup: React.FC<JerseyMockupProps> = ({
  jersey,
  view = 'back',
  customName,
  customNumber,
  fontStyle = 'modern',
  sleeveBadge,
  className = 'w-full h-full max-h-[420px]',
}) => {
  const { primaryColor, secondaryColor, accentColor, textColor, pattern, club } = jersey;

  // Render font family selection based on style
  const getNumberFont = () => {
    switch (fontStyle) {
      case 'retro-block':
        return 'var(--font-jersey), sans-serif';
      case 'continental':
        return 'serif';
      case 'modern':
      default:
        return 'var(--font-display), sans-serif';
    }
  };

  const nameToDisplay = (customName || (jersey.playerPresets[0]?.name ?? 'PLAYER')).toUpperCase();
  const numberToDisplay = customNumber || (jersey.playerPresets[0]?.number?.toString() ?? '10');

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 500 560"
        className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle fabric mesh pattern */}
          <pattern id={`mesh-${jersey.id}`} width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="0.6" fill="#000000" fillOpacity="0.08" />
          </pattern>

          {/* Vertical Stripes Pattern */}
          <pattern id={`stripes-${jersey.id}`} width="50" height="500" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="25" height="500" fill={primaryColor} />
            <rect x="25" y="0" width="25" height="500" fill={secondaryColor} />
          </pattern>

          {/* Pinstripes Pattern */}
          <pattern id={`pinstripes-${jersey.id}`} width="28" height="500" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="28" height="500" fill={primaryColor} />
            <rect x="13" y="0" width="2" height="500" fill={secondaryColor} />
          </pattern>

          {/* Chevrons Pattern */}
          <pattern id={`chevrons-${jersey.id}`} width="60" height="40" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="60" height="40" fill={primaryColor} />
            <path d="M 0 10 L 30 30 L 60 10 L 60 20 L 30 40 L 0 20 Z" fill={secondaryColor} />
          </pattern>

          {/* Lighting overlay for realism */}
          <linearGradient id="bodyShade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.32" />
            <stop offset="12%" stopColor="#000000" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.12" />
            <stop offset="88%" stopColor="#000000" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.32" />
          </linearGradient>

          {/* Sleeve shadow */}
          <linearGradient id="sleeveLeft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="sleeveRight" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
          </linearGradient>

          {/* Number shadow */}
          <filter id="vinylDrop" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* --- MAIN TORSO OUTLINE PATH --- */}
        {/* Left Sleeve */}
        <path
          d="M 160 85 L 30 185 L 75 250 L 140 185 Z"
          fill={primaryColor}
          stroke="#000000"
          strokeOpacity="0.2"
          strokeWidth="1.5"
        />
        <path d="M 160 85 L 30 185 L 75 250 L 140 185 Z" fill="url(#sleeveLeft)" />
        {/* Left Sleeve Cuff Trim */}
        <polygon points="30,185 75,250 83,238 42,175" fill={accentColor} />

        {/* Right Sleeve */}
        <path
          d="M 340 85 L 470 185 L 425 250 L 360 185 Z"
          fill={primaryColor}
          stroke="#000000"
          strokeOpacity="0.2"
          strokeWidth="1.5"
        />
        <path d="M 340 85 L 470 185 L 425 250 L 360 185 Z" fill="url(#sleeveRight)" />
        {/* Right Sleeve Cuff Trim */}
        <polygon points="470,185 425,250 417,238 458,175" fill={accentColor} />

        {/* Optional Right Sleeve Badge */}
        {sleeveBadge && (
          <g transform="translate(425, 205)">
            <circle cx="0" cy="0" r="14" fill="#1A1F2C" stroke="#D4AF37" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="10" fill="#242B38" />
            <text x="0" y="3" fill="#D4AF37" fontSize="7" fontWeight="bold" textAnchor="middle">★</text>
          </g>
        )}

        {/* Main Body Shell */}
        <path
          id="mainBody"
          d="M 160 85 
             C 200 95, 300 95, 340 85 
             L 375 195 
             L 360 490 
             C 310 500, 190 500, 140 490 
             L 125 195 
             Z"
          fill={
            pattern === 'stripes'
              ? `url(#stripes-${jersey.id})`
              : pattern === 'pinstripes'
              ? `url(#pinstripes-${jersey.id})`
              : pattern === 'chevrons'
              ? `url(#chevrons-${jersey.id})`
              : pattern === 'half'
              ? primaryColor
              : primaryColor
          }
        />

        {/* Half and half pattern split if applicable */}
        {pattern === 'half' && (
          <path
            d="M 250 90 L 340 85 L 375 195 L 360 490 C 310 498, 260 498, 250 496 Z"
            fill={secondaryColor}
          />
        )}

        {/* Fabric mesh texture overlay */}
        <path
          d="M 160 85 C 200 95, 300 95, 340 85 L 375 195 L 360 490 C 310 500, 190 500, 140 490 L 125 195 Z"
          fill={`url(#mesh-${jersey.id})`}
        />

        {/* Athletic body shading & curvature depth */}
        <path
          d="M 160 85 C 200 95, 300 95, 340 85 L 375 195 L 360 490 C 310 500, 190 500, 140 490 L 125 195 Z"
          fill="url(#bodyShade)"
          stroke="#000000"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />

        {/* Bottom Hem Seam Line */}
        <path
          d="M 140 482 C 190 492, 310 492, 360 482"
          fill="none"
          stroke="#000000"
          strokeOpacity="0.2"
          strokeWidth="2"
          strokeDasharray="4 2"
        />

        {/* Aerodynamic Flank Ventilation Stripes (Player Issue trait) */}
        {jersey.edition === 'Matchday Player Issue' && (
          <g opacity="0.45">
            <path d="M 134 220 L 146 470" stroke={accentColor} strokeWidth="3" strokeDasharray="6 3" />
            <path d="M 366 220 L 354 470" stroke={accentColor} strokeWidth="3" strokeDasharray="6 3" />
          </g>
        )}

        {/* --- COLLAR DESIGN --- */}
        {view === 'back' ? (
          // BACK VIEW COLLAR
          <g>
            <path
              d="M 195 89 C 220 102, 280 102, 305 89 C 290 80, 210 80, 195 89 Z"
              fill={accentColor}
              stroke="#000000"
              strokeOpacity="0.25"
            />
            {/* Small subtle team motto or flag on back neck */}
            <rect x="242" y="100" width="16" height="8" rx="1.5" fill={accentColor} stroke="#000000" strokeWidth="0.5" />
            <text x="250" y="106" fill={primaryColor} fontSize="5" fontWeight="bold" textAnchor="middle">
              {club.slice(0, 3).toUpperCase()}
            </text>
          </g>
        ) : (
          // FRONT VIEW COLLAR & PLACKET
          <g>
            <path
              d="M 195 89 C 220 135, 280 135, 305 89 C 285 110, 215 110, 195 89 Z"
              fill={accentColor}
              stroke="#000000"
              strokeOpacity="0.2"
            />
            <path
              d="M 215 110 C 235 130, 265 130, 285 110"
              fill="none"
              stroke="#000000"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
          </g>
        )}

        {/* --- FRONT VIEW CONTENT --- */}
        {view === 'front' && (
          <g>
            {/* Club Crest (Left Chest) */}
            <g transform="translate(200, 160)">
              <rect x="-16" y="-20" width="32" height="40" rx="6" fill={secondaryColor} stroke={accentColor} strokeWidth="2" />
              <path d="M -16 5 Q 0 25 16 5" fill={accentColor} opacity="0.3" />
              <circle cx="0" cy="-6" r="8" fill={primaryColor} />
              <text x="0" y="-3" fill={textColor} fontSize="8" fontWeight="bold" textAnchor="middle">
                {club.substring(0, 3).toUpperCase()}
              </text>
              <text x="0" y="14" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">★</text>
            </g>

            {/* Manufacturer Swoosh/Crest (Right Chest) */}
            <g transform="translate(300, 155)">
              <path d="M -14 6 C -8 -2, 6 -6, 12 -4 C 4 2, -4 8, -14 6 Z" fill={accentColor} />
            </g>

            {/* Front Sponsor / Matchday Detail */}
            <g transform="translate(250, 270)">
              <rect x="-65" y="-18" width="130" height="36" rx="4" fill="none" />
              <text
                x="0"
                y="6"
                fill={secondaryColor === primaryColor ? accentColor : secondaryColor}
                fontSize="20"
                fontFamily="var(--font-display), sans-serif"
                fontWeight="800"
                letterSpacing="3"
                textAnchor="middle"
              >
                {club.includes('Madrid') ? 'EMIRATES' : club.includes('Arsenal') ? 'JVC' : club.includes('Milan') ? 'OPEL' : club.includes('Barca') ? 'SPOTIFY' : club.includes('United') ? 'SHARP' : 'AUTHENTIC'}
              </text>
              <text x="0" y="20" fill={accentColor} fontSize="7" letterSpacing="4" textAnchor="middle" opacity="0.9">
                FLY BETTER
              </text>
            </g>

            {/* Authentic Tag at Lower Hem */}
            <g transform="translate(155, 455)">
              <rect x="0" y="0" width="22" height="15" rx="1" fill="#D4AF37" />
              <text x="11" y="9" fill="#000000" fontSize="5" fontWeight="bold" textAnchor="middle">PRO</text>
              <text x="11" y="13" fill="#000000" fontSize="3.5" textAnchor="middle">AUTHENTIC</text>
            </g>
          </g>
        )}

        {/* --- BACK VIEW CONTENT (CUSTOM NAME & NUMBER) --- */}
        {view === 'back' && (
          <g>
            {/* Player Name with curved baseline effect */}
            <g transform="translate(250, 172)">
              <text
                x="0"
                y="0"
                fill={textColor}
                fontSize={nameToDisplay.length > 9 ? '26' : '32'}
                fontFamily="var(--font-display), sans-serif"
                fontWeight="800"
                letterSpacing={nameToDisplay.length > 8 ? '4' : '6'}
                textAnchor="middle"
                filter="url(#vinylDrop)"
              >
                {nameToDisplay}
              </text>
            </g>

            {/* Squad Number */}
            <g transform="translate(250, 310)">
              <text
                x="0"
                y="0"
                fill={textColor}
                fontSize="125"
                fontFamily={getNumberFont()}
                fontWeight="900"
                letterSpacing="1"
                textAnchor="middle"
                filter="url(#vinylDrop)"
              >
                {numberToDisplay}
              </text>
              {/* Micro team emblem badge at base of squad number (authentic league printing detail) */}
              <circle cx="0" cy="8" r="6" fill={accentColor} stroke="#000000" strokeWidth="0.8" />
              <text x="0" y="10.5" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">
                {club.charAt(0)}
              </text>
            </g>

            {/* Lower Back Sponsor or Club Motto */}
            <g transform="translate(250, 420)">
              <text
                x="0"
                y="0"
                fill={accentColor}
                fontSize="9"
                fontFamily="var(--font-display), sans-serif"
                fontWeight="700"
                letterSpacing="3"
                opacity="0.85"
                textAnchor="middle"
              >
                {club.includes('Barca') ? 'UNICEF' : club.includes('Madrid') ? 'HALA MADRID' : club.includes('Liv') ? 'YOU\'LL NEVER WALK ALONE' : 'OFFICIAL SQUAD EDITION'}
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
