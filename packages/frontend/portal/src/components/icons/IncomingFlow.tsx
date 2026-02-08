import * as React from 'react';
import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';
const SvgIncomingFlow = (
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
      d="M2 9H1V11H2V10V9ZM11.7071 10.7071C12.0976 10.3166 12.0976 9.68342 11.7071 9.29289L5.34315 2.92893C4.95262 2.53841 4.31946 2.53841 3.92893 2.92893C3.53841 3.31946 3.53841 3.95262 3.92893 4.34315L9.58579 10L3.92893 15.6569C3.53841 16.0474 3.53841 16.6805 3.92893 17.0711C4.31946 17.4616 4.95262 17.4616 5.34315 17.0711L11.7071 10.7071ZM2 10V11H11V10V9H2V10Z"
      fill="currentColor"
    />
    <rect
      x={13}
      y={3}
      width={8}
      height={18}
      rx={1}
      stroke="currentColor"
      strokeWidth={2}
    />
    <line x1={8.5} y1={17} x2={8.5} y2={22} stroke="currentColor" />
    <line x1={11} y1={19.5} x2={6} y2={19.5} stroke="currentColor" />
  </svg>
);
const ForwardRef = forwardRef(SvgIncomingFlow);
export default ForwardRef;
