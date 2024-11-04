import React from 'react';

import {Text, Platform, TextStyle} from 'react-native';

import {theme} from '../constants';

type Props = {
  children: React.ReactNode;
  style?: TextStyle;
  numberOfLines?: number;
};

const H4: React.FC<Props> = ({children, numberOfLines, style}): JSX.Element => (
    <Text
      numberOfLines={numberOfLines}
      style={{
        ...theme.fonts.Inter_500Medium,
        ...style,
        fontSize: Platform.OS === 'ios' ? 18 : 16,
        color: theme.colors.mainColor,
      }}
    >
      {children}
    </Text>
  );

export default H4;
