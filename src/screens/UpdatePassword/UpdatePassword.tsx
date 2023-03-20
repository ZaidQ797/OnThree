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

const AnimatedBox = Animated.createAnimatedComponent(Box);
const UpdateScheme = Yup.object().shape({
  password: Yup.string()
    .min(4, 'PASSWORD_LENGTH_ERROR')
    .required('PASSWORD_REQUIRED'),
  newPassword: Yup.string()
    .min(8, 'PASSWORD_LENGTH_ERROR')
    .required('PASSWORD_REQUIRED'),
});
const ResetScheme = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'PASSWORD_LENGTH_ERROR')
    .required('PASSWORD_REQUIRED'),
});
type LoginScreenNavigationProps = NativeStackScreenProps<
  MainUserStackParamList,
  'UpdatePassword'
>;
const UpdatePassword = ({ navigation, route }: LoginScreenNavigationProps) => {
  const { t } = useTranslation('auth');
  const { colors } = useAppTheme();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const handleLogin = async (values: any) => {
    setLoading(true);
    const res = await AuthService.updatePassword(
      route.params?.from !== 'forget'
        ? {
            oldPass: values?.password,
            newPass: values?.newPassword,
          }
        : { email: route?.params?.email, newPass: values?.newPassword },
      route?.params?.from,
    );

    Alert.alert('OnThree', res?.message, [
      {
        text: 'OK',
        onPress: () =>
          route.params?.from !== 'forget'
            ? navigation.pop()
            : navigation.navigate(
                'AuthScreens' as never,
                { screen: 'Login' } as never,
              ),
      },
    ]);
    setLoading(false);
  };

  return (
    <ImageBackground
      style={{ flex: 1, justifyContent: 'flex-end' }}
      source={require('@assets/images/bg.png')}
    >
      <ScreenHeader
        transparent
        showBackButton={route?.params?.from === 'profile' ? true : false}
        onBackButtonPress={() => {
          navigation.pop();
        }}
        title={'Change Password'}
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
                password: '',
                newPassword: '',
              }}
              validationSchema={
                route?.params?.from === 'forget' ? ResetScheme : UpdateScheme
              }
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
                    {route?.params?.from === 'profile' && (
                      <AnimatedBox entering={buildAnimation(2)}>
                        <TextInput
                          // icon={require('@assets/icons/lock.png')}
                          value={values.password}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          error={errors.password ? t(`${errors.password}`) : ''}
                          touched={touched.password}
                          label={'Current Password'}
                          placeholder={'Enter Current Password'}
                          secureTextEntry
                          returnKeyType="go"
                          returnKeyLabel="Submit"
                          onSubmitEditing={handleSubmit as never}
                        />
                      </AnimatedBox>
                    )}
                    {route?.params?.from === 'profile' && (
                      <Box
                        style={{ backgroundColor: '#A6B4C7', borderWidth: 0.2 }}
                      />
                    )}
                    <AnimatedBox entering={buildAnimation(2)}>
                      <TextInput
                        // icon={require('@assets/icons/lock.png')}
                        value={values.newPassword}
                        onChangeText={handleChange('newPassword')}
                        onBlur={handleBlur('newPassword')}
                        error={
                          errors.newPassword ? t(`${errors.newPassword}`) : ''
                        }
                        touched={touched.newPassword}
                        label={'New Password'}
                        placeholder={'Enter New Password'}
                        secureTextEntry
                        returnKeyType="go"
                        returnKeyLabel="Submit"
                        onSubmitEditing={handleSubmit as never}
                      />
                    </AnimatedBox>
                  </Box>

                  <AnimatedBox entering={buildAnimation(4)} marginTop="xl">
                    <Box borderRadius="s" style={{ overflow: 'hidden' }}>
                      <Button
                        android_ripple={{ color: colors.primaryHighlight }}
                        disabled={!isValid}
                        isLoading={submiting}
                        onPress={handleSubmit as never}
                        buttonStyle={{ padding: 13 } as never}
                        label={'Update Password'}
                      />
                    </Box>
                  </AnimatedBox>
                </>
              )}
            </Formik>
          </AnimatedBox>
        </ScrollView>
        {loading && <LoadingOverlay />}
      </Box>
    </ImageBackground>
  );
};

export default UpdatePassword;
