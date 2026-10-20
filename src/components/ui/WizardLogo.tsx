/* Logo de mago (SVG próprio): chapéu laranja com ponta caída e estrela, rosto e barba branca. */
export function WizardLogo({ className = 'size-9' }: { className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-[10px] bg-surface ${className}`}>
      <svg viewBox="0 0 32 32" aria-hidden className="size-[78%]">
        <path d="M5 17.5h22l-3-2.2H8z" fill="#cc4a00" />
        <path d="M8 15.5 15 2.5c3.5 1 7 3.5 8.5 7.5l-3-1 3.5 6.5z" fill="#ff5c00" />
        <path d="m22.6 8.6 1.6 2.6 2.9-.4-1.5 2.3 1.5 2.4-2.8-.6" fill="#ff5c00" />
        <path d="m14 8 .7 1.6 1.7.2-1.3 1.1.4 1.7-1.5-.9-1.5.9.4-1.7-1.3-1.1 1.7-.2z" fill="#f5f5f2" />
        <rect x="10" y="17.5" width="12" height="5" rx="2" fill="#ffa366" />
        <circle cx="13.5" cy="19.8" r="0.9" fill="#0b0c10" />
        <circle cx="18.5" cy="19.8" r="0.9" fill="#0b0c10" />
        <path d="M9 21.5c1 5 4 9 7 9.5 3-.5 6-4.5 7-9.5-2 1.5-4.5 1.8-7 1.8S11 23 9 21.5z" fill="#f5f5f2" />
      </svg>
    </span>
  )
}
