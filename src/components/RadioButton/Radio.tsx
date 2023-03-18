import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Box, Text } from '@components';
import type { Theme } from '../../theme';
import Animated, { BaseAnimationBuilder } from 'react-native-reanimated';

import {
  ColorProps,
  TypographyProps,
  createBox,
  useTheme,
} from '@shopify/restyle';
type Props = TypographyProps<Theme> &
  ColorProps<Theme> & {
    setSelected: (value: number) => void;
    selected?: boolean;
    value?: string;
    buildAnimation: BaseAnimationBuilder;
    showBorder?: boolean;
    showFee?: boolean;
    fee?: string;
    showMore?: boolean;
    id?: string | number;
  };
const AnimatedBox = Animated.createAnimatedComponent(Box);

const Radio = ({
  setSelected,
  value,
  selected,
  buildAnimation,
  showBorder = true,
  showFee = true,
  showMore = true,
  fee,
  id,
}: Props) => {
  const theme = useTheme<Theme>();

  return (
    <Box height={57}>
      <AnimatedBox entering={buildAnimation} flex={1} justifyContent="center">
        <Box flexDirection="row" margin="s">
          <Pressable
            onPress={() => {
              setSelected({
                pay_type: value,
                fees: fee,
                selected: true,
                id: id,
              } as never);
            }}
            style={{
              height: 15,
              width: 15,
              borderRadius: 10,
              borderWidth: 1.5,
              borderColor: selected ? theme.colors.danger : theme.colors.border,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {selected && (
              <Box
                style={{
                  height: 8.5,
                  width: 8.5,

                  borderRadius: 4.5,
                  backgroundColor: selected
                    ? theme.colors.danger
                    : theme.colors.border,
                }}
              />
            )}
          </Pressable>
          <Box>
            <Text
              color="primary"
              style={{
                fontWeight: '500',
                fontSize: 12,
                marginLeft: 5,
                alignSelf: 'center',
              }}
            >
              {value}
            </Text>

            {showMore ? (
              <Text
                color="border"
                style={{
                  fontWeight: '500',
                  fontSize: 11,
                  marginLeft: 5,
                }}
              >
                {'Learn More'}
              </Text>
            ) : (
              <></>
            )}

            {showFee && (
              <Text
                color="primary"
                style={{
                  fontWeight: '500',
                  fontSize: 9,
                  marginLeft: 5,
                }}
              >
                {fee}
              </Text>
            )}
          </Box>
        </Box>
      </AnimatedBox>
      {showBorder && <Box width={'100%'} bg={'border'} height={1} />}
    </Box>
  );
};

export default Radio;

const styles = StyleSheet.create({
  container: {},
});
