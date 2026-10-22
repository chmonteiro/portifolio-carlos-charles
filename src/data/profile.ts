/*
 * Todo o conteúdo editável do portfólio fica neste arquivo.
 * Para atualizar projetos, habilidades, formação ou links, edite aqui;
 * os componentes só leem estes dados.
 */

export const profile = {
  name: 'Carlos Charles',
  role: 'Analista de Dados & Dev',
  region: 'São Paulo, BR',
  guild: 'Geosaúde',
  specialty: 'Dados de saúde',
  level: 'Nível Jr',
  status: 'disponível',
  email: 'carloscharles2k@gmail.com',
}

export const links = {
  linkedin: 'https://www.linkedin.com/in/carlos-charles/',
  github: 'https://github.com/chmonteiro',
}

export const hero = {
  eyebrow: 'Portfólio · Temporada 2026',
  title: ['Dados', 'que viram'],
  titleAccent: 'decisão.',
  text: 'Sou Carlos Charles, analista de dados e desenvolvedor em São Paulo. Automatizo relatórios, construo ETLs e crio interfaces web. Aperte iniciar e veja os projetos.',
}

/* Ordem das fases = ordem das seções na página e no HUD. */
export const phases = [
  { id: 'inicio', label: 'Início' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'tecnologias', label: 'Tecnologias' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'contato', label: 'Contato' },
] as const

export type PhaseId = (typeof phases)[number]['id']

/* Parágrafos da bio. Trechos entre ** ficam em destaque laranja. */
export const bio = [
  'Sou analista de dados e desenvolvedor em São Paulo. Fico entre os dados, o negócio e a tecnologia: transformo planilhas bagunçadas em indicadores confiáveis e ideias em sistemas que funcionam.',
  'Na saúde pública, construí o ETL em Power Query que consolida as filas do sistema SIGA de **5 centrais de regulação** e automatizei o tratamento dos relatórios de cota do SIRESP, que viraram uma base única para analisar aproveitamento e absenteísmo.',
  'Para clientes, desenvolvi a LS Plataform, uma plataforma web de indicadores comerciais: levei **7 consultas do Power Query** para Python + pandas, criei a API em FastAPI e os painéis com filtros, gráficos, mapa de faturamento por estado e exportação para Excel.',
  'No desenvolvimento web, crio sites e landing pages do zero, como a da Veritus Tech, em React + Vite, e este portfólio, em React, TypeScript e Tailwind CSS.',
  'Estou cursando Banco de Dados na Faculdade Descomplica. Próxima missão: crescer em análise de dados e desenvolvimento, em times de Dados, BI ou Desenvolvimento.',
]

export type Mission = { when: string; active: boolean; org: string; text: string }

export const missions: Mission[] = [
  {
    when: 'Mai 2025 · Em andamento',
    active: true,
    org: 'Geosaúde Gerenciadora',
    text: 'Administrativo em Saúde | Dados e Relatórios. ETL em Power Query (M) consolidando 5 centrais de regulação.',
  },
  {
    when: 'Paralelo · Em andamento',
    active: true,
    org: 'Freelancer',
    text: 'Sites, landing pages e automações de planilhas para clientes.',
  },
  {
    when: '2023 – 2025 · Concluída',
    active: false,
    org: '2FIT Comercial',
    text: 'Auxiliar Administrativo. Estoque e marketplaces via ERP Bling.',
  },
]

export const education = {
  course: 'Banco de Dados',
  school: 'Faculdade Descomplica',
  status: 'Graduação em andamento · 1º período',
  chips: ['SQL', 'Modelagem de dados'],
}

/* Projetos citados como evidência. Estudos de caso abrem dentro do site; os demais, em nova aba. */
export type ProjectRef = { name: string; href: string; external?: boolean }

const ref = {
  siresp: { name: 'Automação SIRESP', href: '#/projetos/siresp' },
  ls: { name: 'LS Plataform', href: '#/projetos/ls-plataform' },
  siga: { name: 'Filas do SIGA', href: '#/projetos/siga' },
  veritus: { name: 'Veritus Tech', href: 'https://veritus-tech.vercel.app', external: true },
  beatriz: { name: 'Portfólio Beatriz Tomagnini', href: 'https://portfolio-beatriz-tomagnini.vercel.app', external: true },
  portfolio: { name: 'Este portfólio', href: 'https://github.com/chmonteiro/portifolio-carlos-charles', external: true },
} satisfies Record<string, ProjectRef>

/* Projetos web, sem estudo de caso: aparecem em "Outros projetos". */
export type WebProject = { name: string; kind: string; text: string; stack: string[]; links: { label: string; href: string }[]; note?: string }

