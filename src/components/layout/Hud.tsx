import { phases, profile, type PhaseId } from '../../data/profile'
import { useActivePhase } from '../../hooks/useActivePhase'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { scrollToPhase } from '../../lib/scroll'
import { WizardLogo } from '../ui/WizardLogo'

const ids = phases.map((p) => p.id)

/* HUD fixo: identidade, barra de XP (percentual do scroll) e navegação com a fase visível destacada.
   `current` fixa a fase destacada fora da página única (ex.: Projetos num estudo de caso). */
export function Hud({ current }: { current?: PhaseId }) {
  const observed = useActivePhase(ids) as PhaseId
  const active = current ?? observed
  const xp = useScrollProgress()

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    // Fora da página única a seção não existe: o hash muda e o App volta para ela.
    if (!document.getElementById(id)) return
    e.preventDefault()
    scrollToPhase(id)
    history.replaceState(null, '', `#${id}`)
  }

  return (
    <header className="sticky top-0 z-[5] border-b border-line bg-bg/82 pt-[env(safe-area-inset-top)] backdrop-blur-[14px]">
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-center gap-x-6 gap-y-3 px-[max(16px,env(safe-area-inset-left))] py-3">
        <a href="#inicio" onClick={(e) => go(e, 'inicio')} className="flex items-center gap-3 rounded-[10px]">
          <WizardLogo />
          <span className="font-display text-[13px] font-bold">{profile.name}</span>
        </a>

        <div className="hidden items-center gap-2 hud:flex" aria-label={`XP: ${xp}% da página explorada`} role="img">
          <span className="font-mono text-[10px] text-muted">XP</span>
          <span className="h-1 w-[90px] overflow-hidden rounded-full bg-line">
            <span className="block h-full bg-accent transition-[width] duration-150" style={{ width: `${xp}%` }} />
          </span>
          <span className="w-8 font-mono text-[10px] text-muted tabular-nums">{xp}%</span>
        </div>

        <nav aria-label="Fases" className="w-full hud:ml-auto hud:w-auto">
          <ul className="-mx-1 flex justify-between overflow-x-auto hud:mx-0 hud:justify-end hud:gap-1">
            {phases.map((p) => {
              const current = active === p.id
              return (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    onClick={(e) => go(e, p.id)}
                    aria-current={current ? 'location' : undefined}
                    className={`block rounded-full px-2 py-2.5 text-[13px] whitespace-nowrap hud:px-3 hud:py-1.5 transition duration-150 ${
                      current ? 'bg-fg font-semibold text-bg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {p.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
