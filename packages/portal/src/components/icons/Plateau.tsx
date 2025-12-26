import * as React from 'react';
import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';
const SvgPlateau = (
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
    <rect
      x={2.5}
      y={18.5}
      width={15}
      height={3}
      fill="currentColor"
      stroke="currentColor"
    />
    <rect
      x={4.5}
      y={10.5}
      width={15}
      height={3}
      fill="currentColor"
      stroke="currentColor"
    />
    <rect
      x={6.5}
      y={2.5}
      width={15}
      height={3}
      fill="currentColor"
      stroke="currentColor"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgPlateau);
export default ForwardRef;
