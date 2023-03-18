import {
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Alert,
  Pressable,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Animated, { SlideInRight } from 'react-native-reanimated';
import { Formik } from 'formik';
import * as Yup from 'yup';
// import appleAuth from '@invertase/react-native-apple-authentication';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
import { useAppDispatch, useAppTheme } from '@hooks';
import {
  Box,
  Text,
  TextInput,
  Button,
  SocialButton,
  ScreenHeader,
  LoadingOverlay,
} from '@components';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';
import { buildAnimation } from 'utils/functions';
import { startConnectionWatcher } from 'hooks/useConnection';
import { AuthService } from '@services';
import { signin } from '@actions/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AnimatedBox = Animated.createAnimatedComponent(Box);
const LoginScheme = Yup.object().shape({
  email: Yup.string().email('Invalid Email Format').required('Email Required'),
  password: Yup.string()
    .min(6, 'Min 6 characters')
    .required('Password Required'),
});

type LoginScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList,
  'Login'
>;
const Login = ({ navigation, route }: LoginScreenNavigationProps) => {
  const { t } = useTranslation('auth');
  const { colors } = useAppTheme();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [submiting, setSubmiting] = useState(false);

  const handleSocialLogin = async (type: string) => {
    if (await startConnectionWatcher()) {
      if (type == 'fb') {
        const response = await AuthService.handleFBLogin();
        if (response) {
          const fbUserData = await AuthService.fbInitUser(response);

          handleLogin(fbUserData);
        }
      } else if (type === 'google') {
        const res = await AuthService.googleSignin();

        handleLogin(res);
      } else if (type === 'apple') {
        const appleData = await AuthService.appleLogin();

        handleLogin(appleData);
      } else {
        Alert.alert('OnThree', 'Kindly Check Internet');
      }
    }
  };

  const handleLogin = async (values: any) => {
    setLoading(true);
    await dispatch(signin(values))
      .unwrap()
      .catch(error => {
        Alert.alert('OnThree', error);
        setLoading(false);
      });
    setLoading(false);
  };
  // const googlelogin = async () => {
  //   try {
  //     const { idToken, user } = await GoogleSignin.signIn();
  //     // Create a Google credential with the token
  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //     // Sign-in the user with the credential
  //     auth().signInWithCredential(googleCredential);
  //     console.log('user', user);
  //     const data = {
  //       email: user?.email,
  //       password: 'onthree',
  //       login_type: 'google',
  //     };
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //       alert(error);
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       alert(error);

  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //       alert(error);
  //     } else {
  //       // some other error happened
  //       alert(error);
  //     }
  //   }
  // };
  // const applelogin = async () => {
  //   const appleAuthRequestResponse = await appleAuth.performRequest({
  //     requestedOperation: appleAuth.Operation.LOGIN,
  //     requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //   });
  //   console.log('signed in', appleAuthRequestResponse);
  //   console.log(appleAuthRequestResponse.email);
  //   var user_email = appleAuthRequestResponse.email;
  //   const data = {
  //     email: user_email,
  //     password: 'onthree',
  //     login_type: 'apple',
  //   };
  //   // dispatch(loginUser(data, nav));

  //   const credentialState = await appleAuth.getCredentialStateForUser(
  //     appleAuthRequestResponse.user,
  //   );
  //   // use credentialState response to ensure the user is authenticated
  //   if (credentialState === appleAuth.State.AUTHORIZED) {
  //     // user is authenticated
  //     //alert(JSON.stringify(appleAuthRequestResponse));
  //   }
  // };
  return (
    <Box
      flex={1}
      backgroundColor={'lightBg'}
      borderTopLeftRadius="xl"
      borderTopRightRadius="xl"
      paddingTop="xl"
      paddingHorizontal="m"
    >
      <ScreenHeader iconRight={'close'} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1, flexGrow: 1 }}
      >
        <AnimatedBox flex={1} paddingHorizontal="m">
          <AnimatedBox entering={buildAnimation(1)}>
            <Image
              source={require('@assets/icons/logo.png')}
              style={{ height: 100, width: 180, alignSelf: 'center' }}
              resizeMode="contain"
            />
          </AnimatedBox>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LoginScheme}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <>
                <AnimatedBox entering={buildAnimation(2)}>
                  <TextInput
                    autoCapitalize={false as never}
                    label="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    touched={touched.email}
                    error={errors.email ? t(`${errors.email}`) : ''}
                    keyboardType="email-address"
                    placeholder="example@example.com"
                  />
                </AnimatedBox>
                <Box marginVertical="xs" />
                <AnimatedBox entering={buildAnimation(3)}>
                  <TextInput
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={errors.password ? t(`${errors.password}`) : ''}
                    touched={touched.password}
                    label={'Password'}
                    secureTextEntry
                    returnKeyType="go"
                    returnKeyLabel="Submit"
                    onSubmitEditing={handleSubmit as never}
                  />
                </AnimatedBox>
                <AnimatedBox entering={buildAnimation(4)}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ForgetPassword');
                    }}
                    style={{
                      width: '38%',
                    }}
                  >
                    <Box alignItems="flex-end" paddingVertical="m">
                      <Text
                        color="accentText"
                        style={{ fontSize: 12, letterSpacing: 0.5 }}
                      >
                        Forgot Password?
                      </Text>
                    </Box>
                  </TouchableOpacity>
                </AnimatedBox>
                <AnimatedBox entering={buildAnimation(5)}>
                  <Box
                    borderRadius="s"
                    style={{ overflow: 'hidden' }}
                    marginTop="xl"
                  >
                    <Button
                      backgroundColor="primary"
                      android_ripple={{ color: colors.primaryHighlight }}
                      disabled={!isValid}
                      isLoading={submiting}
                      onPress={handleSubmit as never}
                      buttonStyle={{ padding: 15 } as never}
                      label={'Log In'}
                    />
                  </Box>
                </AnimatedBox>
              </>
            )}
          </Formik>
          <AnimatedBox entering={buildAnimation(6)}>
            <Text
              onPress={() => {
                navigation.navigate('Register');
              }}
              marginTop="xl"
              color="primary"
              fontWeight="500"
              style={{
                fontSize: 15,
                letterSpacing: 0.5,
                alignSelf: 'center',
              }}
            >
              {`Create Account`}
            </Text>
          </AnimatedBox>
        </AnimatedBox>
        <Box position="absolute" bottom={20} alignSelf="center">
          <Text
            color="primary"
            fontWeight="400"
            style={{ alignSelf: 'center', marginBottom: 10 }}
          >
            Or, Log In with
          </Text>
          <Box flexDirection="row" justifyContent="space-around">
            {Platform.OS === 'ios' && (
              <AnimatedBox margin="s" entering={buildAnimation(7)}>
                <SocialButton
                  type="apple"
                  onPress={() => {
                    handleSocialLogin('apple');
                  }}
                />
              </AnimatedBox>
            )}

            <AnimatedBox margin="s" entering={buildAnimation(8)}>
              <SocialButton onPress={() => googlelogin()} type="google" />
            </AnimatedBox>
          </Box>
        </Box>
      </KeyboardAwareScrollView>
      {loading && <LoadingOverlay />}
    </Box>
  );
};

export default Login;
