import * as React from 'react';
import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';
const SvgConstraint = (
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
      d="M22 4L17 19H2L7 4H22ZM6.38672 18H16.2793L20.6133 5H10.7207L6.38672 18ZM3.38672 18H5.33301L9.66699 5H7.7207L3.38672 18Z"
      fill="currentColor"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgConstraint);
export default ForwardRef;
