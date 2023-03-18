import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen, RegisterScreen } from '@screens';
import ForgetPassword from 'screens/ForgetPassword';
import UpdatePassword from 'screens/UpdatePassword';
export type AuthStackParamList = {
  Welcome: undefined;
  ExchangeRates: undefined;
  Login: undefined;
  Register: undefined;
  UpdateProfile: undefined;
  ForgetPassword: undefined;
  UpdatePassword: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AuthStackScreens = (): JSX.Element => (
  <AuthStack.Navigator
    initialRouteName="Welcome"
    screenOptions={{ headerShown: false }}
  >
    <AuthStack.Screen component={LoginScreen} name="Login" />
    <AuthStack.Screen component={RegisterScreen} name="Register" />
    <AuthStack.Screen component={ForgetPassword} name="ForgetPassword" />
    <AuthStack.Screen component={UpdatePassword} name="UpdatePassword" />
  </AuthStack.Navigator>
);

export default AuthStackScreens;