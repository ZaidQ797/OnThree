import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Root from './src';
import { store } from './src/store';
import { configureAxiosInterceoptors } from './src/services/appAxios.interceptor';

const App = () => {
  configureAxiosInterceoptors(store);
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Root />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
