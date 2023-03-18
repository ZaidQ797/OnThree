import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { PickerItemProps } from '@react-native-picker/picker';
export { default } from './Picker';

export type PickerProps = {
  onValueChange?: (value: string | number, position: number) => void;
  selectedValue?: any;
  title?: string;
  options: PickerItemProps[];
  placeholder?: string;
  marginTop?: number;
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<TextStyle>;
};
