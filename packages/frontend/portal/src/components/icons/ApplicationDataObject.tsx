import * as React from 'react';
import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';
const SvgApplicationDataObject = (
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
    <rect x={2.5} y={6.5} width={19} height={15} stroke="currentColor" />
    <rect x={2.5} y={2.5} width={19} height={4} stroke="currentColor" />
  </svg>
);
const ForwardRef = forwardRef(SvgApplicationDataObject);
export default ForwardRef;
