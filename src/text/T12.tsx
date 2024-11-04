
import React from 'react';

import {Text, Platform} from 'react-native';

import {theme} from '../constants';

type Props = {
  style?: object;
  children: React.ReactNode;
  numberOfLines?: number;
};

const T12: React.FC<Props> = ({
  children,
  numberOfLines,
  style,
}): JSX.Element => (
    <Text
      numberOfLines={numberOfLines}
      style={{
        color: theme.colors.textColor,
        ...style,
        ...theme.fonts.DM_Sans_400Regular,
        lineHeight: 12 * 1.5,
        fontSize: Platform.OS === 'ios' ? 12 : 10,
      }}
    >
      {children}
    </Text>
  );

export default T12;
