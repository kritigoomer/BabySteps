import React from 'react';
import { Svg, Circle, Path, Line } from 'react-native-svg';

interface ContractionsIconProps {
  focused: boolean;
  size?: number;
}

export default function ContractionsIcon({ focused, size = 24 }: ContractionsIconProps) {
  const color = focused ? '#4C211E' : '#999';

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Clock face */}
      <Circle
        cx="12"
        cy="12"
        r="9"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      {/* Clock hands */}
      <Line
        x1="12"
        y1="12"
        x2="12"
        y2="8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Line
        x1="12"
        y1="12"
        x2="15"
        y2="12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Contraction wave lines */}
      <Path
        d="M4 6c1-1 2-1 3 0s2 1 3 0"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M4 18c1 1 2 1 3 0s2-1 3 0"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
}