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
import { buildAnimation } from 'utils/functions';
import { startConnectionWatcher } from 'hooks/useConnection';
import { AuthService } from '@services';
import { signin } from '@actions/auth';
import { updateUser } from 'services/auth';
import FastImage from 'react-native-fast-image';
import { MainUserStackParamList } from 'navigation/MainUserNavigator';
import { AuthStackParamList } from '@navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

const AnimatedBox = Animated.createAnimatedComponent(Box);
const ForgetScheme = Yup.object().shape({
  email: Yup.string().email('INVALID_EMAIL').required('EMAIL_REQUIRED'),
});
const OTPScheme = Yup.object().shape({
  otp: Yup.string().min(4).required('OTP REQUIRED'),
});
type LoginScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList,
  'ForgetPassword'
>;
const ForgetPassword = ({ navigation, route }: LoginScreenNavigationProps) => {
  const { t } = useTranslation('auth');
  const { colors } = useAppTheme();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const handleLogin = async (values: any) => {
    if (showOTP) {
      const otp = await AsyncStorage.getItem('OTP');
      if (values.otp !== otp) {
        Alert.alert('OnThree', 'Invalid OTP');
      } else {
        setSubmiting(true);
        await AsyncStorage.removeItem('OTP');
        setTimeout(() => {
          setSubmiting(false);
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: 'UpdatePassword',
                  params: { from: 'forget', email: values?.email } as never,
                },
              ],
            }),
          );
        }, 500);
      }
    } else {
      setSubmiting(true);
      const res = await AuthService.forgetPassword({ email: values.email });
      if (res.OTP) {
        await AsyncStorage.setItem('OTP', res?.OTP?.toString());
        setShowOTP(true);
      }
      setSubmiting(false);
    }
  };

  return (
    <ImageBackground
      style={{ flex: 1, justifyContent: 'flex-end' }}
      source={require('@assets/images/bg.png')}
    >
      <ScreenHeader
        transparent
        showBackButton
        onBackButtonPress={() => {
          navigation.pop();
        }}
        title={'Reset Password'}
      />
      <Box
        flex={1}
        backgroundColor={'neutral'}
        borderTopLeftRadius="xl"
        borderTopRightRadius="xl"
        paddingTop="xl"
        paddingHorizontal="m"
      >
        <ScrollView style={{ flex: 1 }}>
          <AnimatedBox flex={1} paddingHorizontal="m">
            <Formik
              initialValues={{
                email: '',
                otp: '',
              }}
              validationSchema={showOTP ? OTPScheme : ForgetScheme}
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
                  <Box
                    borderColor="border"
                    borderWidth={0.6}
                    borderRadius={'s'}
                  >
                    <AnimatedBox entering={buildAnimation(2)}>
                      {!showOTP && (
                        <TextInput
                          // icon={require('@assets/icons/mail.png')}
                          tintColor={colors.danger}
                          value={values.email}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          error={errors.email ? t(`${errors.email}`) : ''}
                          touched={touched.email}
                          label={'Existing Email'}
                          placeholder={'Enter Existing Email'}
                          returnKeyType="go"
                          returnKeyLabel="Submit"
                          keyboardType="email-address"
                          autoCapitalize={false}
                          onSubmitEditing={handleSubmit as never}
                        />
                      )}
                    </AnimatedBox>

                    {showOTP && (
                      <AnimatedBox entering={buildAnimation(2)}>
                        <TextInput
                          // icon={require('@assets/icons/lock.png')}
                          value={values.otp}
                          tintColor={'danger'}
                          onChangeText={handleChange('otp')}
                          onBlur={handleBlur('otp')}
                          error={errors.otp ? t(`${errors.otp}`) : ''}
                          touched={touched.otp}
                          label={'OTP'}
                          placeholder={'Enter OTP'}
                          returnKeyLabel="Submit"
                          keyboardType="decimal-pad"
                          onSubmitEditing={handleSubmit as never}
                        />
                      </AnimatedBox>
                    )}
                  </Box>

                  <AnimatedBox entering={buildAnimation(4)} marginTop="xl">
                    <Box borderRadius="s" style={{ overflow: 'hidden' }}>
                      <Button
                        backgroundColor="danger"
                        android_ripple={{ color: colors.primaryHighlight }}
                        disabled={!isValid}
                        isLoading={submiting}
                        onPress={handleSubmit as never}
                        buttonStyle={{ padding: 13 } as never}
                        label={showOTP ? 'Verify OTP' : 'Send OTP'}
                      />
                    </Box>
                  </AnimatedBox>
                </>
              )}
            </Formik>
          </AnimatedBox>
        </ScrollView>
      </Box>
    </ImageBackground>
  );
};

export default ForgetPassword;
