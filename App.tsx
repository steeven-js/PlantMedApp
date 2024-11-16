import { Provider } from 'react-redux';
import React, { useEffect } from 'react';

import { enableScreens } from 'react-native-screens';
import Orientation from 'react-native-orientation-locker';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';

import { useAppVersion } from '@src/hooks/useAppVersion';
import AppState from '@src/components/AppState';
import FlashMessage from '@src/components/FlashMessage';
import StackNavigator from '@src/navigation/StackNavigator';
import PleaseUpdateStack from '@src/navigation/PleaseUpdateStack';
import { store } from '@src/store';
// import { useSubscription } from '@src/hooks/revenueCat';

enableScreens();

// Composant séparé pour la logique qui nécessite le Provider Redux
const AppContent = () => {
  const { isUpdateRequired } = useAppVersion();
  // const { checkSubscriptionStatus } = useSubscription();

  useEffect(() => {
    Orientation.lockToPortrait();
    // checkSubscriptionStatus();
  }, []);

  return (
    <>
      <NavigationContainer>
        {!isUpdateRequired ? <StackNavigator /> : <PleaseUpdateStack />}
      </NavigationContainer>
      <AppState />
    </>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppContent />
      </Provider>
      <FlashMessage />
    </SafeAreaProvider>
  );
};

export default App;