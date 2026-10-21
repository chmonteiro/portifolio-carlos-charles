import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { inventory, type InventoryItem } from '../../data/profile'
import { emptySlots } from '../../lib/inventory'
import { prefersReducedMotion } from '../../lib/scroll'
import { ExternalLink } from '../ui/Button'
import { Chip } from '../ui/Chip'
import { GroupTitle } from '../ui/Eyebrow'
import { Panel } from '../ui/Panel'
import { EmptySlot, Slot } from '../ui/Slot'
import { Phase } from '../layout/Phase'

const itemsOf = (tabIndex: number) => inventory[tabIndex].groups.flatMap((g) => g.items)

/* Fase 02: abas (Stacks, Projetos, Faculdade), grade de slots e painel de descrição. */
export function Inventory() {
  const [tab, setTab] = useState(0)
  const [selectedId, setSelectedId] = useState(itemsOf(0)[0].id)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const detailRef = useRef<HTMLDivElement>(null)

  const current = inventory[tab]
  const selected = itemsOf(tab).find((i) => i.id === selectedId) ?? itemsOf(tab)[0]

  // Trocar de aba recria a grade e seleciona o 1º item.
  const changeTab = (i: number) => {
    setTab(i)
    setSelectedId(itemsOf(i)[0].id)
  }

  // Setas, Home e End movem entre as abas (padrão WAI-ARIA de tabs).
  const onTabKey = (e: React.KeyboardEvent) => {
    const last = inventory.length - 1
    const next = { ArrowRight: tab === last ? 0 : tab + 1, ArrowLeft: tab === 0 ? last : tab - 1, Home: 0, End: last }[e.key]
    if (next === undefined) return
    e.preventDefault()
    changeTab(next)
    tabRefs.current[next]?.focus()
  }

  const select = (item: InventoryItem) => {
    setSelectedId(item.id)
    // No celular a descrição fica abaixo da grade: leva o visitante até ela.
    if (window.matchMedia('(max-width: 819px)').matches)
      detailRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'nearest' })
  }

  const total = itemsOf(tab).length

  return (
    <Phase id="inventario" eyebrow="Fase 02 · Inventário" title="Itens coletados pelo caminho">
      <div
        role="tablist"
        aria-label="Categorias do inventário"
        onKeyDown={onTabKey}
        className="mb-5 inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-line p-1"
      >
        {inventory.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === i}
            aria-controls="inventario-painel"
            tabIndex={tab === i ? 0 : -1}
            onClick={() => changeTab(i)}
            className={`rounded-full px-4 py-2.5 text-[13px] hud:py-1.5 whitespace-nowrap transition duration-150 ${
              tab === i ? 'bg-fg font-semibold text-bg' : 'text-muted hover:text-fg'
            }`}
          >
            {t.label} <span className="font-mono text-[11px] opacity-70">{itemsOf(i).length}</span>
          </button>
        ))}
      </div>

      <div
        id="inventario-painel"
        role="tabpanel"
        aria-labelledby={`tab-${current.id}`}
        className="grid gap-4 split:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] split:items-start"
      >
        <Panel className="space-y-5">
          {current.groups.map((g, gi) => (
            <div key={g.title ?? gi}>
              {g.title && <GroupTitle>{g.title}</GroupTitle>}
              <ul className={`grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2.5 ${g.title ? 'mt-3' : ''}`}>
                {g.items.map((item) => (
                  <li key={item.id}>
                    <Slot item={item} active={item.id === selected.id} onSelect={() => select(item)} />
                  </li>
                ))}
                {!g.title && Array.from({ length: emptySlots(total) }, (_, i) => <EmptySlot key={i} />)}
              </ul>
            </div>
          ))}
        </Panel>

        <Panel ref={detailRef} aria-live="polite" className="scroll-mt-24">
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
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologias">
                {selected.chips.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </ul>
              {selected.links && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {selected.links.map((l) => (
                    <ExternalLink key={l.href} href={l.href} variant={l.primary ? 'primary' : 'secondary'}>
                      {l.label}
                    </ExternalLink>
                  ))}
                </div>
              )}
              {selected.note && <p className="mt-4 font-mono text-[11px] text-muted">{selected.note}</p>}
            </motion.div>
          </AnimatePresence>
        </Panel>
      </div>
    </Phase>
  )
}
