import React from 'react';
import {View, StyleSheet} from 'react-native';
import {text} from '../../text';
import {utils} from '../../utils';
import {theme} from '../../constants';
import {PlantType} from '@src/types';
import RenderPremiumOnly from './RenderPremiumOnly';

const CautionBullet = () => <View style={styles.bullet} />;

const CautionItem = ({precaution}: {precaution: string}) => (
  <View style={styles.cautionContainer}>
    <CautionBullet />
    <text.T18 style={styles.cautionText}>{precaution}</text.T18>
  </View>
);

const CautionContent = ({precautions}: {precautions: string[]}) => (
  <>
    <text.H2 style={styles.title}>Propriétés</text.H2>
    {precautions.map((precaution, index) => (
      <CautionItem key={`property-${index}`} precaution={precaution} />
    ))}
  </>
);

const RenderCaution = ({item}: {item: PlantType}): JSX.Element => {
  return (
    <View style={styles.container}>
      {item.is_premium ? (
        <RenderPremiumOnly />
      ) : (
        <CautionContent precautions={item.precaution} />
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
  cautionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: utils.responsiveHeight(12),
    paddingHorizontal: utils.responsiveWidth(4),
  },
  cautionText: {
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

export default RenderCaution;
