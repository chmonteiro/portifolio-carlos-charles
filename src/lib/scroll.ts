export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function scrollToPhase(id: string) {
  const el = document.getElementById(id)
  // Fora da página única (num estudo de caso) a fase não existe: volta para ela pelo hash.
  if (!el) {
    window.location.hash = id
    return
  }
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  // Move o foco para a fase, para leitores de tela e navegação por teclado seguirem o scroll.
  el.focus({ preventScroll: true })
}
