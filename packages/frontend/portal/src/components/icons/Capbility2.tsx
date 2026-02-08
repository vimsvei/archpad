import * as React from 'react';
import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';
const SvgCapbility2 = (
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
    <rect x={2.5} y={15.5} width={6} height={6} stroke="currentColor" />
    <rect x={15.5} y={15.5} width={6} height={6} stroke="currentColor" />
    <rect x={15.5} y={8.5} width={6} height={7} stroke="currentColor" />
    <rect x={15.5} y={2.5} width={6} height={6} stroke="currentColor" />
    <rect x={8.5} y={15.5} width={7} height={6} stroke="currentColor" />
    <rect x={8.5} y={8.5} width={7} height={7} stroke="currentColor" />
  </svg>
);
const ForwardRef = forwardRef(SvgCapbility2);
export default ForwardRef;
