import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AppPressable } from '@components';
import { useAppTheme } from '@hooks';

type Props = {
  isChecked: boolean;
  iconSize: number;
  onValueChange: (value: boolean) => void;
};
const CheckBox = ({ isChecked, iconSize, onValueChange }: Props) => {
  const { colors } = useAppTheme();
  const [value, setValue] = useState(isChecked);

  return (
    <AppPressable
      containerStyle={{ width: iconSize }}
      onPress={() => {
        setValue(!value);
        onValueChange(value);
      }}
    >
      <Icon
        name={
          isChecked ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'
        }
        size={iconSize}
        color={isChecked ? colors.primary : colors.neutral}
      />
    </AppPressable>
  );
};

export default CheckBox;
