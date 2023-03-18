import { View, Pressable } from 'react-native';
import React from 'react';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { useAppTheme } from '@hooks';

const TabBarButton = ({
  children,
  style,
  ...props
}: BottomTabBarButtonProps) => {
  const { colors } = useAppTheme();
  return (
    <Pressable {...props} style={[style, { justifyContent: 'center' }]}>
      {props.accessibilityState?.selected ? (
        <View
          style={{
            backgroundColor: colors.tabBarActiveBackground,
            width: 50,
            height: 50,
            borderRadius: 25,
            elevation: 3,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 4,
            shadowOpacity: 0.3,
          }}
        >
          {children}
        </View>
      ) : (
        children
      )}
    </Pressable>
  );
};

export default TabBarButton;
