import React from 'react';
import { ActivityIndicator, Pressable, PressableProps } from 'react-native';
import { ColorProps, createBox, useTheme } from '@shopify/restyle';

import Text from '../Text';
import type { Theme } from '../../theme';

const BaseButton = createBox<Theme, PressableProps>(Pressable);

type Props = React.ComponentProps<typeof BaseButton> &
  ColorProps<Theme> & {
    label: string;
    isLoading?: boolean;
    buttonLabelColor?: string;
    labelFontSize?: number;
    showIcon: JSX.Element;
  };

const Button = ({
  label,
  isLoading,
  backgroundColor = 'danger',
  buttonLabelColor = 'textOnPrimary',
  labelFontSize,
  bg,
  disabled,
  onPress,
  showIcon,
  ...rest
}: Props): JSX.Element => {
  const theme = useTheme<Theme>();
  const bgColor =
    disabled || isLoading ? 'buttonDisabled' : bg || backgroundColor;
  return (
    <BaseButton
      paddingVertical="m"
      paddingHorizontal="m"
      borderRadius="s"
      disabled={disabled}
      backgroundColor={bgColor}
      onPress={onPress}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.colors['buttonDisabledText']} />
      ) : (
        <Text
          variant="buttonLabel"
          numberOfLines={1}
          adjustsFontSizeToFit
          fontSize={labelFontSize}
          color={buttonLabelColor as never}
        >
          {showIcon && showIcon} {label}
        </Text>
      )}
    </BaseButton>
  );
};

BaseButton.defaultProps = BaseButton.defaultProps || {};
BaseButton.defaultProps.backgroundColor = 'primary';

export default Button;
