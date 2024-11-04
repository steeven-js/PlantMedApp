import React from 'react';

import {Text, Platform, TextStyle} from 'react-native';

import {theme} from '../constants';

type Props = {
  style?: TextStyle;
  children: React.ReactNode;
  numberOfLines?: number;
};

const T20: React.FC<Props> = ({children, style, numberOfLines}) => (
    <Text
      numberOfLines={numberOfLines}
      style={{
        color: theme.colors.textColor,
        ...theme.fonts.DM_Sans_700Bold,
        lineHeight: Platform.OS === 'ios' ? 20 * 1.7 : 14 * 1.7,
        fontSize: Platform.OS === 'ios' ? 20 : 14,
        ...style,
      }}
    >
      {children}
    </Text>
  );

export default T20;
