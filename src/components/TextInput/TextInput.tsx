import {
  View,
  TextInput as RnTextInput,
  TextInputProps,
  Pressable,
  Image,
  StyleProp,
  ImageStyle,
  Platform,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import {
  ColorProps,
  TypographyProps,
  createBox,
  useTheme,
} from '@shopify/restyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type { Theme } from '../../theme';
import Text from '../Text';
import FastImage from 'react-native-fast-image';
import { useToast } from 'react-native-toast-notifications';
import { t } from 'i18next';
import Box from 'components/Box';

const BaseTextInput = createBox<Theme, TextInputProps>(RnTextInput);
type Props = React.ComponentProps<typeof BaseTextInput> &
  TypographyProps<Theme> &
  ColorProps<Theme> & {
    label?: string;
    error?: string;
    touched?: boolean;
    icon?: string;
    width?: string;
    rightIcon?: string;
    rightText?: string;
    showBorder?: boolean;
    tintColor?: string;
    showCode?: string;
    max?: number;
    inputWidth?: string;
    autoCapitalize?: boolean;
    eyeRight?: number;
    showCopy?: boolean;
    copytext?: () => void;
    rightFontSize?: number;
  };
const TextInput = React.forwardRef(
  (
    {
      label,
      error = '',
      style,
      icon,
      secureTextEntry = false,
      placeholderTextColor,
      touched,
      onBlur,
      width,
      rightIcon,
      rightText,
      showBorder = false,
      tintColor,
      showCode,
      max,
      autoCapitalize,
      inputWidth = '80%',
      eyeRight = 10,
      rightFontSize = 14,
      showCopy,
      copytext,
      ...props
    }: Props,
    ref: React.ForwardedRef<RnTextInput>,
  ) => {
    const theme = useTheme<Theme>();
    const [focused, setFocued] = useState(false);
    const toast = useToast();
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(secureTextEntry);
    const borderColor = focused
      ? 'primary'
      : error
      ? touched
        ? 'danger'
        : 'border'
      : 'border';
    return (
      <View
        style={{
          paddingVertical: Platform.OS === 'android' ? 0 : 7,
          width: width,
        }}
      >
        <Text
          style={{
            color: theme.colors.primary,
            margin: 7,
            fontWeight: '400',
            fontSize: 13,
            marginTop: 5,
          }}
        >
          {label}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: icon ? 15 : 0,
            borderRadius: 8,
            borderColor:
              error !== '' && touched ? theme.colors.danger : 'transparent',
            padding: 15,
            borderWidth: error !== '' && touched ? 1 : 0,
            backgroundColor: theme.colors.textOnPrimary,
          }}
        >
          {icon && (
            <FastImage
              tintColor={tintColor}
              resizeMode="contain"
              source={icon as never}
              style={{
                width: 20,
              }}
            />
          )}
          <View>
            <Box flexDirection="row">
              {showCode && (
                <Text
                  color="primary"
                  style={{
                    fontWeight: '500',
                    fontSize: 13,
                    marginRight: 4,
                    marginLeft: 15,
                    marginTop: Platform.OS == 'android' ? 4 : 0,
                  }}
                >
                  {'+' + showCode}
                </Text>
              )}
              <BaseTextInput
                maxLength={max}
                ref={ref}
                autoCapitalize={autoCapitalize}
                onFocus={() => setFocued(true)}
                onBlur={e => {
                  setFocued(false);
                  if (onBlur) {
                    onBlur(e);
                  }
                }}
                selectionColor={theme.colors.primary}
                alignItems="center"
                placeholderTextColor={
                  placeholderTextColor
                    ? placeholderTextColor
                    : theme.colors.ligh
                }
                style={[
                  {
                    fontSize: 13,
                    fontFamily: 'Poppins-Medium',
                    color: theme.colors.primary,
                    width: inputWidth,
                    padding: 0,
                    paddingRight: showCode ? 10 : 0,
                  },
                  style,
                ]}
                secureTextEntry={isSecureTextEntry}
                {...props}
              />
            </Box>
          </View>
          {secureTextEntry && (
            <Pressable
              onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}
              style={{
                position: 'absolute',
                right: eyeRight,
                top: 0,
                bottom: 0,
                justifyContent: 'center',
              }}
            >
              <Icon
                name={isSecureTextEntry ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color={theme.colors.primary}
              />
            </Pressable>
          )}
          {showCopy && (
            <Pressable
              onPress={copytext}
              style={{
                position: 'absolute',
                right: eyeRight,
                top: 0,
                bottom: 0,
                justifyContent: 'center',
              }}
            >
              <Icon
                name={'content-copy'}
                size={20}
                color={theme.colors.danger}
              />
            </Pressable>
          )}
          {rightIcon && (
            <Pressable
              onPress={() =>
                isSecureTextEntry && setIsSecureTextEntry(!isSecureTextEntry)
              }
              style={{
                position: 'absolute',
                right: theme.spacing.s,
                top: 0,
                bottom: 0,
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  marginHorizontal: 15,
                  fontWeight: '500',
                  fontSize: rightFontSize,
                  alignSelf: 'center',
                  color: theme.colors.primary,
                }}
              >
                {rightText}
              </Text>
              <Image
                source={{ uri: rightIcon }}
                style={{ height: 30, width: 30, borderRadius: 15 }}
              />
            </Pressable>
          )}
        </View>

        {error !== '' && touched && (
          <Box style={{ left: 5, marginTop: 5 }}>
            <Text variant="caption" color="danger" fontSize={10}>
              {error}
            </Text>
          </Box>
        )}
      </View>
    );
  },
);

export default TextInput;
