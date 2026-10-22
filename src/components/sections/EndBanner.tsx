import { RotateCcw } from 'lucide-react'
import { scrollToPhase } from '../../lib/scroll'
import { Button } from '../ui/Button'

/* Faixa final: "Jogar de novo" volta ao Início e fecha o loop do scroll. */
export function EndBanner() {
  return (
    <footer className="border-t border-line px-4 py-16 text-center sm:py-24">
      <p className="mx-auto max-w-[18ch] font-display text-[clamp(20px,3vw,28px)] leading-tight font-bold sm:max-w-none">
        Novas fases em desenvolvimento.
      </p>
      <p className="mt-3 text-sm text-muted">Obrigado por jogar até aqui.</p>
      <Button variant="secondary" size="sm" className="mt-6" onClick={() => scrollToPhase('inicio')}>
        <RotateCcw aria-hidden className="size-3.5" /> Jogar de novo
      </Button>
    </footer>
  )
}
