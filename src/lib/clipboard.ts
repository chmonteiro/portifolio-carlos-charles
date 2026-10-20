/*
 * Copia o texto para a área de transferência.
 * Se o navegador bloquear, seleciona o texto do elemento e devolve false,
 * para a interface mostrar a dica "Ctrl+C".
 */
export async function copyText(text: string, fallbackEl?: HTMLElement | null): Promise<boolean> {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('clipboard indisponível')
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    if (fallbackEl) {
      const range = document.createRange()
      range.selectNodeContents(fallbackEl)
      const sel = window.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(range)
    }
    return false
  }
}
