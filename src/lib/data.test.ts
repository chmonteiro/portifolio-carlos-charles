import { describe, expect, it } from 'vitest'
import { caseHref, parseRoute } from './route'
import { cases } from '../data/cases'
import { links, techGroups, webProjects } from '../data/profile'

describe('parseRoute', () => {
  it('abre estudo de caso só no formato #/projetos/<slug>', () => {
    expect(parseRoute('#/projetos/siresp')).toEqual({ page: 'case', slug: 'siresp' })
    expect(parseRoute('#/projetos/ls-plataform/')).toEqual({ page: 'case', slug: 'ls-plataform' })
    expect(parseRoute('#projetos')).toEqual({ page: 'home' })
    expect(parseRoute('')).toEqual({ page: 'home' })
    expect(parseRoute('#/projetos/../x')).toEqual({ page: 'home' })
  })
})

describe('dados do portfólio', () => {
  const slugs = cases.map((c) => c.slug)

  it('slugs dos estudos de caso são únicos e roteáveis', () => {
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const s of slugs) expect(parseRoute(caseHref(s))).toEqual({ page: 'case', slug: s })
  })

  it('evidências das tecnologias apontam para estudos existentes ou links https', () => {
    for (const t of techGroups.flatMap((g) => g.items))
      for (const r of t.usedIn) {
        if (r.external) expect(r.href).toMatch(/^https:\/\//)
        else {
          const route = parseRoute(r.href)
          expect(route.page === 'case' && slugs.includes(route.slug)).toBe(true)
        }
      }
  })

  it('todo link externo usa https', () => {
    const hrefs = [...Object.values(links), ...webProjects.flatMap((p) => p.links.map((l) => l.href))]
    for (const h of hrefs) expect(h).toMatch(/^https:\/\//)
  })

  it('estudo publicado tem validação e resultados; em documentação lista pendências', () => {
    for (const c of cases) {
      if (c.status === 'publicado') expect(c.validation.length * c.results.length).toBeGreaterThan(0)
      else expect(c.pending?.length).toBeGreaterThan(0)
    }
  })
})
