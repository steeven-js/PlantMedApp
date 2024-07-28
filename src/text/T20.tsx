import React from 'react';
import {Text, TextStyle, Platform} from 'react-native';

type Props = {
  style?: TextStyle;
  children: React.ReactNode;
  numberOfLines?: number;
};

import {theme} from '../constants';

const T20: React.FC<Props> = ({children, style, numberOfLines}) => {
  return (
    <Text
      style={{
        color: theme.colors.textColor,
        ...theme.fonts.DM_Sans_700Bold,
        lineHeight: Platform.OS === 'ios' ? 20 * 1.7 : 14 * 1.7,
        fontSize: Platform.OS === 'ios' ? 20 : 14,
        ...style,
      }}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export default T20;
