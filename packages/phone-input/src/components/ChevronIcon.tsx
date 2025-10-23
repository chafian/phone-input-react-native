import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ChevronIconProps {
  color?: string;
  size?: number;
}

const ChevronIcon: React.FC<ChevronIconProps> = ({ color = '#000', size = 20 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9L12 15L18 9"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ChevronIcon;

