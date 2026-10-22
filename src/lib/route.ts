/* Rotas por hash: "#/projetos/<slug>" abre um estudo de caso; qualquer outro hash é a página única. */
export type Route = { page: 'home' } | { page: 'case'; slug: string }

export function parseRoute(hash: string): Route {
  const m = /^#\/projetos\/([a-z0-9-]+)\/?$/.exec(hash)
  return m ? { page: 'case', slug: m[1] } : { page: 'home' }
}

export const caseHref = (slug: string) => `#/projetos/${slug}`
