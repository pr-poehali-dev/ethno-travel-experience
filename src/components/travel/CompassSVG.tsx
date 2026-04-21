export const CompassSVG = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
    <circle cx="60" cy="60" r="56" stroke="#c8941a" strokeWidth="1.5" strokeDasharray="4 3" />
    <circle cx="60" cy="60" r="48" stroke="#c8941a" strokeWidth="0.5" />
    <circle cx="60" cy="60" r="6" fill="#c8941a" />
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const inner = i % 3 === 0 ? 42 : 46;
      return (
        <line
          key={deg}
          x1={60 + inner * Math.sin(rad)}
          y1={60 - inner * Math.cos(rad)}
          x2={60 + 52 * Math.sin(rad)}
          y2={60 - 52 * Math.cos(rad)}
          stroke="#c8941a"
          strokeWidth={i % 3 === 0 ? "1.5" : "0.7"}
        />
      );
    })}
    <polygon points="60,12 56,58 64,58" fill="#8a1c1c" />
    <polygon points="60,108 56,62 64,62" fill="#2c1a0e" />
    <polygon points="12,60 58,56 58,64" fill="#2c1a0e" />
    <polygon points="108,60 62,56 62,64" fill="#2c1a0e" />
    {[["С","N",0],["В","E",90],["Ю","S",180],["З","W",270]].map(([ru,,deg]) => {
      const rad = ((+deg) * Math.PI) / 180;
      const r = 36;
      return (
        <text
          key={ru}
          x={60 + r * Math.sin(rad)}
          y={60 - r * Math.cos(rad) + 5}
          textAnchor="middle"
          fontSize="9"
          fontFamily="Cormorant Garamond, serif"
          fontWeight="600"
          fill="#2c1a0e"
        >{ru}</text>
      );
    })}
  </svg>
);

export const MapDotSVG = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
    <circle cx="12" cy="12" r="4" fill={color} />
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1" fill="none" opacity="0.4" />
    <circle cx="12" cy="12" r="11" stroke={color} strokeWidth="0.5" fill="none" opacity="0.2" />
  </svg>
);
