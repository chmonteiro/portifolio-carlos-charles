import type { ComponentProps } from 'react'

/* Painel de vidro padrão (gradiente branco sutil, borda --line, raio 18px). */
export const Panel = ({ className = '', ...rest }: ComponentProps<'div'>) => <div className={`glass p-5 sm:p-6 ${className}`} {...rest} />
