import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {enableScreens} from 'react-native-screens';
import Orientation from 'react-native-orientation-locker';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';

import StackNavigator from '@src/navigation/StackNavigator';
import {persistor, store} from '@src/store';
import AppState from '@src/components/AppState';
import FlashMessage from '@src/components/FlashMessage';
import { useAppVersion } from '@src/hooks/useAppVersion';
import PleaseUpdateStack from '@src/navigation/PleaseUpdateStack';

enableScreens();

const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  const {isUpdateRequired} = useAppVersion();

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
        {!isUpdateRequired ? <StackNavigator /> : <PleaseUpdateStack />}
        </NavigationContainer>
        <AppState />
      </Provider>
      <FlashMessage />
    </SafeAreaProvider>
  );
};

export default App;
