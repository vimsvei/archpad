import * as React from 'react';
import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';
const SvgNetwork = (
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
    <circle cx={15} cy={19} r={2.5} fill="currentColor" stroke="currentColor" />
    <circle cx={10} cy={5} r={2.5} fill="currentColor" stroke="currentColor" />
    <circle cx={20} cy={5} r={2.5} fill="currentColor" stroke="currentColor" />
    <path
      d="M19.291 5.5L14.6475 18.5H5.70898L10.3525 5.5H19.291Z"
      stroke="currentColor"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgNetwork);
export default ForwardRef;
