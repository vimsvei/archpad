import * as React from 'react';
import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';
const SvgCapbility = (
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
    <rect x={1.5} y={15.5} width={7} height={7} stroke="currentColor" />
    <rect x={8.5} y={15.5} width={7} height={7} stroke="currentColor" />
    <rect x={15.5} y={15.5} width={7} height={7} stroke="currentColor" />
    <rect x={15.5} y={8.5} width={7} height={7} stroke="currentColor" />
    <rect x={15.5} y={1.5} width={7} height={7} stroke="currentColor" />
    <rect x={8.5} y={8.5} width={7} height={7} stroke="currentColor" />
  </svg>
);
const ForwardRef = forwardRef(SvgCapbility);
export default ForwardRef;
