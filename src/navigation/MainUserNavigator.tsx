import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, ProfileScreen } from '@screens';
import GeneralPlayer from 'screens/GeneralPlayer/GeneralPlayer';

export type MainUserStackParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
};

const RootStack = createStackNavigator<MainUserStackParamList>();
const RootStackScreens = () => {
  return (
    <RootStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen component={HomeScreen} name={'HomeScreen'} />
      <RootStack.Screen component={ProfileScreen} name={'ProfileScreen'} />
      <RootStack.Screen component={GeneralPlayer} name={'GeneralPlayer'} />
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
