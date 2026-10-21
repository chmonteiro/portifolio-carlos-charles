import photo from '../../assets/carlos-charles.webp'
import { attributes, bio, missions, profile } from '../../data/profile'
import { AttributeBar } from '../ui/AttributeBar'
import { GroupTitle } from '../ui/Eyebrow'
import { Panel } from '../ui/Panel'
import { Phase } from '../layout/Phase'

/* Converte **trecho** em destaque laranja. */
const highlight = (text: string) =>
  text.split(/\*\*(.+?)\*\*/).map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold text-accent">
        {part}
      </strong>
    ) : (
      part
    ),
  )

const sheet = [
  ['Classe', profile.role],
  ['Região', profile.region],
  ['Guilda atual', profile.guild],
  ['Especialidade', profile.specialty],
]

/* Fase 01: ficha do personagem, bio, atributos e diário de missões. */
export function Character() {
  return (
    <Phase id="personagem" eyebrow="Fase 01 · Personagem" title="Quem está jogando">
      <div className="grid gap-4 split:grid-cols-[320px_minmax(0,1fr)]">
        <Panel className="split:row-span-2">
          <div className="relative overflow-hidden rounded-2xl">
            <img src={photo} alt="Foto de Carlos Charles" width={640} height={640} className="aspect-square w-full object-cover" />
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/80 to-transparent" />
            <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-bg/80 px-2.5 py-1 font-mono text-[11px] text-cool">
              <span aria-hidden className="size-2 rounded-full bg-cool" />
              {profile.status}
            </span>
            <span className="absolute bottom-3 left-3 rounded-full bg-accent px-2.5 py-1 font-mono text-[11px] text-bg">{profile.level}</span>
          </div>
          <p className="mt-5 font-display text-xl font-bold">{profile.name}</p>
          <dl className="mt-4 space-y-2 text-sm">
            {sheet.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-muted">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel className="space-y-3 text-[15px] leading-[1.6] sm:text-base">
          {bio.map((p, i) => (
            <p key={i} className={i === 0 ? 'text-fg' : 'text-fg/85'}>
              {highlight(p)}
            </p>
          ))}
        </Panel>

        <Panel>
          <GroupTitle>Atributos</GroupTitle>
          <div className="mt-4 space-y-4">
            {attributes.map((a) => (
              <AttributeBar key={a.label} {...a} />
            ))}
          </div>
        </Panel>

        <Panel className="split:col-span-2">
          <GroupTitle>Diário de missões</GroupTitle>
          <ol className="mt-2">
            {missions.map((m) => (
              <li key={m.org} className="flex gap-4 border-b border-line py-4 last:border-0 last:pb-0">
                <span
                  aria-hidden
                  className={`mt-1 size-2.5 shrink-0 rounded-full ${m.active ? 'bg-cool' : 'border-[1.5px] border-muted'}`}
                />
                <div>
                  <p className="font-mono text-[10px] tracking-[.12em] text-muted uppercase">{m.when}</p>
                  <p className="mt-1 text-[15px] leading-[1.5]">
                    <strong className="font-bold">{m.org}</strong> · {m.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </Phase>
  )
}
