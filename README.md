# Portifólio - Carlos Charles · *Carlos Charles Quest*

Portfólio interativo com conceito de jogo: o visitante aperta **Iniciar** e avança por fases para conhecer o personagem, abrir o inventário e chamar para uma party. Implementa o *Protótipo de alta fidelidade v2 (20/10/2026)*.

| Fase | Seção | O que tem |
| --- | --- | --- |
| 00 | Início | Proposta de valor, "Iniciar jornada" (botão ou tecla **Enter** no topo), atalhos de save |
| 01 | Personagem | Ficha com foto, bio, 5 barras de atributos e diário de missões |
| 02 | Inventário | Abas Stacks / Projetos / Faculdade, grade de slots e painel de descrição com links |
| 03 | Contato | LinkedIn, GitHub e e-mail (copiar com fallback + mailto) |
| Fim | Novo jogo+ | "Jogar de novo" volta ao Início |

O **HUD fixo** mostra a fase visível (IntersectionObserver) e uma barra de XP com o percentual da página percorrido.

## Tecnologias

- React 19 + TypeScript, Vite 8
- Tailwind CSS 4 (tokens do protótipo em `src/styles/index.css` via `@theme`)
- Motion (animações de entrada, barras, troca de descrição) com `reducedMotion="user"`
- Lucide React (ícones de interface) e Devicon (logos oficiais das stacks; SQL, Excel, Power BI e IA desenhados à mão)
- Vitest, ESLint (typescript-eslint, react-hooks)
- Fontes Google: Unbounded, Manrope, JetBrains Mono

## Pré-requisitos

Node.js 20.19+ ou 22+ e npm.

## Comandos

```bash
npm install        # instala dependências
npm run dev        # servidor de desenvolvimento (http://localhost:5173)
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build localmente
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm test           # testes (Vitest)
```

## Estrutura

```
src/
├── data/profile.ts          # TODO o conteúdo editável (perfil, bio, atributos, missões, inventário, links)
├── components/
│   ├── layout/              # Hud (barra fixa) e Phase (seção/fase com animação de entrada)
│   ├── sections/            # Hero, Character, Inventory, Contact, EndBanner
│   └── ui/                  # Button, ExternalLink, Eyebrow, Panel, Chip, Slot, AttributeBar, ItemIcon, WizardLogo
├── hooks/                   # useActivePhase, useScrollProgress
├── lib/                     # scroll suave, cópia para a área de transferência, grade de slots (+ testes)
├── styles/index.css         # Tailwind + design tokens + fundo do mapa e painéis de vidro
└── assets/                  # foto do personagem
public/favicon.svg           # logo de mago
.github/workflows/deploy.yml # build + deploy no GitHub Pages
```

Página única, sem rotas: a navegação é por âncoras (`#inicio`, `#personagem`, `#inventario`, `#contato`), como define o protótipo.

## Como atualizar o conteúdo

Tudo fica em **`src/data/profile.ts`**:

- **Novo projeto**: adicione um item no grupo da aba `projetos` com `id`, `name`, `code` (sigla do slot), `kind`, `text`, `chips` e `links` (`primary: true` para o botão laranja). Projetos sem link público usam `note`.
- **Nova stack**: adicione no grupo certo da aba `stacks` com um `icon`. Para um ícone novo, importe o SVG do Devicon em `src/components/ui/ItemIcon.tsx`.
- **Atributos, missões, bio, links**: arrays e objetos no mesmo arquivo. Na bio, `**texto**` vira destaque laranja.
- **Foto**: substitua `src/assets/carlos-charles.webp` (quadrada).

As contagens das abas e os slots vazios tracejados (múltiplos de 4) são calculados automaticamente.

## Integrações externas

Nenhuma credencial é necessária. Não há formulário de contato (o protótipo define contato por LinkedIn, GitHub e e-mail direto), então não existe backend nem chave de API. Se um formulário for adicionado no futuro, use um serviço com variável de ambiente (`VITE_*` apenas para chaves públicas) e nunca commite `.env`.

## Publicação

**GitHub Pages** (configurado): em *Settings → Pages → Build and deployment*, escolha **GitHub Actions**. Cada push na `main` roda lint, testes e build, e publica `dist/`. O `base: './'` no `vite.config.ts` faz o mesmo build funcionar em subpasta (`usuario.github.io/portfolio-carlos-charles/`) ou em domínio próprio.

**Vercel** (alternativa): importe o repositório; framework *Vite*, build `npm run build`, saída `dist`.

## Acessibilidade e desempenho

- Abas com `role="tab"`/`aria-selected` e setas/Home/End; slots com `aria-pressed`; descrição com `aria-live`; barras com `role="meter"`.
- Foco visível laranja (2px, offset 3px); link "Pular para o conteúdo"; foco acompanha a navegação do HUD.
- `prefers-reduced-motion`: desliga scroll suave, transições e deslocamentos.
- Sem rolagem horizontal em 390px; quebras em 640px (HUD compacto) e 820px (2 colunas → 1).

## Decisões em relação ao protótipo

- O protótipo previa "HTML com CSS e JS puros"; a implementação usa React + Tailwind CSS por requisito do projeto, mantendo os mesmos tokens, layout e comportamentos.
- **Power BI** foi adicionado às stacks (Análise de dados), por isso a aba mostra 10 itens em vez de 9.
- Veritus Tech: a descrição foi conferida com o repositório público (React + Vite com CSS próprio).
- Portfólio Beatriz: o repositório é privado, então só o link do site é exibido.

## Pendências de conteúdo (pág. 17 do protótipo)

- [ ] Validar textos dos projetos (Veritus Tech, Portfólio Beatriz, SIRESP, SIGA).
- [ ] Validar notas dos atributos (Excel 90, Python 75, JS 72, IA 70, SQL 55 são estimativas).
- [ ] Confirmar se as automações SIRESP e SIGA podem ser exibidas publicamente.
- [ ] Adicionar capturas do Veritus Tech e do Portfólio Beatriz no painel de descrição.
- [ ] Definir hospedagem final e domínio próprio.
- [ ] Opcional: botão para baixar o CV em PDF na fase Contato.
