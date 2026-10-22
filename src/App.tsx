import { useEffect } from 'react'
import { MotionConfig } from 'motion/react'
import { Hud } from './components/layout/Hud'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { EndBanner } from './components/sections/EndBanner'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Technologies } from './components/sections/Technologies'
import { caseBySlug } from './data/cases'
import { useRoute } from './hooks/useRoute'
import { CaseStudyPage } from './pages/CaseStudyPage'

// Âncoras da versão anterior continuam levando ao conteúdo equivalente.
const legacy: Record<string, string> = { personagem: 'sobre', inventario: 'tecnologias' }

export default function App() {
  const route = useRoute()

  // Ao voltar de um estudo de caso (ou abrir um link com #fase), leva até a seção do hash.
  useEffect(() => {
    if (route.page !== 'home') return
    const id = window.location.hash.slice(1)
    const el = id && document.getElementById(legacy[id] ?? id)
    if (el) el.scrollIntoView({ block: 'start' })
  }, [route])

  return (
    // reducedMotion="user": com "reduzir movimento" ativo, o Motion desliga deslocamentos e escalas.
    <MotionConfig reducedMotion="user">
      <a
        href="#conteudo"
        onClick={(e) => {
          // Sem trocar o hash: num estudo de caso, mudar o hash sairia da página.
          e.preventDefault()
          document.getElementById('conteudo')?.focus()
        }}
        className="sr-only z-10 rounded-full bg-accent px-4 py-2 font-bold text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <div className="map-bg min-h-dvh">
        {route.page === 'case' ? (
          <>
            <Hud key="case" current="projetos" />
            <div id="conteudo" tabIndex={-1} className="outline-none">
              <CaseStudyPage study={caseBySlug(route.slug)} />
            </div>
          </>
        ) : (
          <>
            <Hud key="home" />
            <main id="conteudo" tabIndex={-1} className="outline-none">
              <Hero />
              <Projects />
              <Technologies />
              <About />
              <Contact />
            </main>
          </>
        )}
        <EndBanner />
      </div>
    </MotionConfig>
  )
}
