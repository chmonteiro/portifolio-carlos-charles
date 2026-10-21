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
  text: 'Sou Carlos Charles, analista de dados e desenvolvedor em São Paulo. Automatizo relatórios, construo ETLs e crio interfaces web. Aperte iniciar e explore as fases.',
}

/* Ordem das fases = ordem das seções na página e no HUD. */
export const phases = [
  { id: 'inicio', label: 'Início' },
  { id: 'personagem', label: 'Personagem' },
  { id: 'inventario', label: 'Inventário' },
  { id: 'contato', label: 'Contato' },
] as const

export type PhaseId = (typeof phases)[number]['id']

/* Parágrafos da bio. Trechos entre ** ficam em destaque laranja. */
export const bio = [
  'Fico entre os dados, o negócio e a tecnologia: transformo planilhas bagunçadas em indicadores confiáveis e ideias em sistemas que funcionam.',
  'Na saúde pública, construí o ETL em Power Query que consolida as filas do sistema SIGA de **5 centrais de regulação**. Para clientes, desenvolvi uma plataforma web de indicadores comerciais com Python, FastAPI e dashboards, além de sites, landing pages e automações com Python e IA.',
  'Próxima missão: crescer como Analista de Dados, BI, Negócios ou Automação, de preferência na área da saúde.',
]

