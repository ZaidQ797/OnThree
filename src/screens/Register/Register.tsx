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
import { useToast } from 'react-native-toast-notifications';

import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import DeviceId from 'react-native-device-info';
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
import { AppService, AuthService } from '@services';
import { register, signin } from '@actions/auth';
import { updateUser } from 'services/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AnimatedBox = Animated.createAnimatedComponent(Box);
const LoginScheme = Yup.object().shape({
  email: Yup.string().email('Invalid Email Format').required('Email Required'),
  username: Yup.string().required('Username Required'),
  password: Yup.string()
    .min(6, 'Min 6 characters')
    .required('Password Required'),

  confirmPassword: Yup.string()
    .min(6)
    .required('Confirm Password')
    .oneOf([Yup.ref('password'), 'Password should match']),
});

type LoginScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList,
  'Register'
>;
const Register = ({ navigation, route }: LoginScreenNavigationProps) => {
  const { t } = useTranslation('auth');
  const { colors } = useAppTheme();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [submiting, setSubmiting] = useState(false);

  const handleSignup = async (values: any) => {
    setLoading(true);
    await dispatch(register(values))
      .unwrap()
      .catch(error => {
        Alert.alert('OnThree', error);
        setLoading(false);
      });
    setLoading(false);
  };

  return (
    <Box
      flex={1}
      backgroundColor={'lightBg'}
      borderTopLeftRadius="xl"
      borderTopRightRadius="xl"
      paddingTop="xl"
      paddingHorizontal="m"
    >
      <ScreenHeader
        iconRight={'close'}
        onRightButtonPress={() => navigation.pop()}
      />
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
              username: '',
              confirmPassword: '',
            }}
            validationSchema={LoginScheme}
            onSubmit={handleSignup}
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
                <AnimatedBox entering={buildAnimation(2)}>
                  <TextInput
                    autoCapitalize={false as never}
                    label="Username"
                    value={values.username}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    touched={touched.username}
                    error={errors.username ? t(`${errors.username}`) : ''}
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
                <Box marginVertical="xs" />
                <AnimatedBox entering={buildAnimation(3)}>
                  <TextInput
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    error={
                      errors.confirmPassword
                        ? t(`${errors.confirmPassword}`)
                        : ''
                    }
                    touched={touched.confirmPassword}
                    label={'Confirm Password'}
                    secureTextEntry
                    returnKeyType="go"
                    returnKeyLabel="Submit"
                    onSubmitEditing={handleSubmit as never}
                  />
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
                      label={'Create Account'}
                    />
                  </Box>
                </AnimatedBox>
              </>
            )}
          </Formik>
        </AnimatedBox>
      </KeyboardAwareScrollView>
      {loading && <LoadingOverlay />}
    </Box>
  );
};

export default Register;
