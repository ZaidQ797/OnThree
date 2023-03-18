import { Platform, Pressable, StatusBar } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '@hooks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Box from '../Box';
import Text from '../Text';

type AuthHeaderProps = {
  title: string;
  onBackPress: () => void;
};
const AuthScreensHeader = ({ title, onBackPress }: AuthHeaderProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  return (
    <Box
      backgroundColor="authHeaderBackground"
      paddingHorizontal="xxl"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      style={{ paddingTop: insets.top + 5, paddingBottom: 10 }}
    >
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={
          Platform.OS === 'ios' ? colors.authHeaderBackground : colors.danger
        }
        animated
      />

      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        variant="authHeader"
        color="authHeaderForeground"
      >
        {title}
      </Text>
      <Pressable
        style={{
          position: 'absolute',
          top: insets.top,
          bottom: 0,
          left: 0,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 15,
        }}
        onPress={onBackPress}
      >
        <Icon
          name="chevron-left"
          size={30}
          color={colors.authHeaderForeground}
        />
      </Pressable>
    </Box>
  );
};

export default AuthScreensHeader;
