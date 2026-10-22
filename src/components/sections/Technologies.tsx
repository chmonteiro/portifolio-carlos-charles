import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { techGroups, type Tech } from '../../data/profile'
import { prefersReducedMotion } from '../../lib/scroll'
import { ExternalLink } from '../ui/Button'
import { GroupTitle } from '../ui/Eyebrow'
import { Panel } from '../ui/Panel'
import { Slot } from '../ui/Slot'
import { Phase } from '../layout/Phase'

const first = techGroups[0].items[0]

/* Fase 02: o inventário de tecnologias. Cada item mostra como foi usado e em quais projetos. */
export function Technologies() {
  const [selected, setSelected] = useState<Tech>(first)
  const detailRef = useRef<HTMLDivElement>(null)

  const select = (item: Tech) => {
    setSelected(item)
    // No celular a descrição fica abaixo da grade: leva o visitante até ela.
    if (window.matchMedia('(max-width: 819px)').matches)
      detailRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'nearest' })
  }

  return (
    <Phase id="tecnologias" eyebrow="Fase 02 · Tecnologias" title="Itens coletados pelo caminho">
      <p className="-mt-4 mb-8 max-w-[60ch] text-muted">Sem notas inventadas: cada tecnologia aponta para os projetos em que foi usada de verdade.</p>
      <div className="grid gap-4 split:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] split:items-start">
        <Panel className="space-y-5">
          {techGroups.map((g) => (
            <div key={g.title}>
              <GroupTitle>{g.title}</GroupTitle>
              <ul className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2.5">
                {g.items.map((item) => (
                  <li key={item.id}>
                    <Slot item={item} active={item.id === selected.id} onSelect={() => select(item)} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Panel>

        <Panel ref={detailRef} aria-live="polite" className="scroll-mt-32 split:sticky split:top-24">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              <p className="font-mono text-[10px] font-medium tracking-[.12em] text-cool uppercase">{selected.kind}</p>
              <h3 className="mt-2 font-display text-[clamp(18px,2.4vw,24px)] font-bold">{selected.name}</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-muted">{selected.text}</p>
              <h4 className="mt-5 font-mono text-[11px] tracking-[.12em] text-muted uppercase">Onde usei</h4>
              {selected.usedIn.length ? (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {selected.usedIn.map((p) => (
                    <li key={p.href}>
                      {p.external ? (
                        <ExternalLink href={p.href} variant="secondary">
                          {p.name}
                        </ExternalLink>
                      ) : (
                        <a
                          href={p.href}
                          className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-[13px] font-bold text-bg transition duration-150 hover:-translate-y-0.5 hud:py-2"
                        >
                          {p.name} <ArrowRight aria-hidden className="size-3.5" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 font-mono text-[11px] text-muted">Estudo de caso ainda não publicado.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </Panel>
      </div>
    </Phase>
  )
}
