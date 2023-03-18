import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface CameraProps {}

const Camera = (props: CameraProps) => {
  return (
    <View style={styles.container}>
      <Text>Camera</Text>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {},
});
