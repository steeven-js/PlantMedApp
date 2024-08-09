import React from 'react';
import {Alert, Linking, Text, View} from 'react-native';

import {theme} from '../constants';
import { useFocusEffect } from '@react-navigation/native';

const PleaseUpdate: React.FC = () => {
  useFocusEffect(
    React.useCallback(() => {
      Alert.alert('Info', "Veuillez mettre à jour l'application", [
        {
          text: 'OK',
          onPress: () =>
            Linking.openURL(
              'https://apps.apple.com/fr/app/plantmed/id6503098172',
            ),
        },
      ]);
    }, [])
  );

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
        Veuillez mettre à jour l'application
      </Text>
    </View>
  );
};

export default PleaseUpdate;
