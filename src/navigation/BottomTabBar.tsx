import React, { useRef } from 'react';
import {useSelector,useDispatch} from 'react-redux';

import {View, TouchableOpacity, Platform} from 'react-native';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

import { useSubscription } from '@src/hooks/revenueCat';

import getTabs from '@src/utils/getTabs';

import { setScreen } from '@src/store/slices/tabSlice';

import { text } from '@src/text';
import { utils } from '@src/utils';
import { theme } from '@src/constants';
import { AppDispatch, RootState } from '@src/store';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-6048143702887535/7510067811';

const BottomTabBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tabs = getTabs();

  const {
    isPremium,
  } = useSubscription();

  const currentTabScreen = useSelector(
    (state: RootState) => state.tabSlice.screen,
  );

  const bannerRef = useRef<BannerAd>(null);

  // (iOS) WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground.
  // Therefore it's advised to "manually" request a new ad when the app is foregrounded (https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8).
  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });

  const renderAd = () => {
    if (!isPremium) {
      return (
        <View style={{ width: '100%', alignItems: 'center' }}>
        <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
        </View>
      );
    }
    return null;
  };

  return (
    <>
      {renderAd()}
      <View
        style={{
          paddingTop: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 21,
          borderTopColor: '#EEEEEE',
          backgroundColor: theme.colors.mainColor,
          paddingBottom: utils.homeIndicatorSettings(),
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          width: '100%',
        }}
      >
        {tabs.map((item, index) => {
          const iconColor =
            item.name === currentTabScreen
              ? '#CFF5CE'
              : `${theme.colors.white}90`;
          const backgroundColor =
            item.name === currentTabScreen ? '#000' : theme.colors.transparent;

          return (
            <TouchableOpacity
              key={index}
              style={{
                alignItems: 'center',
              }}
              onPress={() => dispatch(setScreen(item.name))}
            >
              <View style={{ marginBottom: 6 }}>
                <item.icon
                  backgroundColor={backgroundColor}
                  iconColor={iconColor}
                />
              </View>
              <View
                style={{
                  marginBottom: 6,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <text.T12
                  style={
                    item.name === currentTabScreen
                      ? {color: '#CFF5CE'}
                      : {color: theme.colors.white}
                  }
                >
                  {item.label}
                </text.T12>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default BottomTabBar;