export const webProjects: WebProject[] = [
  {
    name: 'Veritus Tech',
    kind: 'Landing page',
    text: 'Landing page de uma empresa de infraestrutura de TI em São Paulo: apresenta os serviços e conduz o visitante até o contato. Construída do zero, com tema escuro, layout responsivo e metadados para busca e redes sociais.',
    stack: ['React', 'Vite', 'CSS'],
    links: [
      { label: 'Visitar site', href: 'https://veritus-tech.vercel.app' },
      { label: 'Código', href: 'https://github.com/chmonteiro/Veritus-Tech' },
    ],
  },
  {
    name: 'Portfólio Beatriz Tomagnini',
    kind: 'Landing page',
    text: 'Landing page de portfólio para uma profissional de Jornalismo, Comunicação e Moda.',
    stack: ['JavaScript'],
    links: [{ label: 'Visitar site', href: 'https://portfolio-beatriz-tomagnini.vercel.app' }],
    note: 'Código em repositório privado.',
  },
]

export type IconKey =
  | 'html-css'
  | 'tailwind'
  | 'react'
  | 'javascript'
  | 'python'
  | 'sql'
  | 'excel'
  | 'powerbi'
  | 'ia'
  | 'git'
  | 'fastapi'

/* Cada tecnologia mostra como foi usada e em quais projetos: evidência no lugar de nota. */
export type Tech = { id: string; name: string; kind: string; icon: IconKey; text: string; usedIn: ProjectRef[] }

export const techGroups: { title: string; items: Tech[] }[] = [
  {
    title: 'Dados',
    items: [
      {
        id: 'python',
        name: 'Python',
        kind: 'Dados · Automação',
        icon: 'python',
        text: 'Automação do SIRESP (cerca de 1.140 linhas, com pandas, openpyxl e BeautifulSoup) e o ETL da LS Plataform, que substituiu 7 consultas do Power Query.',
        usedIn: [ref.siresp, ref.ls],
      },
      {
        id: 'sql',
        name: 'SQL',
        kind: 'Dados · Banco',
        icon: 'sql',
        text: 'Migrações e regras de acesso no PostgreSQL (Supabase) da LS Plataform. Também é o foco da graduação em Banco de Dados.',
        usedIn: [ref.ls],
      },
      {
        id: 'excel',
        name: 'Excel + Power Query',
        kind: 'Dados · ETL',
        icon: 'excel',
        text: 'ETL em Power Query (M) que consolida as filas do SIGA; origem das 7 consultas migradas na LS Plataform; saída formatada da automação do SIRESP.',
        usedIn: [ref.siga, ref.ls, ref.siresp],
      },
      {
        id: 'powerbi',
        name: 'Power BI',
        kind: 'Dados · BI',
        icon: 'powerbi',
        text: 'Dashboards e relatórios visuais. Ainda não há estudo de caso publicado com Power BI.',
        usedIn: [],
      },
    ],
  },
  {
    title: 'Desenvolvimento',
    items: [
      {
        id: 'fastapi',
        name: 'FastAPI',
        kind: 'Back-end',
        icon: 'fastapi',
        text: 'API da LS Plataform, com controle de acesso por perfil validado na API e no banco.',
        usedIn: [ref.ls],
      },
      {
        id: 'javascript',
        name: 'JavaScript + TypeScript',
        kind: 'Front-end',
        icon: 'javascript',
        text: 'Alpine.js e Chart.js nas telas da LS Plataform; TypeScript neste portfólio; interatividade das landing pages.',
        usedIn: [ref.ls, ref.portfolio, ref.veritus, ref.beatriz],
      },
      {
        id: 'react',
        name: 'React',
        kind: 'Front-end',
        icon: 'react',
        text: 'Componentes da landing page da Veritus Tech e deste portfólio.',
        usedIn: [ref.veritus, ref.portfolio],
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        kind: 'Front-end',
        icon: 'tailwind',
        text: 'Estilo da LS Plataform, com tema claro e escuro, e deste portfólio.',
        usedIn: [ref.ls, ref.portfolio],
      },
      {
        id: 'html-css',
        name: 'HTML + CSS',
        kind: 'Front-end',
        icon: 'html-css',
        text: 'Base de todos os sites. Na Veritus Tech, CSS próprio com design tokens, sem framework.',
        usedIn: [ref.veritus, ref.beatriz, ref.portfolio],
      },
    ],
  },
  {
    title: 'Ferramentas',
    items: [
      {
        id: 'ia',
        name: 'Automação com IA',
        kind: 'Ferramenta',
        icon: 'ia',
        text: 'A automação do SIRESP também roda como skill de agente de IA, com as regras e validações documentadas.',
        usedIn: [ref.siresp],
      },
      {
        id: 'git',
        name: 'Git + GitHub',
        kind: 'Ferramenta',
        icon: 'git',
        text: 'Versionamento, pull requests e deploy automático dos projetos.',
        usedIn: [ref.ls, ref.portfolio, ref.veritus],
      },
    ],
  },
]
