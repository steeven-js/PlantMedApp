import React, { useState, useEffect } from 'react';

import { Text, View } from 'react-native';

import { theme } from '@src/constants';
import { components } from '@src/components';

const NoData: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <components.Loader />;
  }

  return (
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
        No data
      </Text>
    </View>
  );
};

export default NoData;
