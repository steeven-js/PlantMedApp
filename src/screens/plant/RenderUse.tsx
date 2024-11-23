import React from 'react';

import { View } from 'react-native';

import { getPremiumPlants } from '@src/hooks/plantStatus';

import { text } from '../../text';
import { utils } from '../../utils';
import { theme } from '../../constants';
import RenderPremiumOnly from './RenderPremiumOnly';

import { PlantType } from '@src/types';

// Extraction du composant UsageSection
interface UsageSectionProps {
  title: string;
  content: string;
}

const UsageSection: React.FC<UsageSectionProps> = ({ title, content }) => (
  <>
    <text.H2
      style={{
        textTransform: 'capitalize',
        color: theme.colors.mainColor,
        marginBottom: utils.responsiveHeight(10),
      }}>
      {title}
    </text.H2>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: utils.responsiveHeight(6),
      }}>
      <text.T18
        style={{
          paddingBottom: 20,
          color: theme.colors.textColor,
        }}>
        {content}
      </text.T18>
    </View>
  </>
);

// Extraction du composant UsageContent
interface UsageContentProps {
  item: PlantType;
}

const UsageContent: React.FC<UsageContentProps> = ({ item }) => (
  <>
    <UsageSection title="Usages internes" content={item.usageInterne} />
    <UsageSection title="Usages externes" content={item.usageExterne} />
  </>
);

// Composant principal
const RenderUse = ({ item }: { item: PlantType }): JSX.Element => {
  const premiumPlants = getPremiumPlants();
  const isPremium = premiumPlants.includes(item.id);

  return (
    <View
      style={{
        paddingHorizontal: utils.responsiveWidth(20),
        marginBottom: utils.responsiveHeight(24),
        borderRadius: 12,
        elevation: 2,
        shadowColor: theme.colors.transparent,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding: utils.responsiveWidth(16),
      }}>
      {isPremium ? <RenderPremiumOnly /> : <UsageContent item={item} />}
    </View>
  );
};

export default RenderUse;
