import React from 'react';

import {Text, Platform, TextStyle} from 'react-native';

import {theme} from '../constants';

type Props = {
  style?: TextStyle;
  children: React.ReactNode;
  numberOfLines?: number;
};

const T18: React.FC<Props> = ({children, style, numberOfLines}) => (
    <Text
      numberOfLines={numberOfLines}
      style={{
        color: theme.colors.textColor,
        ...theme.fonts.Inter_500Medium,
        lineHeight: Platform.OS === 'ios' ? 18 * 1.7 : 14 * 1.7,
        fontSize: Platform.OS === 'ios' ? 18 : 14,
        ...style,
      }}
    >
      {children}
    </Text>
  );

export default T18;
