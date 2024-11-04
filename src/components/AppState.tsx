import React, { useRef, useEffect } from 'react';

import { AppState as AppStateType } from 'react-native';

const AppState: React.FC = () => {
  const appState = useRef(AppStateType.currentState);

  useEffect(() => {
    const subscription = AppStateType.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      console.log('AppState:', appState.current);

      // Handle background or inactive state
      if (appState.current === 'background' || appState.current === 'inactive') {
        console.log('App moved to background or became inactive');
        // Add your background/inactive state logic here
      }
    });

    // Cleanup subscription
    return () => {
      subscription.remove();
    };
  }, []);

  return null;
};

export default AppState;
