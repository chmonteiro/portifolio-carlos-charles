import type { ReactNode } from 'react'

/* Seção numerada do estudo de caso ("02 · Problema original"). */
export function CaseSection({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  const id = `secao-${n}`
  return (
    <section aria-labelledby={id} className="grid gap-4 border-t border-line py-10 split:grid-cols-[220px_minmax(0,1fr)] split:gap-10">
      <h2 id={id} className="font-display text-lg font-bold">
        <span className="mb-1 block font-mono text-[11px] font-medium tracking-[.12em] text-accent">{String(n).padStart(2, '0')}</span>
        {title}
      </h2>
      <div className="min-w-0 text-[15px] leading-[1.7] text-fg/90 sm:text-base">{children}</div>
    </section>
  )
}

/* Lista com marcador laranja, usada em problema, regras, validação e resultados. */
export const Bullets = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((t) => (
      <li key={t} className="flex gap-3">
        <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" />
        <span>{t}</span>
      </li>
    ))}
  </ul>
)
