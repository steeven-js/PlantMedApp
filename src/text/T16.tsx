import React from 'react';

import {Text, Platform, TextStyle} from 'react-native';

import {theme} from '../constants';

type Props = {
  style?: TextStyle;
  children: React.ReactNode;
  numberOfLines?: number;
};

const T16: React.FC<Props> = ({children, style, numberOfLines}) => (
    <Text
      numberOfLines={numberOfLines}
      style={{
        color: theme.colors.textColor,
        ...theme.fonts.DM_Sans_400Regular,
        lineHeight: Platform.OS === 'ios' ? 16 * 1.7 : 14 * 1.7,
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        ...style,
      }}
    >
      {children}
    </Text>
  );

export default T16;
