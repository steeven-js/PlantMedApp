import React from 'react';

import {View, TouchableOpacity} from 'react-native';

import { text } from '@src/text';
import { hooks } from '@src/hooks';
import { utils } from '@src/utils';
import { theme } from '@src/constants';


interface Item {
  description: string;
  habitat: string;
  sources: string[];
  name: string;
}

const RenderDescription = ({item}: {item: Item}): JSX.Element => {
  const navigation = hooks.useAppNavigation();

  return (
    <View
      style={{
        paddingHorizontal: 20,
        marginBottom: utils.responsiveHeight(24),
      }}
    >
      <text.H2
        style={{
          textTransform: 'capitalize',
          color: theme.colors.mainColor,
          marginBottom: utils.responsiveHeight(10),
        }}
      >
        Description
      </text.H2>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: utils.responsiveHeight(6),
        }}
      >
        <text.T18
          style={{
            paddingBottom: 20,
            color: theme.colors.textColor,
          }}
        >
          {item?.description}
        </text.T18>
      </View>

      <text.H2
        style={{
          textTransform: 'capitalize',
          color: theme.colors.mainColor,
          marginBottom: utils.responsiveHeight(10),
        }}
      >
        Habitat
      </text.H2>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: utils.responsiveHeight(6),
        }}
      >
        <text.T18
          style={{
            paddingBottom: 20,
            color: theme.colors.textColor,
          }}
        >
          {item?.habitat}
        </text.T18>
      </View>

      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: 5,
          paddingVertical: 5,
          paddingHorizontal: 5,
          borderColor: theme.colors.steelTeal,
          backgroundColor: `${theme.colors.white}50`,
        }}
        onPress={() => {
          navigation.navigate('Source', {
            source: item.sources,
            title: item.name,
          });
        }}
      >
        <text.H2
          style={{
            textAlign: 'center',
            textTransform: 'capitalize',
            color: theme.colors.mainColor,
            // marginBottom: utils.responsiveHeight(10),
          }}
        >
          {'Sources >'}
        </text.H2>
      </TouchableOpacity>
    </View>
  );
};

export default RenderDescription;
