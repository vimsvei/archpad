import * as React from 'react';
import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';
const SvgApplicationInterface = (
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
    <circle cx={14.5} cy={12.5} r={7} stroke="currentColor" />
    <line x1={2} y1={12.5} x2={8} y2={12.5} stroke="currentColor" />
  </svg>
);
const ForwardRef = forwardRef(SvgApplicationInterface);
export default ForwardRef;
