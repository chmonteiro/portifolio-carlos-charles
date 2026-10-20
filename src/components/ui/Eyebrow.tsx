import type { ReactNode } from 'react'

/* Rótulo "FASE 0X · NOME ——" em mono laranja. */
export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="flex items-center gap-3 font-mono text-[11px] font-medium tracking-[.12em] text-accent uppercase sm:text-xs">
    {children}
    <span aria-hidden className="h-px w-14 bg-accent/70" />
  </p>
)

/* Título de grupo/painel em mono cinza com linha à direita. */
export const GroupTitle = ({ children, as: Tag = 'h3' }: { children: ReactNode; as?: 'h3' | 'h4' | 'p' }) => (
  <Tag className="flex items-center gap-3 font-mono text-[11px] font-medium tracking-[.12em] text-muted uppercase">
    {children}
    <span aria-hidden className="h-px flex-1 bg-line" />
  </Tag>
)
