import type { Table } from '../../data/cases'

/* Tabela de exemplo. Rola dentro do próprio quadro no celular, sem rolar a página. */
export function DataTable({ caption, table }: { caption: string; table: Table }) {
  return (
    <figure className="glass overflow-hidden">
      <figcaption className="border-b border-line px-4 py-2.5 font-mono text-[11px] tracking-[.12em] text-muted uppercase">{caption}</figcaption>
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={caption}>
        <table className="w-full border-collapse font-mono text-xs">
          <thead>
            <tr>
              {table.columns.map((c) => (
                <th key={c} scope="col" className="border-b border-line px-3 py-2.5 text-left font-medium whitespace-nowrap text-cool">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((r, i) => (
              <tr key={i} className="border-b border-line/60 last:border-0">
                {r.map((cell, j) => (
                  <td key={j} className="px-3 py-2.5 whitespace-nowrap text-fg/90">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
