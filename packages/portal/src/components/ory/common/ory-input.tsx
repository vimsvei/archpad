import * as React from 'react'

import { Input } from '@/components/ui/input'

// Wrapper around Input that ensures forwardRef support for Ory Elements (react-hook-form).
// This wrapper isolates OryInput from potential changes in ui/input.tsx when updating component libraries.
export const OryInput = React.forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>(
  (props, ref) => {
    return <Input ref={ref} {...props} />
  }
)

OryInput.displayName = 'OryInput'

