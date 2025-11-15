import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const buttonVariants =
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background'

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, asChild = false, ...rest } = props
  const Comp = asChild ? Slot : 'button'

  return <Comp className={cn(buttonVariants, className)} ref={ref} {...rest} />
})
Button.displayName = 'Button'

export { Button }

