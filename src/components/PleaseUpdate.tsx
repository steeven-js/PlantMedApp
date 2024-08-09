import React, {useEffect} from 'react';
import {Alert, Linking, Text, View} from 'react-native';

import {theme} from '../constants';

const PleaseUpdate: React.FC = () => {
  useEffect(() => {
    Alert.alert(
      'Mise à jour requise',
      "Veuillez mettre à jour l'application pour continuer à l'utiliser.",
      [
        {
          text: 'Mettre à jour',
          onPress: () =>
            Linking.openURL(
              'https://play.google.com/store/apps/details?id=com.gh',
            ),
        },
      ],
    );
  }, []);

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