/* Valores 0–100. Pendente no PDF (pág. 17): são estimativas a validar. */
export const attributes = [
  { label: 'Excel · Power Query', value: 90 },
  { label: 'Python · pandas', value: 75 },
  { label: 'JavaScript · HTML/CSS', value: 72 },
  { label: 'Automação com IA', value: 70 },
  { label: 'SQL', value: 55 },
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

export type ItemLink = { label: string; href: string; primary?: boolean }

export type InventoryItem = {
  id: string
  name: string
  kind: string
  text: string
  chips: string[]
  /* Ícone oficial/desenhado (stacks) ou sigla em laranja (projetos, faculdade). */
  icon?: IconKey
  code?: string
  links?: ItemLink[]
  note?: string
}

export type InventoryTab = {
  id: string
  label: string
  groups: { title?: string; items: InventoryItem[] }[]
}

export const inventory: InventoryTab[] = [
  {
    id: 'stacks',
    label: 'Stacks',
    groups: [
      {
        title: 'Stacks web',
        items: [
          {
            id: 'html-css',
            name: 'HTML + CSS',
            kind: 'Front-end',
            icon: 'html-css',
            text: 'Layouts responsivos e cuidadosos, do zero, sem depender de template.',
            chips: ['HTML', 'CSS', 'Acessibilidade'],
          },
          {
            id: 'tailwind',
            name: 'Tailwind CSS',
            kind: 'Front-end',
            icon: 'tailwind',
            text: 'Estilização utilitária para interfaces responsivas. É o framework de estilo deste portfólio.',
            chips: ['Tailwind CSS', 'Design tokens', 'Responsivo'],
          },
          {
            id: 'react',
            name: 'React',
            kind: 'Front-end',
            icon: 'react',
            text: 'Interfaces em componentes. Base deste portfólio e da landing page da Veritus Tech.',
            chips: ['React', 'Vite', 'Componentes'],
          },
          {
            id: 'javascript',
            name: 'JavaScript',
            kind: 'Front-end',
            icon: 'javascript',
            text: 'Interatividade no navegador: menus, abas, cópia para a área de transferência e animações.',
            chips: ['JavaScript', 'DOM', 'TypeScript'],
          },
        ],
      },
      {
        title: 'Análise de dados',
        items: [
          {
            id: 'python',
            name: 'Python',
            kind: 'Dados · Automação',
            icon: 'python',
            text: 'Tratamento de bases com pandas e automações de planilhas e relatórios.',
            chips: ['pandas', 'Automação', 'Relatórios'],
          },
          {
            id: 'sql',
            name: 'SQL',
            kind: 'Dados',
            icon: 'sql',
            text: 'Consultas para extrair, filtrar e cruzar dados. Foco da graduação em Banco de Dados, em andamento.',
            chips: ['SQL', 'Consultas', 'Modelagem'],
          },
          {
            id: 'excel',
            name: 'Excel + Power Query',
            kind: 'Dados · ETL',
            icon: 'excel',
            text: 'Tratamento e consolidação de bases. Ferramenta do ETL que consolida as filas SIGA de 5 centrais de regulação.',
            chips: ['Power Query M', 'Excel', 'ETL'],
          },
          {
            id: 'powerbi',
            name: 'Power BI',
            kind: 'Dados · BI',
            icon: 'powerbi',
            text: 'Dashboards e relatórios visuais a partir de bases tratadas.',
            chips: ['Power BI', 'Dashboards'],
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
            text: 'IA como apoio para acelerar automações, código e documentação dos projetos.',
            chips: ['IA', 'Automação', 'Produtividade'],
          },
          {
            id: 'git',
            name: 'Git + GitHub',
            kind: 'Ferramenta',
            icon: 'git',
            text: 'Versionamento e publicação dos projetos.',
            chips: ['Git', 'GitHub', 'Vercel'],
            links: [{ label: 'Ver GitHub', href: 'https://github.com/chmonteiro', primary: true }],
          },
        ],
      },
    ],
  },
  {
    id: 'projetos',
    label: 'Projetos',
    groups: [
      {
        items: [
          {
            id: 'ls-plataform',
            name: 'LS Plataform',
            code: 'LS',
            kind: 'Sistema web · Dados',
            text: 'Plataforma web de indicadores comerciais. Importa os relatórios do ERP, consolida tudo em uma base única com Python + pandas (as consultas do Power Query do painel comercial portadas para código) e mostra os indicadores em telas com filtros, gráficos, mapa de faturamento por estado, notificações e exportação para Excel. Tem login com controle de acesso por perfil.',
            chips: ['Python', 'pandas', 'FastAPI', 'Supabase', 'Tailwind CSS', 'Alpine.js', 'Chart.js'],
            note: 'Sistema de cliente com login: código e acesso privados.',
          },
          {
            id: 'veritus',
            name: 'Veritus Tech',
            code: 'VT',
            kind: 'Landing page',
            text: 'Landing page da Veritus Tech, empresa de São Paulo de infraestrutura de TI, suporte técnico, segurança e desenvolvimento web para pequenas e médias empresas. Apresenta os serviços, reforça a credibilidade da marca e conduz o visitante até o contato. Construída do zero em React + Vite com CSS próprio, tema escuro, layout responsivo e metadados para busca e redes sociais.',
            chips: ['React', 'Vite', 'CSS', 'Vercel'],
            links: [
              { label: 'Visitar site', href: 'https://veritus-tech.vercel.app', primary: true },
              { label: 'Código', href: 'https://github.com/chmonteiro/Veritus-Tech' },
            ],
          },
          {
            id: 'beatriz',
            name: 'Portfólio Beatriz Tomagnini',
            code: 'BT',
            kind: 'Landing page',
            text: 'Landing page de portfólio de Beatriz Tomagnini, profissional de Jornalismo, Comunicação e Moda.',
            chips: ['JavaScript', 'Vercel'],
            links: [{ label: 'Visitar site', href: 'https://portfolio-beatriz-tomagnini.vercel.app', primary: true }],
            note: 'Código em repositório privado.',
          },
          {
            id: 'siresp',
            name: 'Automação de relatórios de saúde',
            code: 'SUS',
            kind: 'Automação · Dados',
            text: 'Tratamento e consolidação dos relatórios de cota de consultas e exames do SIRESP em uma base única, pronta para analisar aproveitamento e absenteísmo.',
            chips: ['Automação', 'Excel', 'Saúde'],
            note: 'Projeto interno: sem link público.',
          },
          {
            id: 'siga',
            name: 'Consolidação das filas SIGA',
            code: 'ETL',
            kind: 'ETL · Power Query',
            text: 'ETL em Power Query (M) que consolida as filas do sistema SIGA de 5 centrais de regulação em uma base única para relatórios.',
            chips: ['Power Query M', 'Excel', 'ETL'],
            note: 'Projeto interno: sem link público.',
          },
        ],
      },
    ],
  },
  {
    id: 'faculdade',
    label: 'Faculdade',
    groups: [
      {
        items: [
          {
            id: 'banco-de-dados',
            name: 'Banco de Dados',
            code: 'DB',
            kind: 'Graduação · Faculdade Descomplica',
            text: 'Graduação em Banco de Dados, em andamento (1º período).',
            chips: ['SQL', 'Modelagem', 'Em curso'],
          },
        ],
      },
    ],
  },
]
