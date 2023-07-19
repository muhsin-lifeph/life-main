import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md duration-300 transition-all ",
  {
    variants: {
      variant: {
        default: "bg-primary disabled:bg-blue-400 disabled:cursor-not-allowed text-white p-2 rounded-lg hover:bg-blue-500",
        outline:
          "btn-primary",
      },
      size: {
        default: "h-10 py-2 px-4 sm:text-sm text-base",
        sm: "h-9 px-3 rounded-md sm:text-xs text-[10px]",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }


