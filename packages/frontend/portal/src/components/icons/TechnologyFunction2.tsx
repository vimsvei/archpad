import * as React from 'react';
import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';
const SvgTechnologyFunction2 = (
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
      d="M21.5 7.30859V21.1904L12.2236 16.5527L12 16.4414L11.7764 16.5527L2.5 21.1904V7.30859L12 2.55859L21.5 7.30859Z"
      stroke="currentColor"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgTechnologyFunction2);
export default ForwardRef;
