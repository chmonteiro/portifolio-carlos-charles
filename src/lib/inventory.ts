/* Quantos slots vazios completam a grade em múltiplos de `cols` (abas Projetos e Faculdade). */
export const emptySlots = (count: number, cols = 4) => (count === 0 ? cols : (cols - (count % cols)) % cols)
