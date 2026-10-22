import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, Lock } from 'lucide-react'
import { cases, type CaseStudy } from '../data/cases'
import { caseHref } from '../lib/route'
import { Bullets, CaseSection } from '../components/case/CaseSection'
import { DataTable } from '../components/case/DataTable'
import { Pipeline } from '../components/case/Pipeline'
import { Chip } from '../components/ui/Chip'
import { Eyebrow } from '../components/ui/Eyebrow'

const backLink = 'inline-flex items-center gap-2 rounded-full py-2.5 text-sm font-bold text-muted transition duration-150 hover:text-fg'

/* Página de estudo de caso: mesmo roteiro editorial para todos os projetos.
   Seções sem conteúdo comprovado não aparecem; o que falta fica listado em "Pendências". */
export function CaseStudyPage({ study }: { study?: CaseStudy }) {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    titleRef.current?.focus()
    if (study) document.title = `${study.title} · Carlos Charles`
    return () => {
      document.title = 'Carlos Charles · Analista de Dados e Desenvolvedor Web | Portfólio'
    }
  }, [study])

  if (!study)
    return (
      <main className="mx-auto max-w-[1080px] px-[max(16px,env(safe-area-inset-left))] py-24">
        <h1 ref={titleRef} tabIndex={-1} className="font-display text-3xl font-bold outline-none">
          Projeto não encontrado
        </h1>
        <p className="mt-4 text-muted">O endereço não corresponde a nenhum estudo de caso.</p>
        <a href="#projetos" className={`${backLink} mt-6`}>
          <ArrowLeft aria-hidden className="size-4" /> Ver todos os projetos
        </a>
      </main>
    )

  const next = cases[(cases.indexOf(study) + 1) % cases.length]
  let n = 0
  const sec = () => ++n

  return (
    <main className="mx-auto max-w-[1080px] px-[max(16px,env(safe-area-inset-left))] pt-8 pb-20">
      <a href="#projetos" className={backLink}>
        <ArrowLeft aria-hidden className="size-4" /> Todos os projetos
      </a>

      <header className="mt-8">
        <Eyebrow>Estudo de caso · {study.kind}</Eyebrow>
        <h1 ref={titleRef} tabIndex={-1} className="mt-5 font-display text-[clamp(30px,5.2vw,52px)] leading-[1.08] font-extrabold outline-none">
          {study.title}
        </h1>
        <p className="mt-6 max-w-[62ch] text-lg leading-[1.6] text-muted">{study.summary}</p>

        <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[11px] tracking-[.12em] text-muted uppercase">Minha contribuição</dt>
            <dd className="mt-1.5">{study.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-[.12em] text-muted uppercase">Tecnologias</dt>
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-2">
                {study.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <ul className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3" aria-label="Evidências">
          {study.proofs.map((p) => (
            <li key={p.label} className="glass p-5">
              <p className="font-display text-3xl font-extrabold text-accent">{p.value}</p>
              <p className="mt-2 text-sm text-muted">{p.label}</p>
            </li>
          ))}
        </ul>
        {study.status === 'documentacao' && (
          <p className="mt-4 rounded-xl border border-cool/40 px-4 py-3 text-sm text-cool">
            Estudo de caso em documentação: os pontos ainda não comprovados estão listados no fim da página.
          </p>
        )}
      </header>

      <div className="mt-12">
        <CaseSection n={sec()} title="Contexto">
          <p>{study.context}</p>
        </CaseSection>

        <CaseSection n={sec()} title="Problema original">
          <Bullets items={study.problem} />
        </CaseSection>

        <CaseSection n={sec()} title="Como a solução funciona">
          <Pipeline steps={study.steps} />
          {study.architecture && (
            <dl className="mt-6 space-y-2 text-sm">
              {study.architecture.map((a) => (
                <div key={a.layer} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <dt className="font-mono text-[11px] tracking-[.12em] text-cool uppercase sm:w-28 sm:shrink-0 sm:pt-0.5">{a.layer}</dt>
                  <dd>{a.tech}</dd>
                </div>
              ))}
            </dl>
          )}
        </CaseSection>

        {study.rules.length > 0 && (
          <CaseSection n={sec()} title="Regras de negócio">
            <Bullets items={study.rules} />
          </CaseSection>
        )}

        {study.example && (
          <CaseSection n={sec()} title={study.example.title}>
            <p className="mb-4 font-mono text-xs text-cool">{study.example.note}</p>
            <div className="space-y-4">
              {study.example.before && <DataTable caption="Antes" table={study.example.before} />}
              <DataTable caption={study.example.before ? 'Depois' : 'Resultado'} table={study.example.after} />
            </div>
          </CaseSection>
        )}

        {study.validation.length > 0 && (
          <CaseSection n={sec()} title="Como a saída é validada">
            <Bullets items={study.validation} />
          </CaseSection>
        )}

        <CaseSection n={sec()} title="Resultados">
          <Bullets items={study.results} />
        </CaseSection>

        <CaseSection n={sec()} title="Confidencialidade e pendências">
          <p className="flex gap-3">
            <Lock aria-hidden className="mt-1 size-4 shrink-0 text-cool" />
            {study.confidentiality}
          </p>
          {study.pending && (
            <>
              <p className="mt-5 mb-3 font-mono text-[11px] tracking-[.12em] text-muted uppercase">Ainda não comprovado ou em documentação</p>
              <Bullets items={study.pending} />
            </>
          )}
        </CaseSection>
      </div>

      <nav aria-label="Navegação entre estudos de caso" className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <a href="#projetos" className={backLink}>
          <ArrowLeft aria-hidden className="size-4" /> Todos os projetos
        </a>
        {next !== study && (
          <a
            href={caseHref(next.slug)}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-bold text-bg transition duration-150 hover:-translate-y-0.5"
          >
            Próximo: {next.title} <ArrowRight aria-hidden className="size-4" />
          </a>
        )}
      </nav>
    </main>
  )
}
