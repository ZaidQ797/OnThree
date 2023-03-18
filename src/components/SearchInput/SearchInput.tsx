import React from 'react';
import { StyleSheet, TextInputProps, TextInput, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

import { useAppTheme } from '@hooks';
import Box from '../Box';

const SearchInput = ({
  placeholder,
  style,
  returnKeyType = 'done',
  ...rest
}: TextInputProps) => {
  const { colors, spacing } = useAppTheme();
  const { t } = useTranslation();
  return (
    <Box
      bg="cardBackground"
      borderRadius="m"
      flexDirection="row"
      paddingHorizontal="m"
      alignItems="center"
    >
      <Icon name="magnify" size={20} color={colors.text} />
      <TextInput
        placeholder={placeholder ? placeholder : t('SEARCH') + '...'}
        placeholderTextColor={colors.text}
        selectionColor={colors.primary}
        returnKeyType={returnKeyType}
        style={[
          {
            flex: 1,
            paddingVertical: Platform.OS === 'ios' ? spacing.m : spacing.s,
            marginLeft: spacing.s,
            color: colors.cardForeground,
          },
          styles.text,
          style,
        ]}
        {...rest}
      />
    </Box>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: '400',
  },
});
