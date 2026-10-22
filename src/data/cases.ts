/*
 * Estudos de caso. Cada um segue o mesmo roteiro editorial:
 * visão geral → problema → solução → regras → exemplo → validação → resultados.
 *
 * Fontes: documentação técnica e testes dos próprios projetos.
 * Exemplos marcados como fictícios usam dados inventados para mostrar o processo
 * sem expor informação de saúde ou de cliente. Nenhum número de resultado é estimado.
 */

export type Table = { columns: string[]; rows: string[][] }

export type CaseStudy = {
  slug: string
  code: string
  title: string
  kind: string
  summary: string
  /* "documentacao": estudo publicado parcialmente, com pendências listadas. */
  status: 'publicado' | 'documentacao'
  role: string
  context: string
  proofs: { value: string; label: string }[]
  problem: string[]
  steps: { title: string; text: string }[]
  architecture?: { layer: string; tech: string }[]
  rules: string[]
  example?: { title: string; note: string; before?: Table; after: Table }
  validation: string[]
  results: string[]
  stack: string[]
  confidentiality: string
  pending?: string[]
}

export const cases: CaseStudy[] = [
  {
    slug: 'siresp',
    code: 'SUS',
    title: 'Automação dos relatórios de cota do SIRESP',
    kind: 'Automação · Python · Saúde pública',
    summary:
      'Automação em Python que transforma os relatórios de cota do SIRESP, exportados em layout hierárquico, em uma base analítica pronta para acompanhar aproveitamento e absenteísmo de consultas e exames.',
    status: 'publicado',
    role: 'Desenvolvimento completo: leitura, regras, validação, exportação e documentação.',
    context:
      'O SIRESP é o sistema de regulação da Secretaria da Saúde de São Paulo. Os relatórios de cota mostram, por unidade e especialidade, a oferta de vagas, os agendamentos, as presenças, as ausências e as vagas ainda disponíveis. Essa base alimenta o monitoramento de aproveitamento e absenteísmo.',
    proofs: [
      { value: '100%', label: 'idêntico ao tratamento manual, comparado célula a célula' },
      { value: '2.194 × 23', label: 'linhas × colunas na validação' },
      { value: '~1.140', label: 'linhas de Python documentadas' },
    ],
    problem: [
      'O portal exporta um ".xls" que, na verdade, é HTML em ISO-8859-1, com tabelas aninhadas e tags quebradas.',
      'O layout é hierárquico: unidade e tipo aparecem como cabeçalhos de grupo, e títulos, legendas, linhas de Total e sufixos "+" ficam misturados aos dados.',
      'O nome do arquivo é genérico (Relatorio_cota-<data>.xls) e não informa unidade, período nem perfil.',
      'Dois perfis, Distribuidor e Agendador, cobrem o mesmo período: somá-los duplicaria a oferta.',
      'O tratamento era manual no Excel, com fórmulas e PROCX para parear especialidades com a nomenclatura do SIGA.',
    ],
    steps: [
      { title: 'Detectar o formato', text: 'Os primeiros bytes dizem se o arquivo é Excel real ou HTML disfarçado. A extensão é ignorada.' },
      { title: 'Ler o cabeçalho', text: 'Unidade, período e perfil saem do conteúdo do relatório, nunca do nome do arquivo.' },
      { title: 'Achatar a hierarquia', text: 'Cada linha recebe a unidade executante e o tipo do grupo em que está.' },
      { title: 'Limpar', text: 'Remove títulos, legendas, linhas de Total e vazias, o sufixo "+" e o espaço não separável (\\xa0) dos nomes.' },
      { title: 'Calcular indicadores', text: 'Aproveitamento, % de ausentes e as faixas de aproveitamento e de cotas.' },
      { title: 'Parear com o SIGA', text: 'Dois PROCX encadeados: unidade + especialidade → especialidade e procedimento SIGA → filtro SIGA.' },
      { title: 'Montar e exportar', text: 'Relatório final, abas por perfil, validação e não pareadas em um .xlsx formatado.' },
    ],
    rules: [
      'Célula vazia vale zero na conta, como no Excel; só a divisão por zero fica vazia. Tratar vazio como nulo fazia o resultado divergir em cerca de 28%.',
      'Aproveitamento = Agendamentos ÷ Oferta (vale 1 quando não há oferta e há agendamento). % Ausentes = Ausentes ÷ Agendamentos.',
      'Faixa de cotas de 10 em 10 até 100, de 100 em 100 até 500, e depois "Acima de 500 Cotas".',
      'No de-para, quando a mesma chave tem pareamentos diferentes no histórico, vence o mais recente, não o mais frequente.',
      'Especialidade sem pareamento vai para a aba "Não pareadas". A classificação não é inventada pelo código.',
      'Distribuidor e Agendador nunca são somados. O relatório final usa o Distribuidor e acrescenta só as unidades que existem apenas no Agendador.',
      'As chaves concatenadas removem todos os espaços e preservam acento, hífen e caixa.',
    ],
    example: {
      title: 'Do relatório hierárquico à base analítica',
      note: 'Exemplo com dados fictícios. A unidade e os números foram inventados para mostrar a transformação.',
      before: {
        columns: ['Linha do relatório', 'Oferta', 'Agend.', 'Presenças', 'Ausentes'],
        rows: [
          ['Unidade executante: UNIDADE EXEMPLO', '', '', '', ''],
          ['Tipo: Consulta', '', '', '', ''],
          ['CARDIOLOGIA +', '40', '36', '30', '6'],
          ['DERMATOLOGIA', '20', '22', '18', '4'],
          ['Total', '60', '58', '48', '10'],
        ],
      },
      after: {
        columns: ['Unidade', 'Tipo', 'Especialidade', 'Oferta', 'Agend.', 'Ausentes', 'Aproveitamento', '% Ausentes'],
        rows: [
          ['UNIDADE EXEMPLO', 'Consulta', 'CARDIOLOGIA', '40', '36', '6', '0.90', '0.17'],
          ['UNIDADE EXEMPLO', 'Consulta', 'DERMATOLOGIA', '20', '22', '4', '1.10', '0.18'],
        ],
      },
    },
    validation: [
      'Comparação célula a célula com o tratamento manual em Excel: 2.194 linhas × 23 colunas, 100% idênticas.',
      'Reconciliação das seis colunas numéricas com as linhas Total do próprio relatório bruto.',
      'Aba de validação que compara a oferta distribuída pela Secretaria com a soma das coordenadorias, por unidade e especialidade, e aponta os meses com diferença.',
      'Script separado para verificar se alguma linha com oferta foi perdida no tratamento.',
    ],
    results: [
      'O tratamento manual passa a ser reproduzido por um comando, com resultado idêntico no teste de validação.',
      'Saída padronizada de 23 colunas, pronta para as análises de aproveitamento e absenteísmo.',
      'Diferenças na distribuição de oferta passam a ser apontadas automaticamente, mês a mês.',
      'As regras ficaram documentadas e a automação também roda como skill de agente de IA.',
    ],
    stack: ['Python', 'pandas', 'openpyxl', 'BeautifulSoup', 'Excel', 'IA'],
    confidentiality:
      'Os relatórios contêm dados da rede pública de saúde. Nada real é exibido aqui: o exemplo é fictício e os nomes de unidades foram omitidos.',
    pending: ['Tempo gasto antes e depois da automação: ainda não medido.'],
  },
  {
    slug: 'ls-plataform',
    code: 'LS',
    title: 'LS Plataform: indicadores comerciais',
    kind: 'Sistema web · ETL · API',
    summary:
      'Plataforma web que substitui um painel montado em Power Query: importa os relatórios do ERP, consolida tudo com Python e entrega indicadores comerciais conforme o perfil de acesso de cada usuário.',
    status: 'publicado',
    role: 'Desenvolvimento ponta a ponta: ETL, API, banco de dados, telas, testes e deploy.',
    context:
      'A equipe comercial de um cliente acompanhava faturamento, prazos, contas a receber e clientes a partir de exportações do ERP, tratadas em um painel com 7 consultas do Power Query e conferidas manualmente em uma aba do Excel.',
    proofs: [
      { value: '7', label: 'consultas do Power Query migradas para Python + pandas' },
      { value: '385', label: 'testes automatizados aprovados' },
      { value: '4', label: 'perfis de acesso testados' },
    ],
    problem: [
      'Vários relatórios do ERP (faturamento, prazo, contas a receber, clientes, notas fiscais, entre outros), com nomes de arquivo que mudam a cada envio.',
      'A lógica do painel estava concentrada em 7 consultas do Power Query, e a conferência dos arquivos era manual.',
      'Regras sensíveis, como vencimento em fim de semana ou feriado, precisavam ter uma única definição.',
      'Cada perfil (consultor, gerente, diretoria e administração) deveria ver somente os dados permitidos.',
    ],
    steps: [
      { title: 'Receber os relatórios', text: 'Os arquivos do ERP vão para um armazenamento privado.' },
      { title: 'Identificar pelo conteúdo', text: 'O tipo de cada relatório é descoberto pelo que ele contém; o nome só fornece o que o relatório não imprime.' },
      { title: 'Ler e padronizar', text: 'Um leitor por relatório, com regras comuns de texto, data, representante e produto.' },
      { title: 'Consolidar e conferir', text: 'Base única e conferência arquivo a arquivo: erro de leitura, alerta, sem dados, substituído ou tratado, com o motivo e o que fazer.' },
      { title: 'Calcular indicadores', text: 'Medidas do painel com filtros por representante, ano, mês e produto.' },
      { title: 'Servir pela API', text: 'FastAPI com controle de acesso por perfil, validado na API e no banco.' },
      { title: 'Exibir', text: 'Telas com filtros, gráficos, mapa de faturamento por estado, notificações e exportação para Excel.' },
    ],
    architecture: [
      { layer: 'Front-end', tech: 'HTML, Tailwind CSS, Alpine.js e Chart.js, na Vercel' },
      { layer: 'API e ETL', tech: 'Python, FastAPI e pandas, em Docker no Render' },
      { layer: 'Dados', tech: 'Supabase: PostgreSQL, autenticação e armazenamento de arquivos' },
    ],
    rules: [
      'Um único calendário de dias úteis: vencimento em sábado, domingo ou feriado vale até o próximo dia útil. Nenhuma outra parte do código calcula atraso por conta própria.',
      'A data original do ERP nunca é alterada e é a que aparece em tela e na exportação; a data efetiva só entra no cálculo de situação, atraso e avisos.',
      'Feriados nacionais fixos e móveis (Carnaval, Sexta-feira Santa e Corpus Christi, calculados a partir da Páscoa).',
      'O faturamento do painel é o bruto menos as devoluções do relatório, no mês da venda.',
      'Negar por padrão: cada permissão vale na API e no banco. A tela só esconde o que o perfil não pode usar.',
      'Na exportação para Excel, textos que começam com =, +, - ou @ são gravados como texto, evitando injeção de fórmula.',
    ],
    example: {
      title: 'Vencimento em fim de semana e feriado',
      note: 'Exemplo com títulos fictícios. As datas efetivas e os atrasos foram calculados pela regra real do sistema.',
      after: {
        columns: ['Vencimento no ERP', 'Data efetiva', 'Pago em', 'Situação'],
        rows: [
          ['07/11/2026 (sábado)', '09/11/2026', '09/11/2026', 'Em dia'],
          ['07/11/2026 (sábado)', '09/11/2026', '10/11/2026', '1 dia de atraso'],
          ['20/11/2026 (feriado)', '23/11/2026', '23/11/2026', 'Em dia'],
        ],
      },
    },
    validation: [
      '385 testes automatizados aprovados (pytest), cobrindo indicadores, vencimento em dia útil, importação, permissões e segurança.',
      'Testes de referência comparam a visão geral com valores conferidos no ERP (janeiro a agosto de 2026). Eles dependem dos dados do cliente e, por isso, não rodam fora do ambiente dele.',
      'A cada importação, a conferência arquivo a arquivo mostra o que foi tratado e o que precisa de atenção.',
      'Matriz de permissões testada para os quatro perfis, incluindo tentativas de acesso a dados de outro consultor.',
    ],
    results: [
      'As 7 consultas do Power Query viraram código Python versionado e testado.',
      'A conferência manual no Excel foi substituída por um relatório automático de importação.',
      'Cada perfil acessa somente os seus dados, com login protegido por limite de tentativas no servidor.',
      'Indicadores, gráficos e exportação ficam disponíveis no navegador, sem depender de planilha.',
    ],
    stack: ['Python', 'pandas', 'FastAPI', 'SQL', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'Alpine.js', 'Chart.js', 'Docker', 'pytest'],
    confidentiality:
      'Sistema de cliente com login: código e acesso são privados. Nenhum dado, nome ou valor real é exibido aqui.',
    pending: ['Tempo de atualização do painel antes e depois da plataforma: ainda não medido.', 'Capturas de tela com dados fictícios.'],
  },
  {
    slug: 'siga',
    code: 'ETL',
    title: 'Consolidação das filas do SIGA',
    kind: 'ETL · Power Query · Saúde pública',
    summary:
      'ETL em Power Query (linguagem M) que consolida as filas do sistema SIGA de 5 centrais de regulação em uma base única para relatórios.',
    status: 'documentacao',
    role: 'Construção do ETL em Power Query.',
    context:
      'Trabalho atual na Geosaúde Gerenciadora (desde maio de 2025), na área administrativa em saúde, com foco em dados e relatórios. O SIGA é usado na regulação da saúde pública de São Paulo.',
    proofs: [{ value: '5', label: 'centrais de regulação consolidadas em uma base' }],
    problem: ['As filas das 5 centrais de regulação precisavam ser analisadas em conjunto, em uma única base.'],
    steps: [
      { title: 'Consolidar', text: 'Consultas em Power Query (M) que reúnem as filas das 5 centrais em uma base única.' },
      { title: 'Padronizar a nomenclatura', text: 'Especialidades e procedimentos seguem a nomenclatura do SIGA, a mesma usada no de-para da automação do SIRESP.' },
    ],
    rules: [],
    validation: [],
    results: ['Base única com as filas das 5 centrais, usada nos relatórios.'],
    stack: ['Power Query (M)', 'Excel'],
    confidentiality: 'As filas contêm dados de pacientes. Nenhum dado real é exibido.',
    pending: [
      'Formato e volume dos arquivos de entrada.',
      'Regras de limpeza e padronização aplicadas.',
      'Como a saída é conferida.',
      'Resultados comprováveis, como tempo de atualização ou erros evitados.',
      'Exemplo com dados fictícios e diagrama do fluxo.',
    ],
  },
]

export const caseBySlug = (slug: string) => cases.find((c) => c.slug === slug)
