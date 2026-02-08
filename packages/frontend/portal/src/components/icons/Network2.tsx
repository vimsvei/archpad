import * as React from 'react';
import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';
const SvgNetwork2 = (
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
    <circle cx={5} cy={19} r={2.5} fill="currentColor" stroke="currentColor" />
    <circle cx={16} cy={19} r={2.5} fill="currentColor" stroke="currentColor" />
    <circle cx={8} cy={5} r={2.5} fill="currentColor" stroke="currentColor" />
    <circle cx={19} cy={5} r={2.5} fill="currentColor" stroke="currentColor" />
    <path
      d="M18.3809 5.5L15.5957 18.5H5.61914L8.4043 5.5H18.3809Z"
      stroke="currentColor"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgNetwork2);
export default ForwardRef;
