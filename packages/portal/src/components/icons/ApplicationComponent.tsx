import * as React from 'react';
import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';
const SvgApplicationComponent = (
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
      d="M22 22H8V15H9V21H21V3H9V5H8V2H22V22ZM9 11H8V9H9V11Z"
      fill="currentColor"
    />
    <rect x={2.5} y={11.5} width={9} height={3} stroke="currentColor" />
    <rect x={2.5} y={5.5} width={9} height={3} stroke="currentColor" />
  </svg>
);
const ForwardRef = forwardRef(SvgApplicationComponent);
export default ForwardRef;
