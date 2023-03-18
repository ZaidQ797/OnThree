import {
  Platform,
  Pressable,
  PressableProps,
  ViewStyle,
  StyleProp,
} from 'react-native';
import React from 'react';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
};
const AppPressable = ({
  children,
  style = {},
  containerStyle,
  ...rest
}: PressableProps & Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        { opacity: pressed ? (Platform.OS === 'ios' ? 0.5 : 1) : 1 },
        containerStyle,
      ]}
      {...rest}
    >
      {children}
    </Pressable>
  );
};

export default AppPressable;
