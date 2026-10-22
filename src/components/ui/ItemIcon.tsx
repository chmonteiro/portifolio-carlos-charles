import html5 from 'devicon/icons/html5/html5-original.svg'
import css3 from 'devicon/icons/css3/css3-original.svg'
import tailwind from 'devicon/icons/tailwindcss/tailwindcss-original.svg'
import react from 'devicon/icons/react/react-original.svg'
import javascript from 'devicon/icons/javascript/javascript-original.svg'
import python from 'devicon/icons/python/python-original.svg'
import git from 'devicon/icons/git/git-original.svg'
import fastapi from 'devicon/icons/fastapi/fastapi-original.svg'
import type { IconKey } from '../../data/profile'

/* Ícones oficiais (Devicon) importados como arquivos; SQL, Excel, Power BI e IA desenhados à mão. */
const official: Partial<Record<IconKey, string[]>> = {
  web: [html5, css3, javascript],
  tailwind: [tailwind],
  react: [react],
  python: [python],
  git: [git],
  fastapi: [fastapi],
}

const drawn: Partial<Record<IconKey, React.ReactNode>> = {
  sql: (
    <svg viewBox="0 0 32 32" className="size-full">
      <ellipse cx="16" cy="7" rx="10" ry="4" fill="#7cc4ff" />
      <path d="M6 7v6c0 2.2 4.5 4 10 4s10-1.8 10-4V7c0 2.2-4.5 4-10 4S6 9.2 6 7z" fill="#3d8fd6" />
      <path d="M6 14v6c0 2.2 4.5 4 10 4s10-1.8 10-4v-6c0 2.2-4.5 4-10 4s-10-1.8-10-4z" fill="#2f78bd" />
      <path d="M6 21v4c0 2.2 4.5 4 10 4s10-1.8 10-4v-4c0 2.2-4.5 4-10 4s-10-1.8-10-4z" fill="#2563a0" />
    </svg>
  ),
  excel: (
    <svg viewBox="0 0 32 32" className="size-full">
      <rect x="4" y="4" width="24" height="24" rx="3" fill="#1d7a45" />
      <path d="M4 11h24M4 17.5h24M4 24h24M12 4v24M20 4v24" stroke="#7fd6a2" strokeWidth="1.4" />
      <rect x="18" y="18.5" width="11" height="10" rx="2" fill="#0b0c10" />
      <path d="M21 21.5h5M21 24h3.5M21 26.5h5" stroke="#7fd6a2" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  powerbi: (
    <svg viewBox="0 0 32 32" className="size-full">
      <rect x="20" y="4" width="7" height="24" rx="2" fill="#f2c811" />
      <rect x="12.5" y="10" width="7" height="18" rx="2" fill="#e0a800" />
      <rect x="5" y="16" width="7" height="12" rx="2" fill="#b88600" />
    </svg>
  ),
  ia: (
    <svg viewBox="0 0 32 32" className="size-full">
      <path d="M13 3c1 6.5 3.5 9 10 10-6.5 1-9 3.5-10 10-1-6.5-3.5-9-10-10 6.5-1 9-3.5 10-10z" fill="#ff5c00" />
      <path d="M24 19c.5 3 1.7 4.2 4.5 4.5-2.8.5-4 1.7-4.5 4.5-.5-2.8-1.7-4-4.5-4.5 2.8-.3 4-1.5 4.5-4.5z" fill="#7cc4ff" />
    </svg>
  ),
}

export function ItemIcon({ icon }: { icon: IconKey }) {
  const srcs = official[icon]
  if (srcs)
    return (
      <span className="flex h-[46px] items-center gap-1" aria-hidden>
        {srcs.map((src) => (
          <img key={src} src={src} alt="" width={srcs.length > 1 ? 30 : 46} height={46} className={srcs.length > 2 ? 'h-[28px] w-auto' : 'h-[38px] w-auto'} />
        ))}
      </span>
    )
  return (
    <span className="block size-[46px]" aria-hidden>
      {drawn[icon]}
    </span>
  )
}
