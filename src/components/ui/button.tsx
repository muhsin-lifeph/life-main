import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { LucideRefreshCw, RefreshCcwIcon, RefreshCwOffIcon } from "lucide-react"
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md duration-200 transition-all ",
  {
    variants: {
      variant: {
        default: "bg-primary disabled:bg-blue-400 disabled:cursor-not-allowed text-white p-2 rounded-lg hover:bg-blue-500",
        outline:
          "btn-primary",
        ghost: "border-[#39f] border hover:border-slate-100 text-[#39f]",
        normal: "bg-slate-100",
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
  isLoading?: boolean
  disableBtn?: boolean
  iconLeft?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, isLoading, disableBtn, iconLeft, ...props }, ref) => {

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={isLoading || disableBtn}
      >
        {isLoading ? null : iconLeft ? <span className="mr-2">{iconLeft}</span> : null}
        {isLoading ? <LucideRefreshCw className='mr-2 h-3 w-3 animate-spin' /> : null}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }


