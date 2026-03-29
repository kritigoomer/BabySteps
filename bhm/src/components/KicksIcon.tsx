import React from 'react';
import { Svg, Circle, Path } from 'react-native-svg';

interface KicksIconProps {
  focused: boolean;
  size?: number;
}

export default function KicksIcon({ focused, size = 24 }: KicksIconProps) {
  const color = focused ? '#4C211E' : '#999';

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Baby head */}
      <Circle
        cx="12"
        cy="6"
        r="3"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      {/* Body */}
      <Path
        d="M9 9c0-1 1-2 3-2s3 1 3 2v3c0 1-1 2-3 2s-3-1-3-2v-3z"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      {/* Legs/feet */}
      <Path
        d="M10 14v4c0 1 1 2 2 2s2-1 2-2v-4"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Kicking motion lines */}
      <Path
        d="M14 16l2 1M14 18l2 1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}