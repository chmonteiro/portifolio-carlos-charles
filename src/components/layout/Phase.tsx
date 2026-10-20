import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Eyebrow } from '../ui/Eyebrow'

type Props = { id: string; eyebrow: string; title?: ReactNode; children: ReactNode; className?: string }

/* Uma fase = uma seção da página única. tabIndex -1 permite mover o foco ao navegar pelo HUD. */
export function Phase({ id, eyebrow, title, children, className = 'py-24' }: Props) {
  return (
    <section id={id} tabIndex={-1} aria-labelledby={`${id}-title`} className={`outline-none ${className}`}>
      <motion.div
        className="mx-auto w-full max-w-[1080px] px-[max(16px,env(safe-area-inset-left))]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Eyebrow>{eyebrow}</Eyebrow>
        {title && (
          <h2 id={`${id}-title`} className="mt-5 mb-8 font-display text-[clamp(26px,4.4vw,42px)] leading-[1.15] font-bold">
            {title}
          </h2>
        )}
        {children}
      </motion.div>
    </section>
  )
}
