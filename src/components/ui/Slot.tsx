import type { Tech } from '../../data/profile'
import { ItemIcon } from './ItemIcon'

type Props = { item: Tech; active: boolean; onSelect: () => void }

/* Slot do inventário: ícone de 46px centralizado + nome com 2 linhas reservadas.
   No celular fica mais baixo (4:3) para a grade não esticar a página. */
export function Slot({ item, active, onSelect }: Props) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={`flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-[14px] border p-2 transition duration-150 hud:aspect-square ${
        active ? 'border-accent bg-accent/7' : 'border-line bg-surface/40 hover:border-muted'
      }`}
    >
      <ItemIcon icon={item.icon} />
      <span className="line-clamp-2 min-h-[2lh] text-center text-xs leading-tight">{item.name}</span>
    </button>
  )
}
