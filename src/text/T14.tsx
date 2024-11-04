import React from 'react';

import {Text, Platform} from 'react-native';

import {theme} from '../constants';

type Props = {
  style?: object;
  children: React.ReactNode;
  numberOfLines?: number;
};

const T14: React.FC<Props> = ({
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
        lineHeight: 14 * 1.5,
        fontSize: Platform.OS === 'ios' ? 14 : 12,
      }}
    >
      {children}
    </Text>
  );

export default T14;
