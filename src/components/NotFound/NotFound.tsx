// import React from 'react';
// import { StyleSheet } from 'react-native';
// import FastImage from 'react-native-fast-image';
// import Animated, { BounceIn } from 'react-native-reanimated';

// import Box from '../Box';
// import Text from '../Text';
// import Button from '../Button';
// const AnimatedBox = Animated.createAnimatedComponent(Box);
// const AnimatedText = Animated.createAnimatedComponent(Text);

// type Props = {
//   title?: string;
//   description?: string;
//   actionButton?: string | (() => JSX.Element);
//   onActionButtonPress?: () => void;
// };
// const NotFound = ({
//   title = 'OOPS!',
//   description,
//   actionButton,
//   onActionButtonPress,
// }: Props) => {
//   const renderActionButton = () => {
//     if (typeof actionButton === 'function') {
//       return (
//         <AnimatedBox marginTop="m" entering={BounceIn.delay(300)}>
//           {actionButton()}
//         </AnimatedBox>
//       );
//     }
//     if (typeof actionButton === 'string') {
//       return (
//         <AnimatedBox marginTop="m" entering={BounceIn.delay(300)}>
//           <Button
//             bg="secondary"
//             label={actionButton}
//             onPress={onActionButtonPress}
//           />
//         </AnimatedBox>
//       );
//     }
//     return null;
//   };
//   return (
//     <Box flex={1} justifyContent="center" alignItems="center" padding="m">
//       <AnimatedBox entering={BounceIn}>
//         <FastImage
//           source={require('assets/images/not_found.png')}
//           style={{ height: 210, width: 201 }}
//           resizeMode="contain"
//         />
//       </AnimatedBox>
//       {title && (
//         <AnimatedText
//           entering={BounceIn.delay(100)}
//           style={styles.title}
//           marginTop="l"
//           color="mainForeground"
//         >
//           {title}
//         </AnimatedText>
//       )}
//       {description && (
//         <AnimatedText
//           entering={BounceIn.delay(200)}
//           marginTop="m"
//           style={styles.description}
//         >
//           {description}
//         </AnimatedText>
//       )}
//       {actionButton && renderActionButton()}
//     </Box>
//   );
// };

// export default NotFound;

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 22,
//     fontWeight: '600',
//     textAlign: 'center',
//     letterSpacing: 1,
//   },
//   description: {
//     fontSize: 14,
//     fontWeight: '400',
//     textAlign: 'center',
//     letterSpacing: 0.7,
//     lineHeight: 22,
//   },
// });
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface NotFoundProps {}

const NotFound = (props: NotFoundProps) => {
  return (
    <View style={styles.container}>
      <Text>NotFound</Text>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  container: {},
});
