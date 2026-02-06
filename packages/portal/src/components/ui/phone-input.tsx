"use client"

import * as React from "react"
import {
  PhoneInput as LibPhoneInput,
  type PhoneInputProps,
  type PhoneInputRefType,
} from "react-international-phone"

import { cn } from "@/lib/utils"

const inputBaseClasses = [
  "placeholder:text-muted-foreground",
  "selection:bg-primary selection:text-primary-foreground",
  "dark:bg-input/30 border-input",
  "h-9 w-full min-w-0 rounded-r-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
].join(" ")

export interface PhoneInputComponentProps
  extends Omit<PhoneInputProps, "className" | "inputClassName"> {
  className?: string
  inputClassName?: string
}

const PhoneInput = React.forwardRef<PhoneInputRefType, PhoneInputComponentProps>(
  function PhoneInput({ className, inputClassName, inputProps, ...props }, ref) {
    return (
      <div className={cn("phone-input-theme w-full", className)}>
        <LibPhoneInput
          ref={ref}
          {...props}
          inputClassName={cn(inputBaseClasses, inputClassName)}
          inputProps={{
            "data-slot": "input",
            ...inputProps,
          }}
        />
      </div>
    )
  }
)

export { PhoneInput }
