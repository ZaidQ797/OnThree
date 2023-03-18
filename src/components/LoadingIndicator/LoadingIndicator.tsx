import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

import { useAppTheme } from '@hooks';
import Box from 'components/Box';

type Props = {
  size?: 'large' | 'small';
  color?: string;
};
const LoadingIndicator = ({ size = 'large', color }: Props) => {
  const { colors } = useAppTheme();
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator color={color || colors.danger} size={size} />
    </Box>
  );
};

export default LoadingIndicator;
