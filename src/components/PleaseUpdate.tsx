import React, {useEffect} from 'react';
import {Alert, Linking, StyleSheet, Text, View} from 'react-native';

import {theme} from '../constants';
import {custom} from '../custom';

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
    <custom.ImageBackground
      style={styles.background}
      resizeMode='stretch'
      source={require('../assets/images/plantmed-launcher.png')}
    ></custom.ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: theme.colors.transparent,
  },
});

export default PleaseUpdate;
