import React, { useEffect } from 'react';

import { View } from 'react-native';

import getTabs from '@src/utils/getTabs';

import { actions } from '@src/store/actions';

import BottomTabBar from '@src/navigation/BottomTabBar';

import { hooks } from '@src/hooks';
import { custom } from '@src/custom';
import Home from '@src/screens/tabs/Home';
import { components } from '@src/components';
import Plants from '@src/screens/tabs/Plants';
import Profile from '@src/screens/tabs/Profile';
import Symptoms from '@src/screens/tabs/Symptoms';

const TabNavigator: React.FC = () => {
  const dispatch = hooks.useAppDispatch();
  const currentTabScreen = hooks.useAppSelector(state => state.tabSlice.screen);

  const tabs = getTabs();

  useEffect(() => {
    dispatch(actions.resetFilters());
  }, [currentTabScreen, dispatch]);

  const getTitle = (): string | null => {
    if (currentTabScreen === 'Profile') {
      return 'Mon profil';
    }

    return null;
  };

  const getSearch = (): boolean => {
    if (currentTabScreen === 'Symptoms' || currentTabScreen === 'Plants') {
      return true;
    }

    return false;
  };

  const renderHeader = (): JSX.Element => (
    <components.Header
      basketIcon
      bottomLine
      burgerIcon
      userAvatar
      search={getSearch()}
      title={getTitle()}
    />
  );

  const renderScreens = (): JSX.Element => (
    <View style={{ flex: 1 }}>
      {currentTabScreen === tabs[0].name && <Home />}
      {currentTabScreen === tabs[1].name && <Plants />}
      {currentTabScreen === tabs[2].name && <Symptoms />}
      {currentTabScreen === tabs[3].name && <Profile />}
    </View>
  );

  const renderBottomTabBar = (): JSX.Element => <BottomTabBar />;

  return (
    <custom.SafeAreaView insets={['top']}>
      {renderHeader()}
      {renderScreens()}
      {renderBottomTabBar()}
    </custom.SafeAreaView>
  );
};

export default TabNavigator;
