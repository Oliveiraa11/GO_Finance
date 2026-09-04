import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-canvas hover:bg-primary-soft border-primary',
  secondary: 'bg-surface border-border text-text hover:bg-surface-interactive hover:border-border-strong',
  ghost: 'bg-transparent border-transparent text-muted hover:bg-surface-interactive hover:text-text',
}

export function Button({ className, variant = 'primary', type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={cn('focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-control border px-4 text-sm font-semibold transition active:scale-[.98] disabled:pointer-events-none disabled:opacity-50', variants[variant], className)} {...props} />
}
