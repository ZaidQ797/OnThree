import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import { PickerIOS } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

import { useAppTheme } from '@hooks';
import Box from '../Box';
import Text from '../Text';

import type { PickerProps } from './index';
const PICKER_HEIGHT = 300;
const Picker = ({
  selectedValue,
  onValueChange,
  title,
  options,
  placeholder,
  itemStyle,
}: PickerProps) => {
  const { colors, spacing } = useAppTheme();
  const { t } = useTranslation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [PICKER_HEIGHT], []);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const [currentValue, setCurrentValue] = useState(selectedValue);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = () => {
    if (onValueChange) {
      onValueChange(currentValue, currentIndex);
    }
    bottomSheetModalRef.current?.dismiss();
  };
  useEffect(() => {
    if (selectedValue >= 0 || selectedValue != '') {
      let idx = options.findIndex(option => option.value === selectedValue);
      setSelectedIndex(idx);
      setCurrentIndex(idx);
    } else {
      setSelectedIndex(undefined);
    }
    setCurrentValue(selectedValue);
  }, [selectedValue]);
  return (
    <Box>
      <Pressable onPress={handlePresentModalPress}>
        <Box
          paddingVertical="s"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop="s"
          height={52}
          borderRadius="s"
          borderWidth={1}
          borderColor="border"
        >
          <Text
            color="primary"
            style={itemStyle}
            numberOfLines={1}
            marginLeft="s"
          >
            {selectedIndex !== -1 ? options[selectedIndex]?.label : placeholder}
          </Text>

          <Icon
            name="chevron-down"
            size={23}
            color={colors.primary}
            style={{ marginRight: 10 }}
          />
        </Box>
      </Pressable>
      {
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          style={{ padding: spacing.m }}
          backgroundStyle={{ borderRadius: 0 }}
          snapPoints={snapPoints}
          handleComponent={null}
          backdropComponent={props => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
            />
          )}
        >
          <View style={styles.contentContainer}>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              paddingBottom="s"
            >
              <Text style={styles.title} color="primary">
                {title}
              </Text>
              <TouchableOpacity onPress={handleCloseModalPress}>
                <Text color="danger" style={styles.doneText}>
                  {t('DONE')}
                </Text>
              </TouchableOpacity>
            </Box>

            <PickerIOS
              itemStyle={itemStyle}
              selectedValue={currentValue}
              onValueChange={(value, index) => {
                setCurrentValue(value);
                setCurrentIndex(index);
              }}
            >
              {placeholder !== undefined && (
                <PickerIOS.Item value={undefined} label={placeholder} />
              )}
              {options.map(item => (
                <PickerIOS.Item key={item.value} {...item} />
              ))}
            </PickerIOS>
          </View>
        </BottomSheetModal>
      }
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  doneText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Picker;
