import { describe, expect, it } from 'vitest'
import { emptySlots } from './inventory'
import { inventory, links, missions, phases } from '../data/profile'

describe('emptySlots', () => {
  it('completa a grade em múltiplos de 4', () => {
    expect(emptySlots(1)).toBe(3)
    expect(emptySlots(4)).toBe(0)
    expect(emptySlots(5)).toBe(3)
    expect(emptySlots(0)).toBe(4)
  })
})

describe('dados do portfólio', () => {
  const items = inventory.flatMap((t) => t.groups.flatMap((g) => g.items))

  it('ids de itens são únicos', () => {
    expect(new Set(items.map((i) => i.id)).size).toBe(items.length)
  })

  it('todo link externo usa https', () => {
    const hrefs = [...Object.values(links), ...items.flatMap((i) => i.links?.map((l) => l.href) ?? [])]
    for (const href of hrefs) expect(href).toMatch(/^https:\/\//)
  })

  it('cada item tem ícone ou sigla', () => {
    for (const i of items) expect(Boolean(i.icon || i.code)).toBe(true)
  })

  it('fases e missões não estão vazias', () => {
    expect(phases[0].id).toBe('inicio')
    expect(missions.length).toBeGreaterThan(0)
  })
})
