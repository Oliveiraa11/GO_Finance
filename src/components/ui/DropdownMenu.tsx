import type { PropsWithChildren, ReactNode } from 'react'

interface DropdownMenuProps extends PropsWithChildren { trigger: ReactNode }

export function DropdownMenu({ trigger, children }: DropdownMenuProps) {
  return <details className="relative"><summary className="list-none cursor-pointer">{trigger}</summary><div className="absolute right-0 z-50 mt-2 min-w-48 rounded-control border border-border-strong bg-surface-interactive p-1 shadow-[0_8px_24px_-4px_rgba(0,0,0,.6)]">{children}</div></details>
}
