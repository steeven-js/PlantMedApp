import React from 'react';

import { View, Platform } from 'react-native';

import RenderPremiumOnly from './RenderPremiumOnly';

import { text } from '@src/text';
import { utils } from '@src/utils';
import { theme } from '@src/constants';
import { PlantType } from '@src/types';

const RenderProperty = ({ item }: { item: PlantType }): JSX.Element => {
  const PropertyContent = () => (
    <>
      <text.H2
        style={{
          textTransform: 'capitalize',
          color: theme.colors.mainColor,
          marginBottom: utils.responsiveHeight(10),
        }}
      >
        Propriétés
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
          {item.propriete}
        </text.T18>
      </View>
    </>
  );

  return (
    <View
      style={{
        paddingHorizontal: 20,
        marginBottom: utils.responsiveHeight(24),
      }}
    >
      {Platform.OS === 'ios' ? (
        item.is_premium ? (
          <PropertyContent />
        ) : (
          <RenderPremiumOnly />
        )
      ) : (
        <PropertyContent />
      )}
    </View>
  );
};

export default RenderProperty;
