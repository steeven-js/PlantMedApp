import React from 'react';

import { View } from 'react-native';

import { text } from '../../text';
import { utils } from '../../utils';
import { theme } from '../../constants';

import { PlantType } from '@src/types';

const RenderCaution = ({ item }: { item: PlantType }): JSX.Element => {
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
        Précautions
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
            color: theme.colors.textColor,
          }}
        >
          {item.precaution}
        </text.T18>
      </View>
    </View>
  );
};

export default RenderCaution;
