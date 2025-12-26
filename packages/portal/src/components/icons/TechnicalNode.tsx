import * as React from 'react';
import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';
const SvgTechnicalNode = (
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
    <rect x={2.5} y={7.5} width={14} height={14} stroke="currentColor" />
    <path
      d="M20.793 2.5L16.793 6.5H3.20703L7.20703 2.5H20.793Z"
      stroke="currentColor"
    />
    <path
      d="M21.5 16.793L17.5 20.793V7.20703L21.5 3.20703V16.793Z"
      stroke="currentColor"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgTechnicalNode);
export default ForwardRef;
