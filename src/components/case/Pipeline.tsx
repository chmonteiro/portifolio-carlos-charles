/* Fluxo da solução como uma sequência numerada e conectada (vertical no celular, em grade no desktop). */
export function Pipeline({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2">
      {steps.map((s, i) => (
        <li key={s.title} className="glass relative flex gap-4 p-4">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent font-mono text-xs font-medium text-bg">{i + 1}</span>
          <div>
            <p className="font-bold">{s.title}</p>
            <p className="mt-1 text-sm leading-[1.6] text-muted">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
