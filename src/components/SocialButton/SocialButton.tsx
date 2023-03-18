import { Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '@hooks';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Box from '../Box';

type Props = {
  type: 'apple' | 'google' | 'facebook';
  onPress?: () => void;
};

const SocialButton = ({ type, onPress }: Props) => {
  const theme = useAppTheme();
  const renderIcon = (type: string) => {
    switch (type) {
      case 'apple':
        return (
          <Icon name="apple" size={30} color={theme.colors.textOnPrimary} />
        );

      case 'facebook':
        return (
          <FontAwesome
            name="facebook-f"
            size={27}
            color={theme.colors.textOnPrimary}
          />
        );

      case 'google':
        return (
          <FontAwesome
            name="google"
            size={27}
            color={theme.colors.textOnPrimary}
          />
        );
      default:
        return null;
    }
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        borderWidth={1}
        borderColor="border"
        borderRadius="m"
        width={80}
        height={65}
        backgroundColor="primary"
      >
        {renderIcon(type)}
      </Box>
    </TouchableOpacity>
  );
};

export default SocialButton;
