import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import Orientation from 'react-native-orientation-locker';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { components } from './src/components';
import { persistor, store } from './src/store';
import { useAppVersion } from './src/hooks/useAppVersion';
import StackNavigator from './src/navigation/StackNavigator';
import PleaseUpdateStack from './src/navigation/PleaseUpdateStack';

enableScreens();

const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  const {isUpdateRequired} = useAppVersion();

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={<components.Loader />} persistor={persistor}>
          <NavigationContainer>
            {!isUpdateRequired ? <StackNavigator /> : <PleaseUpdateStack />}
          </NavigationContainer>
        </PersistGate>
        <components.AppState />
      </Provider>
      <components.FlashMessage />
    </SafeAreaProvider>
  );
};

export default App;
