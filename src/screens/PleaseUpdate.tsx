import React, {useEffect} from 'react';

import {Alert, Linking, Platform, StyleSheet} from 'react-native';

import {custom} from '../custom';
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
              Platform.OS === 'ios'
                ? 'https://apps.apple.com/fr/app/plantmed/id6503098172'
                : 'https://play.google.com/store/apps/details?id=com.jsprod.android.plantmed&hl=fr&pli=1',
            ),
        },
      ],
    );
  }, []);

  return (
    <custom.ImageBackground
      style={styles.background}
      resizeMode="stretch"
      source={require('@src/assets/images/plantmed-launcher.png')}
     />
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
