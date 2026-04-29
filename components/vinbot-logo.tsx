/** Minimalistisk logo til header: geometrisk robot der holder et vinglas (kun konturer). */
export function VinbotLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <g stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        {/* Robot: krop/hoved */}
        <rect x="5" y="10.5" width="12" height="13.5" rx="2.75" ry="2.75" />
        {/* Antenne */}
        <path d="M11 10.5V7" />
        <circle cx="11" cy="5.35" r="1.15" />
        {/* Øjne */}
        <circle cx="9.35" cy="15.25" r="1.15" fill="currentColor" stroke="none" />
        <circle cx="12.65" cy="15.25" r="1.15" fill="currentColor" stroke="none" />
        {/* Smil */}
        <path d="M8.85 17.5q2.15-1.05 4.3 0" />
        {/* Arm → glas */}
        <path d="M17 15.85 Q19 14.75 21.4 14.6" />
        {/* Vinglas (kop + stilk + fod) */}
        <path d="M21.5 11.5L21.5 14Q24.5 16.5 27.5 14L27.5 11.5" />
        <path d="M24.5 16.5v6" />
        <path d="M22.25 23h4.5" />
      </g>
    </svg>
  );
}
