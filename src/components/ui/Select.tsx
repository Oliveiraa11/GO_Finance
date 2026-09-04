import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn('focus-ring h-10 w-full rounded-control border border-border bg-canvas px-3 text-sm text-text', className)} {...props} />
}
