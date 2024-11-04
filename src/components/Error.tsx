import React from 'react';

import {Text, View} from 'react-native';

import { theme } from '@src/constants';


const Error: React.FC = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          color: theme.colors.mainColor,
          textAlign: 'center',
        }}
      >
        Something went wrong
      </Text>
    </View>
  );

export default Error;
