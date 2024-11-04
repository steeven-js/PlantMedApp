import React from 'react';

import { View, Platform } from 'react-native';

import { text } from '../../text';
import { utils } from '../../utils';
import { theme } from '../../constants';
import RenderPremiumOnly from './RenderPremiumOnly';

import { PlantType } from '@src/types';

const RenderUse = ({ item }: { item: PlantType }): JSX.Element => {
  const UsageSection = ({ title, content }: { title: string; content: string }) => (
    <>
      <text.H2
        style={{
          textTransform: 'capitalize',
          color: theme.colors.mainColor,
          marginBottom: utils.responsiveHeight(10),
        }}
      >
        {title}
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
          {content}
        </text.T18>
      </View>
    </>
  );

  const UsageContent = () => (
    <>
      <UsageSection title="Usages internes" content={item.usageInterne} />
      <UsageSection title="Usages externes" content={item.usageExterne} />
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
          <UsageContent />
        ) : (
          <RenderPremiumOnly />
        )
      ) : (
        <UsageContent />
      )}
    </View>
  );
};

export default RenderUse;
