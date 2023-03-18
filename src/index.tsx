import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import RNBootSplash from 'react-native-bootsplash';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ToastProvider } from 'react-native-toast-notifications';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useAppSelector, useAppDispatch } from '@hooks';
import { AuthNavigator, MainUserNavigator } from './navigation';
import theme from './theme';
import { navigationRef } from './services/navigation';
import { KeychainService } from '@services';
import { restore } from '@actions/auth';
import { useDispatch } from 'react-redux';
import AuthStackScreens from 'navigation/AuthNavigator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

const App = () => {
  const { token, isSignedOut, user } = useAppSelector(state => state.auth);
  const RootStack = createNativeStackNavigator();
  const insets = useSafeAreaInsets();
  const [bootstrapReady, setBootstrapReady] = useState(false);
  const [navigationReday, setNavigationReady] = useState(false);

  const dispatch = useDispatch();
  const bootstrapAsync = async () => {
    try {
      const credentials = await KeychainService.getCredentials();
      if (
        credentials != null &&
        credentials.token != null &&
        credentials.user !== null
      ) {
        dispatch(restore(credentials));
      }
    } catch (error) {
    } finally {
      setBootstrapReady(true);
    }
  };
  useEffect(() => {
    bootstrapAsync();

    if (bootstrapReady && navigationReday) {
      RNBootSplash.hide();
    }
  }, [bootstrapReady, navigationReday]);

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider
        placement="top"
        animationType="zoom-in"
        successColor={theme.colors.success}
        dangerColor={theme.colors.danger}
        warningColor={theme.colors.warning}
        normalColor={theme.colors.primary}
        offsetTop={insets.top}
        offsetBottom={insets.bottom}
        textStyle={{ textAlign: 'center' }}
      >
        <QueryClientProvider client={queryClient}>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              setNavigationReady(true);
            }}
          >
            <BottomSheetModalProvider>
              <RootStack.Navigator screenOptions={{ headerShown: false }}>
                {token !== '' ? (
                  <RootStack.Screen component={MainUserNavigator} name="Root" />
                ) : (
                  <RootStack.Screen component={AuthStackScreens} name="Root" />
                )}
              </RootStack.Navigator>
            </BottomSheetModalProvider>
          </NavigationContainer>
        </QueryClientProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
