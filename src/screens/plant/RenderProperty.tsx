import React from 'react';
import {View, StyleSheet} from 'react-native';
import RenderPremiumOnly from './RenderPremiumOnly';
import {text} from '@src/text';
import {utils} from '@src/utils';
import {theme} from '@src/constants';
import {PlantType} from '@src/types';

const PropertyBullet = () => <View style={styles.bullet} />;

const PropertyItem = ({property}: {property: string}) => (
  <View style={styles.propertyContainer}>
    <PropertyBullet />
    <text.T18 style={styles.propertyText}>{property}</text.T18>
  </View>
);

const PropertyContent = ({properties}: {properties: string[]}) => (
  <>
    <text.H2 style={styles.title}>Propriétés</text.H2>
    {properties.map((property, index) => (
      <PropertyItem key={`property-${index}`} property={property} />
    ))}
  </>
);

const RenderProperty = ({item}: {item: PlantType}): JSX.Element => {
  return (
    <View style={styles.container}>
      {item.is_premium ? (
        <RenderPremiumOnly />
      ) : (
        <PropertyContent properties={item.propriete} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  },
  title: {
    textTransform: 'capitalize',
    color: theme.colors.mainColor,
    marginBottom: utils.responsiveHeight(16),
    fontWeight: '600',
  },
  propertyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: utils.responsiveHeight(12),
    paddingHorizontal: utils.responsiveWidth(4),
  },
  propertyText: {
    color: theme.colors.textColor,
    flex: 1,
    lineHeight: 24,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.mainColor,
    marginRight: utils.responsiveWidth(12),
    marginTop: 8,
  },
});

export default RenderProperty;
