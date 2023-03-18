import Animated, { SlideInRight, BounceInLeft } from 'react-native-reanimated';

export const buildAnimation = (index: number) => {
  return SlideInRight.delay(50 * index).duration(300);
};
