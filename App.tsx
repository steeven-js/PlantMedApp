import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {enableScreens} from 'react-native-screens';
import Orientation from 'react-native-orientation-locker';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';

import StackNavigator from '@src/navigation/StackNavigator';
import {persistor, store} from '@src/store';
import {components} from '@src/components';
import {Text, View} from 'react-native';

enableScreens();

const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
