import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'

type ButtonVariant = 'default' | 'outline' | 'ghost'
type ButtonSize = 'default' | 'sm' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
}

const baseButton =
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background'

const variantClasses: Record<ButtonVariant, string> = {
  default: '',
  outline:
    'border border-border bg-transparent text-foreground hover:bg-foreground/10 hover:text-foreground',
  ghost: 'border border-transparent bg-transparent text-primary hover:bg-primary/10',
}

const sizeClasses: Record<ButtonSize, string> = {
  default: '',
  sm: 'h-8 px-3 text-xs',
  lg: 'h-12 px-8 text-base',
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    asChild = false,
    variant = 'default',
    size = 'default',
    ...rest
  } = props
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(baseButton, variantClasses[variant], sizeClasses[size], className)}
      ref={ref}
      {...rest}
    />
  )
})
Button.displayName = 'Button'

export { Button }

