import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
  PressableAndroidRippleConfig,
} from 'react-native';
import { ColorProps, createBox, useTheme } from '@shopify/restyle';

import Text from '../Text';
import type { Theme } from '../../theme';

const BaseButton = createBox<Theme, TouchableOpacityProps>(TouchableOpacity);

type Props = React.ComponentProps<typeof BaseButton> &
  ColorProps<Theme> & {
    label: string;
    isLoading?: boolean;
    android_ripple?: PressableAndroidRippleConfig;
    buttonLabelColor: string;
  };

const Button = ({
  label,
  isLoading,
  backgroundColor = 'danger',
  buttonLabelColor = 'textOnPrimary',
  disabled,
  onPress,
  android_ripple,
  activeOpacity = 0.7,
  ...rest
}: Props): JSX.Element => {
  const theme = useTheme<Theme>();
  const bgColor = disabled || isLoading ? 'buttonDisabled' : backgroundColor;
  return (
    <BaseButton
      paddingVertical="m"
      paddingHorizontal="m"
      borderRadius="xm"
      disabled={disabled}
      backgroundColor={bgColor}
      onPress={onPress}
      activeOpacity={activeOpacity}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.colors['buttonDisabledText']} />
      ) : (
        <Text
          variant="buttonLabel"
          numberOfLines={1}
          adjustsFontSizeToFit
          color={disabled ? 'buttonDisabledText' : buttonLabelColor}
        >
          {label}
        </Text>
      )}
    </BaseButton>
  );
};

BaseButton.defaultProps = BaseButton.defaultProps || {};
BaseButton.defaultProps.backgroundColor = 'primary';

export default Button;
