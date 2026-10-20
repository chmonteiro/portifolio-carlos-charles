import { motion } from 'motion/react'

export function AttributeBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex justify-between gap-4 text-sm">
        <span>{label}</span>
        <span className="font-mono text-xs text-muted">{value}</span>
      </div>
      <div
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className="h-1.5 overflow-hidden rounded-full bg-line"
      >
        <motion.div
          className="bar-fill h-full origin-left rounded-full"
          style={{ width: `${value}%` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
