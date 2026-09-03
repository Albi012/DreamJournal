import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

// Line icons matching the "Soft Dawn" direction. All take { size, color, fill }.
const base = (size = 24) => ({ width: size, height: size, viewBox: '0 0 24 24' });

export const MoonIcon = ({ size = 24, color = '#8a5f80', fill = 'none' }) => (
  <Svg {...base(size)}>
    <Path
      d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8Z"
      stroke={color}
      strokeWidth={1.7}
      fill={fill}
      strokeLinejoin="round"
    />
  </Svg>
);

export const EyeIcon = ({ size = 24, color = '#8a5f80' }) => (
  <Svg {...base(size)}>
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={1.7} fill="none" />
    <Path
      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
      stroke={color}
      strokeWidth={1.7}
      fill="none"
    />
  </Svg>
);

export const ChartIcon = ({ size = 24, color = '#8a5f80' }) => (
  <Svg {...base(size)}>
    <Path
      d="M4 20V10M10 20V4M16 20v-7M22 20H2"
      stroke={color}
      strokeWidth={1.7}
      fill="none"
      strokeLinecap="round"
    />
  </Svg>
);

export const BookIcon = ({ size = 24, color = '#8a5f80' }) => (
  <Svg {...base(size)}>
    <Path
      d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"
      stroke={color}
      strokeWidth={1.7}
      fill="none"
      strokeLinejoin="round"
    />
  </Svg>
);

export const PlusIcon = ({ size = 24, color = '#fff' }) => (
  <Svg {...base(size)}>
    <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
  </Svg>
);

export const StarIcon = ({ size = 14, color = '#c98a52', fill = '#c98a52' }) => (
  <Svg {...base(size)}>
    <Path
      d="m12 2 2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 23l-6-3.6 1.4-6.8L2.3 9l6.8-.7z"
      fill={fill}
      stroke={color}
      strokeWidth={0.5}
      strokeLinejoin="round"
    />
  </Svg>
);

export const LockIcon = ({ size = 22, color = '#8a5f80' }) => (
  <Svg {...base(size)}>
    <Path
      d="M6 10V8a6 6 0 1 1 12 0v2M5 10h14v10H5z"
      stroke={color}
      strokeWidth={1.7}
      fill="none"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CheckIcon = ({ size = 18, color = '#7fb89f' }) => (
  <Svg {...base(size)}>
    <Path d="M20 6 9 17l-5-5" stroke={color} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ChevronIcon = ({ size = 20, color = '#bcaaba' }) => (
  <Svg {...base(size)}>
    <Path d="m9 6 6 6-6 6" stroke={color} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
