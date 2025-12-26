import * as React from 'react';
import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';
const SvgGap = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <circle cx={12} cy={12} r={7.5} stroke="currentColor" />
    <line x1={2} y1={14.5} x2={22} y2={14.5} stroke="currentColor" />
    <line x1={2} y1={9.5} x2={22} y2={9.5} stroke="currentColor" />
  </svg>
);
const ForwardRef = forwardRef(SvgGap);
export default ForwardRef;
