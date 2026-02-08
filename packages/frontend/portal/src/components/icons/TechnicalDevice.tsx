import * as React from 'react';
import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';
const SvgTechnicalDevice = (
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
      d="M18.7168 17.5L21.1172 21.5H2.88281L5.2832 17.5H18.7168Z"
      stroke="currentColor"
    />
    <rect
      x={2.5}
      y={3.5}
      width={19}
      height={14}
      rx={2.5}
      stroke="currentColor"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgTechnicalDevice);
export default ForwardRef;
