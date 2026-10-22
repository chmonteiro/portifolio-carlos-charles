import { ArrowRight } from 'lucide-react'
import { cases } from '../../data/cases'
import { webProjects } from '../../data/profile'
import { caseHref } from '../../lib/route'
import { ExternalLink } from '../ui/Button'
import { Chip } from '../ui/Chip'
import { GroupTitle } from '../ui/Eyebrow'
import { Panel } from '../ui/Panel'
import { Phase } from '../layout/Phase'

/* Fase 01: estudos de caso em destaque e, abaixo, os projetos web. */
export function Projects() {
  return (
    <Phase id="projetos" eyebrow="Fase 01 · Projetos" title="Projetos que resolvem problemas reais">
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
        {cases.map((c) => (
          <li key={c.slug}>
            <Panel className="flex h-full flex-col">
              <div className="flex items-center justify-between gap-3">
                <span aria-hidden className="font-display text-xl font-extrabold text-accent">
                  {c.code}
                </span>
                {c.status === 'documentacao' && (
                  <span className="rounded-full border border-cool/40 px-2.5 py-1 font-mono text-[10px] text-cool uppercase">Em documentação</span>
                )}
              </div>
              <p className="mt-4 font-mono text-[10px] tracking-[.12em] text-cool uppercase">{c.kind}</p>
              <h3 className="mt-2 font-display text-lg leading-snug font-bold">{c.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-muted">{c.summary}</p>
              <p className="mt-5 flex items-baseline gap-3 border-t border-line pt-4">
                <span className="font-display text-2xl font-extrabold text-fg">{c.proofs[0].value}</span>
                <span className="text-sm text-muted">{c.proofs[0].label}</span>
              </p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologias">
                {c.stack.slice(0, 4).map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </ul>
              <a
                href={caseHref(c.slug)}
                className="mt-auto inline-flex items-center gap-2 self-start pt-6 text-[15px] font-bold text-accent transition duration-150 hover:gap-3"
              >
                Ver estudo de caso <ArrowRight aria-hidden className="size-4" />
                <span className="sr-only">: {c.title}</span>
              </a>
            </Panel>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <GroupTitle as="h3">Outros projetos · Web</GroupTitle>
        <ul className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {webProjects.map((p) => (
            <li key={p.name}>
              <Panel className="flex h-full flex-col">
                <p className="font-mono text-[10px] tracking-[.12em] text-cool uppercase">{p.kind}</p>
                <h4 className="mt-2 font-display text-base font-bold">{p.name}</h4>
                <p className="mt-2 text-[15px] leading-[1.6] text-muted">{p.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologias">
                  {p.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {p.links.map((l, i) => (
                    <ExternalLink key={l.href} href={l.href} variant={i === 0 ? 'primary' : 'secondary'}>
                      {l.label}
                    </ExternalLink>
                  ))}
                </div>
                {p.note && <p className="mt-3 font-mono text-[11px] text-muted">{p.note}</p>}
              </Panel>
            </li>
          ))}
        </ul>
      </div>
    </Phase>
  )
}
