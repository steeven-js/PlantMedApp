import React from 'react';

import {View} from 'react-native';

import {svg} from '../assets/svg';
import {theme} from '../constants';
import {SymptomType} from '../types';

type Props = {
  version?: number;
  item: SymptomType;
  containerStyle?: object;
};

const SymptomPrenium: React.FC<Props> = ({containerStyle, item}) => {
  return (
    <View style={containerStyle}>
      <View
        style={{
          backgroundColor: theme.colors.white,
          borderRadius: 5,
          padding: 10,
          position: 'absolute',
          top: 10,
          left: 10,
        }}
      >
        <svg.PremiumSvg
          fillColor={theme.colors.yellowStar}
          strokeColor={theme.colors.yellowStar}
          width="30px"
          height="30px"
        />
      </View>
    </View>
  );
};

export default SymptomPrenium;
