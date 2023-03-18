import React, { Ref, useCallback, useMemo } from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { useAppTheme } from '@hooks';
import { Box, Text } from '@components';
import type { Country } from '@services/types';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';
import { FlashList } from '@shopify/flash-list';

// type Props = UseQueryResult<Country[]> &
//   BottomSheetModal & {
//     selectedCountry?: number | undefined;
//     selectedCountryName?: string | undefined;
//     onChange?: () => void;
//     isLoading?: boolean;
//   };
type Props = {
  data: Country[];
  bottomSheetModalRef?: undefined;
  onPress?: (item: object) => void;
  label?: string;
};
const CountryPicker = ({
  data,
  bottomSheetModalRef,
  onPress,
  label,
}: Props) => {
  const { colors } = useAppTheme();
  const snapPoints = useMemo(() => [450], []);

  return (
    <Box>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <FlashList
          estimatedItemSize={60}
          ListHeaderComponent={
            <Text
              fontSize={14}
              fontWeight="500"
              color={'primary'}
              marginVertical="s"
              style={{ alignSelf: 'center' }}
            >
              {label}
            </Text>
          }
          data={data}
          renderItem={({ item, index }) => {
            return (
              <Box>
                <TouchableOpacity
                  onPress={() => {
                    onPress(item);
                  }}
                  style={[
                    styles.picker,
                    { borderColor: colors.tabBarInvactive, marginLeft: 10 },
                  ]}
                >
                  <FastImage
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                    source={{
                      uri: 'https://' + item?.flag,
                      priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <Box alignSelf="center">
                    <Text
                      fontSize={14}
                      fontWeight="500"
                      marginLeft={'s'}
                      color={'accentText'}
                      marginTop={'xs'}
                    >
                      {item?.name}
                    </Text>
                  </Box>
                </TouchableOpacity>
                <Box
                  backgroundColor="border"
                  marginVertical="xs"
                  style={{
                    height: 0.5,
                    width: '100%',
                  }}
                />
              </Box>
            );
          }}
        />
      </BottomSheetModal>
    </Box>
  );
};
// };

export default CountryPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iosPickerItem: {
    fontSize: 14,
    marginRight: 5,
  },
  picker: {
    width: '100%',
    borderRadius: 6,
    flexDirection: 'row',
    padding: 10,
  },
  androidPicker: {
    position: 'absolute',
    top: 0,
    right: -1000, // hack to hide picker arrow
  },
});
