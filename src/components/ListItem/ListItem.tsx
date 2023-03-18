import {
  View,
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React, { useCallback } from 'react';
import { ColorProps, createBox } from '@shopify/restyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAppTheme } from '@hooks';
import Text from '../Text';
import type { Theme } from '../../theme';

const BasePressable =
  Platform.OS === 'android'
    ? createBox<Theme, PressableProps>(Pressable)
    : createBox<Theme, TouchableOpacityProps>(TouchableOpacity);

type ListProps = React.ComponentProps<typeof BasePressable> &
  ColorProps<Theme> &
  PressableProps &
  TouchableOpacityProps & {
    title: string;
    titleStyle?: StyleProp<TextStyle>;
    showBorderTop?: boolean;
    showBorderBottom?: boolean;
    renderRightItem?: () => JSX.Element;
    showChevron?: boolean;
    textRight?: string;
    chevronColor?: string;
    textRightStyle?: StyleProp<TextStyle>;
    android_ripple?: PressableProps['android_ripple'];
  };
const ListItem = ({
  title,
  titleStyle,
  showBorderBottom = true,
  showChevron = true,
  showBorderTop,
  paddingVertical = 'l',
  renderRightItem,
  textRight,
  textRightStyle,
  android_ripple,
  style,
  chevronColor,
  borderColor = 'border',
  ...rest
}: ListProps) => {
  const { colors } = useAppTheme();
  const renderRightContent = useCallback((): JSX.Element => {
    if (renderRightItem) {
      return renderRightItem();
    } else {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[styles.textRight, textRightStyle]}
          >
            {textRight}
          </Text>
          {showChevron && (
            <Icon
              name="chevron-right"
              size={18}
              color={chevronColor || colors.text}
            />
          )}
        </View>
      );
    }
  }, [renderRightItem, showChevron, textRight, textRightStyle]);
  return (
    <BasePressable
      paddingVertical={paddingVertical}
      style={{
        borderBottomWidth: showBorderBottom ? 1 : 0,
        borderTopWidth: showBorderTop ? 1 : 0,
      }}
      borderColor={borderColor}
      {...rest}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      android_ripple={
        android_ripple
          ? android_ripple
          : { color: colors.cardBackgroundHighlight }
      }
    >
      <Text variant="listItemTitle" marginRight="l" style={titleStyle}>
        {title}
      </Text>
      <View style={styles.contentContainer}>{renderRightContent()}</View>
    </BasePressable>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  textRight: {
    marginRight: 5,
  },
});

BasePressable.defaultProps = BasePressable.defaultProps || {};
BasePressable.defaultProps.backgroundColor = 'mainBackground';

export default ListItem;
