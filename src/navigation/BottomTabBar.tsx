import React from 'react';
import {useSelector,useDispatch} from 'react-redux';

import {View, TouchableOpacity} from 'react-native';

import getTabs from '@src/utils/getTabs';

import { setScreen } from '@src/store/slices/tabSlice';

import { text } from '@src/text';
import { utils } from '@src/utils';
import { theme } from '@src/constants';
import { AppDispatch, RootState } from '@src/store';

const BottomTabBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const tabs = getTabs();

  const currentTabScreen = useSelector(
    (state: RootState) => state.tabSlice.screen,
  );

  return (
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
              <View
                style={{
                  marginBottom: 6,
                }}
              >
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
  );
};

export default BottomTabBar;
