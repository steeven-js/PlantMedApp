import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { components } from './src/components';
import { persistor, store } from './src/store';
import { enableScreens } from 'react-native-screens';
import Orientation from 'react-native-orientation-locker';
import { PersistGate } from 'redux-persist/integration/react';
import StackNavigator from './src/navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuth } from './src/hooks/useAuth';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';

enableScreens();

const App = () => {

  useEffect(() => {
    Orientation.lockToPortrait();

  }, []);

  const {user} = useAuth();

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={<components.Loader />} persistor={persistor}>
          <NavigationContainer>
            {user ? <AuthStackNavigator /> : <StackNavigator />}
          </NavigationContainer>
        </PersistGate>
        <components.AppState />
      </Provider>
      <components.FlashMessage />
    </SafeAreaProvider>
  );
};

export default App;
