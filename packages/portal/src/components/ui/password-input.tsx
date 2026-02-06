"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import zxcvbn from "zxcvbn"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

export interface PasswordInputProps extends Omit<React.ComponentProps<typeof Input>, "type"> {
  showStrength?: boolean
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showStrength = false, value, "aria-invalid": ariaInvalid, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [internalRef, setInternalRef] = React.useState<HTMLInputElement | null>(null)

    const mergedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        setInternalRef(node)
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref]
    )

    const str = typeof value === "string" ? value : ""
    const strength = React.useMemo(() => {
      if (!showStrength || !str) return null
      return zxcvbn(str)
    }, [showStrength, str])

    const scorePercent = strength ? Math.min(100, (strength.score + 1) * 25) : 0
    const progressBarColor =
      strength && strength.score < 2
        ? "[&>div]:bg-destructive"
        : strength && strength.score < 4
          ? "[&>div]:bg-amber-500"
          : "[&>div]:bg-green-500"

    return (
      <div className="relative">
        <Input
          ref={mergedRef}
          type={showPassword ? "text" : "password"}
          value={value}
          aria-invalid={ariaInvalid}
          className={cn("pr-10", className)}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          tabIndex={-1}
          onClick={() => setShowPassword((p) => !p)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
        {showStrength && str.length > 0 && (
          <div className="mt-1.5 space-y-1">
            <Progress
              value={scorePercent}
              className={cn("h-1.5 [&>div]:transition-colors", progressBarColor)}
            />
            {strength && strength.feedback.warning && (
              <p className="text-muted-foreground text-xs">{strength.feedback.warning}</p>
            )}
          </div>
        )}
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
