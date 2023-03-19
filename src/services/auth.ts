import axios from 'axios';
import Config from 'react-native-config';

import { KeychainCredentials, SigninParams } from './types';
import appAxios from './appAxios';
import { KeychainService } from '@services';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import { Alert } from 'react-native';

const signin = async (credentials: SigninParams | any): Promise<any> => {
  const formData = new FormData();
  formData.append('email', credentials.email);
  formData.append('password', credentials.password);
  return axios
    .post(Config.API_URL + 'mobilelogin', formData)
    .then(async response => {
      const { data } = response;
      if (data?.success === 1 && data?.data?.user?.token) {
        await KeychainService.saveCredentials({
          token: data?.data?.user?.token,
          user: data?.data?.user,
        });
        return { token: data?.data?.user?.token, user: data?.data?.user };
      }
      return Promise.reject(data?.message);
    });
};
const signout = async (): Promise<any> => {
  return appAxios.get('user/logout.php').then(async response => {
    await KeychainService.resetCredentials();
    return new Promise(async res => {
      res(2);
    });
  });
};

const registerUser = async (register: {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  const formData = new FormData();
  formData.append('email', register?.email);
  formData.append('password', register?.password);
  formData.append('confirm_password', register?.confirmPassword);
  formData.append('first_name', register?.username);
  formData.append('last_name', '');
  formData.append('phone', '');
  return appAxios.post('mobilesignup', formData).then(async response => {
    console.log(response);
    const { data } = response;

    if (data.success === 1 && data?.data?.user?.token !== null) {
      await KeychainService.saveCredentials({
        token: data?.token,
        user: data?.user,
      });

      return { token: data?.token, user: data?.user };
    }
    return Promise.reject(data?.message);
  });
};
export const updateUser = async (data: any) => {
  return appAxios.put('user/', data).then(response => {
    return response.data;
  });
};
export const updatePassword = async (data: any, from: any) => {
  if (from === 'forget') {
    return axios
      .post(
        'https://alicoltd.co.uk/app/apis/user/reset_password.php?request=forget',
        data,
      )
      .then(response => {
        return response.data;
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    return appAxios.post('user/reset_password.php', data).then(response => {
      return response.data;
    });
  }
};
export const forgetPassword = async (data: any) => {
  return appAxios.post('user/forget_pass.php', data).then(response => {
    const { data } = response;
    if (data.code === '404') {
      Alert.alert('OnThree', data?.message);
      return false;
    } else if (data.code === '200') {
      Alert.alert('OnThree', 'OTP sent successfully to your email');
      return data?.message;
    }
  });
};
// const handleFBLogin = async () => {
//   // Attempt a login using the Facebook login dialog asking for default permissions.
//   const result = await LoginManager?.logInWithPermissions([
//     'email',
//     'public_profile',
//   ]);
//   if (result?.isCancelled) {
//     throw 'User cancelled the login process';
//   }
//   // Once signed in, get the users AccesToken
//   const data = await AccessToken?.getCurrentAccessToken();
//   if (data?.accessToken) {
//     return data?.accessToken;
//   } else {
//     return null;
//   }
// };
const googleSignin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return {
      type: 'gmail',
      firstName: userInfo?.user?.givenName || '',
      lastName: userInfo?.user?.familyName || '',
      email: userInfo?.user?.email || '',
      gmail_id: userInfo?.user?.id,
    };
  } catch (error) {}
};
async function appleLogin() {
  // performs login request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    // Note: it appears putting FULL_NAME first is important, see issue #293
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  });

  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user,
  );

  // use credentialState response to ensure the user is authenticated
  if (credentialState === appleAuth.State.AUTHORIZED) {
    const { email, user, fullName } = appleAuthRequestResponse;
    return {
      type: 'apple',
      apple_id: user,
      email: email,
      firstName: fullName?.givenName,
      lastName: fullName?.familyName,
    };
  }
}
const fbInitUser = async (token: string) => {
  return await fetch('https://graph.facebook.com/me?access_token=' + token)
    .then(response => response.json())
    .then(json => {
      const name = json?.name?.split(' ');
      const cred = {
        type: 'facebook',
        firstName: name[0] || '',
        lastName: name[1] || '',
        email: json?.email || '',
        facebook_id: json?.id,
      };

      if (json?.id) return cred;
      return null;
    })
    .catch(e => {});
};
export default {
  signin,
  googleSignin,
  appleLogin,
  registerUser,
  updateUser,
  signout,
  fbInitUser,
  updatePassword,
  forgetPassword,
};
