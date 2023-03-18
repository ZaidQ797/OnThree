import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from 'screens/Home/Home';

export type MainUserStackParamList = {
  HomeScreen: undefined;
};

const RootStack = createStackNavigator<MainUserStackParamList>();
const RootStackScreens = () => {
  return (
    <RootStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen component={Home} name={'HomeScreen'} />
    </RootStack.Navigator>
  );
};

export default RootStackScreens;
const styles = StyleSheet.create({
  iconStyle: {
    height: 27,
    width: 27,
  },
  imagStyle: {
    height: 65,
    bottom: 5,
    width: 65,
  },
});
