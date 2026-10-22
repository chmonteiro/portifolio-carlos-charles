import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

type Variant = 'primary' | 'secondary'
type Size = 'md' | 'sm'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-sans font-bold whitespace-nowrap transition duration-150 ease-out'
const variants: Record<Variant, string> = {
  primary: 'bg-accent text-bg hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgb(255_92_0/0.6)]',
  secondary: 'border border-line text-fg hover:border-muted',
}
const sizes: Record<Size, string> = {
  md: 'px-6 py-3.5 text-[15px]',
  sm: 'px-4 py-2.5 text-[13px] hud:py-2',
}

const cls = (variant: Variant, size: Size, extra = '') => `${base} ${variants[variant]} ${sizes[size]} ${extra}`

type Common = { variant?: Variant; size?: Size; children: ReactNode }

export function Button({ variant = 'primary', size = 'md', className, ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={cls(variant, size, className)} {...rest} />
}

/* Link externo: abre em nova aba e mostra a seta ↗. */
export function ExternalLink({ variant = 'primary', size = 'sm', children, className, ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a target="_blank" rel="noopener noreferrer" className={cls(variant, size, className)} {...rest}>
      {children}
      <ArrowUpRight aria-hidden className="size-3.5" />
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  )
}

/* Tecla de atalho exibida dentro do botão primário. */
export const Kbd = ({ children }: { children: ReactNode }) => (
  <kbd className="rounded-md border border-bg/40 px-1.5 py-0.5 font-mono text-[10px] font-medium pointer-coarse:hidden">{children}</kbd>
)
