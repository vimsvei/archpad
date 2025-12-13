"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type CheckboxProps = Omit<React.ComponentProps<"input">, "type"> & {
  label?: string
}

export function Checkbox({ className, label, ...props }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        className={cn(
          "border-input dark:bg-input/30 text-primary h-4 w-4 rounded-sm border bg-transparent shadow-xs",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      />
      {label ? <span className="text-sm">{label}</span> : null}
    </label>
  )
}

