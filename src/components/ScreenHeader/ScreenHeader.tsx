import { ImageBackground, Platform, StatusBar, StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppTheme } from '@hooks';
import Animated, { SlideInRight, SlideInUp } from 'react-native-reanimated';

import Box from '../Box';
import Text from '../Text';
import AppPressable from '../AppPressable';
import FastImage from 'react-native-fast-image';
const IMAGE_SIZE = 45;
const SIDE_ITEMS_SIZE = 25;
const ICON_SIZE = 25;
const AnimatedBox = Animated.createAnimatedComponent(Box);

type ScreenHeaderProps = {
  title?: string;
  showBackButton?: boolean;
  onBackButtonPress?: () => void;
  iconRight?: string | (() => JSX.Element);
  onRightButtonPress?: () => void;
  isConversation?: boolean;
  avatar?: string;
  isActive?: boolean;
  transparent?: boolean;
  headerBackground?: string;
  iconLeft?: JSX.Element;
};
const ScreenHeader = ({
  title,
  avatar,
  showBackButton = false,
  onRightButtonPress,
  iconRight,
  onBackButtonPress,
  isConversation = false,
  isActive = false,
  transparent = false,
  headerBackground,
  iconLeft,
}: ScreenHeaderProps) => {
  const { top } = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const [blur, setBlur] = useState(0);
  const renderRightIcon = useCallback(() => {
    if (typeof iconRight === 'string') {
      return <Icon name={iconRight} size={ICON_SIZE} color={colors.primary} />;
    } else if (typeof iconRight === 'function') {
      return iconRight;
    } else {
      return null;
    }
  }, [iconRight, onRightButtonPress]);
  return (
    <Box
      alignItems="center"
      flexDirection="row"
      style={{
        paddingTop: Platform.OS == 'android' ? 10 : top - 10,
        paddingBottom: 50,
        marginBottom: -24,
        paddingHorizontal: 10,
        backgroundColor: transparent ? transparent : headerBackground,
      }}
    >
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={colors.danger}
        animated
      />
      <AppPressable
        onPress={onBackButtonPress}
        disabled={!showBackButton}
        containerStyle={styles.sideButton}
      >
        {showBackButton && (
          <Icon
            name="keyboard-backspace"
            size={ICON_SIZE}
            color={colors.headerForeground}
          />
        )}
        {iconLeft && iconLeft}
      </AppPressable>
      <Box flex={1}>
        {isConversation ? (
          <AnimatedBox entering={SlideInRight.delay(200)}>
            <Box flexDirection="row" marginLeft="l">
              <FastImage
                style={[
                  styles.avatar,
                  { backgroundColor: colors.imagePlaceholder },
                ]}
                source={{ uri: avatar }}
              />
              <Box>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  variant="header"
                  color="neutral"
                >
                  {title}
                </Text>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  variant="modalTitle"
                  color="primary"
                >
                  {isActive ? 'Active Now' : 'Offline'}
                </Text>
              </Box>
            </Box>
          </AnimatedBox>
        ) : (
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            variant="header"
            color="neutral"
            fontSize={20}
            fontWeight={'300'}
          >
            {title}
          </Text>
        )}
      </Box>

      <AppPressable
        onPress={onRightButtonPress}
        disabled={onRightButtonPress === undefined}
        containerStyle={styles.sideButton}
      >
        {iconRight !== undefined && renderRightIcon()}
      </AppPressable>
    </Box>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  sideButton: {
    height: SIDE_ITEMS_SIZE,
    width: SIDE_ITEMS_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    marginRight: 10,
  },
});
