import { useRef, useState } from 'react'
import { Check, Copy, Mail } from 'lucide-react'
import { links, profile } from '../../data/profile'
import { copyText } from '../../lib/clipboard'
import { Button, ExternalLink } from '../ui/Button'
import { Panel } from '../ui/Panel'
import { Phase } from '../layout/Phase'

type CopyState = 'idle' | 'copied' | 'manual'

function Portal({ glyph, title, handle, children }: { glyph: string; title: string; handle: React.ReactNode; children: React.ReactNode }) {
  return (
    <Panel className="flex flex-col">
      <span aria-hidden className="grid size-8 place-items-center rounded-lg bg-surface font-mono text-xs font-bold text-accent">
        {glyph}
      </span>
      <h3 className="mt-4 font-display text-base font-bold">{title}</h3>
      <div className="mt-2 font-mono text-xs break-all text-muted">{handle}</div>
      <div className="mt-5 flex flex-wrap gap-2">{children}</div>
    </Panel>
  )
}

/* Fase 04: portais de contato. Sem formulário: os canais são LinkedIn, GitHub e e-mail direto. */
export function Contact() {
  const [copy, setCopy] = useState<CopyState>('idle')
  const emailRef = useRef<HTMLSpanElement>(null)

  const onCopy = async () => {
    const ok = await copyText(profile.email, emailRef.current)
    setCopy(ok ? 'copied' : 'manual')
    if (ok) setTimeout(() => setCopy('idle'), 2500)
  }

  return (
    <Phase id="contato" eyebrow="Fase 04 · Contato" title="Bora formar uma equipe?">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
        <Portal glyph="in" title="LinkedIn" handle="linkedin.com/in/carlos-charles">
          <ExternalLink href={links.linkedin}>Abrir perfil</ExternalLink>
        </Portal>
        <Portal glyph="</>" title="GitHub" handle="github.com/chmonteiro">
          <ExternalLink href={links.github}>Ver repositórios</ExternalLink>
        </Portal>
        <Portal
          glyph="@"
          title="E-mail"
          handle={
            <span ref={emailRef} className="select-all">
              {profile.email}
            </span>
          }
        >
          <Button size="sm" onClick={onCopy}>
            {copy === 'copied' ? <Check aria-hidden className="size-3.5" /> : <Copy aria-hidden className="size-3.5" />}
            {copy === 'copied' ? 'Copiado!' : 'Copiar e-mail'}
          </Button>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[13px] hud:py-2 font-bold transition duration-150 hover:border-muted"
          >
            <Mail aria-hidden className="size-3.5" /> Escrever
          </a>
          <p role="status" className="w-full font-mono text-[11px] text-cool empty:hidden">
            {copy === 'manual' && 'O navegador bloqueou a cópia. O e-mail está selecionado: use Ctrl+C (⌘+C no Mac).'}
          </p>
        </Portal>
      </div>
    </Phase>
  )
}
