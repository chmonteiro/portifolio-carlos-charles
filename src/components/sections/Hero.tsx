import { useEffect } from 'react'
import { hero, phases } from '../../data/profile'
import { scrollToPhase } from '../../lib/scroll'
import { Button, Kbd } from '../ui/Button'
import { Phase } from '../layout/Phase'

const saves = phases.slice(1)

/* Fase 00: proposta de valor, "Iniciar jornada" (também pela tecla Enter no topo) e atalhos de save. */
export function Hero() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Só no topo da página e sem foco em um controle (Enter num botão já tem ação própria).
      const target = e.target as HTMLElement
      if (e.key !== 'Enter' || window.scrollY > 80 || target.closest('a, button, input, textarea')) return
      e.preventDefault()
      scrollToPhase('personagem')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <Phase id="inicio" eyebrow={hero.eyebrow} className="pt-[clamp(72px,10vw,120px)] pb-[clamp(72px,9vw,110px)]">
      <h1 id="inicio-title" className="mt-6 font-display text-[clamp(40px,9vw,96px)] leading-[.98] font-extrabold tracking-tight">
        {hero.title.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        <span className="block text-accent">{hero.titleAccent}</span>
      </h1>

      <p className="mt-7 max-w-[56ch] text-base leading-[1.6] text-muted sm:text-lg">{hero.text}</p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button onClick={() => scrollToPhase('personagem')}>
          Iniciar jornada <Kbd>Enter</Kbd>
        </Button>
        <Button variant="secondary" onClick={() => scrollToPhase('contato')}>
          Ir direto ao contato
        </Button>
      </div>

      <ul className="mt-10 grid max-w-[620px] grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3" aria-label="Atalhos de fase">
        {saves.map((p, i) => (
          <li key={p.id}>
            <a
              href={`#${p.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToPhase(p.id)
              }}
              className="glass block px-4 py-3 transition duration-150 hover:border-accent"
            >
              <span className="block font-mono text-[10px] tracking-[.12em] text-muted uppercase">Fase 0{i + 1}</span>
              <span className="mt-1 block font-display text-sm font-bold">{p.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </Phase>
  )
}
