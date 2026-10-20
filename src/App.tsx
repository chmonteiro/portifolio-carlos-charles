import { MotionConfig } from 'motion/react'
import { Hud } from './components/layout/Hud'
import { Character } from './components/sections/Character'
import { Contact } from './components/sections/Contact'
import { EndBanner } from './components/sections/EndBanner'
import { Hero } from './components/sections/Hero'
import { Inventory } from './components/sections/Inventory'

export default function App() {
  return (
    // reducedMotion="user": com "reduzir movimento" ativo, o Motion desliga deslocamentos e escalas.
    <MotionConfig reducedMotion="user">
      <a
        href="#personagem"
        className="sr-only z-10 rounded-full bg-accent px-4 py-2 font-bold text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <div className="map-bg min-h-dvh">
        <Hud />
        <main>
          <Hero />
          <Character />
          <Inventory />
          <Contact />
        </main>
        <EndBanner />
      </div>
    </MotionConfig>
  )
}
