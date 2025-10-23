import React, { memo } from 'react';
import { View } from 'react-native';
import type { FlagComponentProps } from '../types';
import { flagComponents } from '../flags';

const Flag: React.FC<FlagComponentProps> = ({ countryCode, size = 24, style }) => {
  const FlagComponent = flagComponents[countryCode.toUpperCase()];

  if (!FlagComponent) {
    // Fallback to emoji or empty view
    return (
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 8,
            backgroundColor: '#E0E0E0',
          },
          style,
        ]}
      />
    );
  }

  return (
    <View style={[{ width: size, height: size }, style]}>
      <FlagComponent width={size} height={size} />
    </View>
  );
};

export default memo(Flag);

