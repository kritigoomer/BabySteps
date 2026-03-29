import React from 'react';
import { Svg, Circle, Path } from 'react-native-svg';

interface AccountIconProps {
  focused: boolean;
  size?: number;
}

export default function AccountIcon({ focused, size = 24 }: AccountIconProps) {
  const color = focused ? '#4C211E' : '#999';

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="8"
        r="4"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <Path
        d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
}