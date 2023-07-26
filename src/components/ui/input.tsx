import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  buttonLeft?: React.ReactNode;
  buttonRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  buttonLeftClassName?: string
  buttonRightClassName?: string
}



const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, buttonLeft, iconLeft, iconRight, buttonRight, buttonLeftClassName,buttonRightClassName, ...props }, ref) => {
    return (
      <div className="flex relative w-full">
        {buttonLeft && <button className={cn(" pl-2 flex items-center ",  buttonLeftClassName)}>{buttonLeft}</button>}
        {iconLeft && <div className="absolute left-2 inset-y-0  pl-2 flex items-center pointer-events-none">{iconLeft}</div>}
        <input
          type={type}
          className={cn(
            `font-semibold sm:text-lg text-base focus:border-blue-400 border w-full border-gray-300 transition-all duration-500 px-2 rounded-lg ${iconLeft ? "pl-12" : ""} ${iconRight ? "pr-12" : ""}`,
            className
          )}
          ref={ref}
          {...props}

        />
        {iconRight && <div className="absolute right-2 inset-y-0  pl-2 flex items-center pointer-events-none">{iconRight}</div>}
        {buttonRight && <Button className={cn(" flex items-center rounded-l-none",  buttonRightClassName)}>{buttonRight}</Button>}

      </div>

    )
  }
)
Input.displayName = "Input"

export { Input }
