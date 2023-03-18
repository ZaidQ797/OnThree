import React from 'react';
import { Picker as NativePicker } from '@react-native-picker/picker';
import { useAppTheme } from '@hooks';

import type { PickerProps } from './index';

const Picker = ({
  selectedValue,
  onValueChange,
  title,
  options,
  placeholder,
  style,
}: PickerProps) => {
  const { colors } = useAppTheme();
  return (
    <NativePicker
      style={style}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      dropdownIconColor={colors.secondary}
      dropdownIconRippleColor={colors.secondary}
      prompt={title}
    >
      {placeholder !== undefined && (
        <NativePicker.Item value={undefined} label={placeholder} />
      )}
      {options.map(item => (
        <NativePicker.Item key={item.value} {...item} />
      ))}
    </NativePicker>
  );
};

export default Picker;
