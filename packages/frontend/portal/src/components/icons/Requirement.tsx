import * as React from 'react';
import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';
const SvgRequirement = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    width="1em"
    height="1em"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M21.3057 4.5L16.6396 18.5H2.69434L7.36035 4.5H21.3057Z"
      stroke="currentColor"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgRequirement);
export default ForwardRef;
