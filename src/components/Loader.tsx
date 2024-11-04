import React from 'react';

import {View, ActivityIndicator} from 'react-native';

const Loader: React.FC = (): JSX.Element => (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator
        color="black"
        size="large"
      />
    </View>
  );

export default Loader;
