import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import React from 'react';

import Box from '../Box';
import LoadingIndicator from '../LoadingIndicator';
import theme from 'theme';
type Props = {
  size?: 'large' | 'small';
  style?: StyleProp<ViewStyle>;
};
const LoadingOverlay = ({ size, style }: Props) => {
  return (
    <Box style={[StyleSheet.absoluteFill, styles.container, style]}>
      <LoadingIndicator size={size} color={theme.colors.primary} />
    </Box>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
