/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry, StatusBar } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import React from 'react';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

const HeadlessCheck = ({ isHeadless }) => {
  GoogleSignin.configure({
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      '969928589839-kafoe437t9o3egujvken7ltemb23dmjo.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    profileImageSize: 120,
    // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  });
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  return <App />;
};

AppRegistry.registerComponent(appName, () => HeadlessCheck);
