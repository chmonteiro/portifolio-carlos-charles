import type { InventoryItem } from '../../data/profile'
import { ItemIcon } from './ItemIcon'

// No celular os slots ficam mais baixos (4:3) para a grade não esticar a página.
const slotBase = 'aspect-[4/3] rounded-[14px] hud:aspect-square'

type Props = { item: InventoryItem; active: boolean; onSelect: () => void }

/* Slot do inventário: ícone de 46px centralizado + nome com 2 linhas reservadas. */
export function Slot({ item, active, onSelect }: Props) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={`${slotBase} flex w-full flex-col items-center justify-center gap-2 border p-2 transition duration-150 ${
        active ? 'border-accent bg-accent/7' : 'border-line bg-surface/40 hover:border-muted'
      }`}
    >
      {item.icon ? (
        <ItemIcon icon={item.icon} />
      ) : (
        <span aria-hidden className="flex h-[46px] items-center font-display text-xl font-extrabold text-accent">
          {item.code}
        </span>
      )}
      <span className="line-clamp-2 min-h-[2lh] text-center text-xs leading-tight">{item.name}</span>
    </button>
  )
}

export const EmptySlot = () => <li aria-hidden className={`${slotBase} border border-dashed border-line/35`} />
