import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary', className)} {...props} />
}
