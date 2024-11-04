import React from 'react';

import { View, ScrollView } from 'react-native';

import { text } from '@src/text';
// import { hooks } from '@src/hooks';
import { components } from '@src/components';

const RenderPremiumOnly = (): JSX.Element => {
  // const navigation = hooks.useAppNavigation();
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginBottom: 20 }}>
        <text.H3 style={{ marginBottom: 10 }}>Votre compte est actuellement gratuit</text.H3>
        <text.T16 style={{ marginBottom: 20 }}>
          Pour accéder à plus de fonctionnalités, passez à un compte Premium
        </text.T16>
        <text.H4 style={{ marginBottom: 10 }}>Avantages du compte Premium :</text.H4>
        <text.T16>• Accès à des fiches détaillées sur plus de 100 plantes médicinales.</text.T16>
        <text.T16>• Recettes exclusives pour préparer des remèdes maison.</text.T16>
        <text.T16>• Conseils personnalisés pour utiliser les plantes selon vos besoins.</text.T16>
        <text.T16>
          • Mises à jour régulières avec de nouvelles informations et plantes ajoutées chaque mois.
        </text.T16>
      </View>
      <text.T16 style={{ marginBottom: 20 }}>Prix de l'abonnement Premium : 1,99 € / mois</text.T16>
      <text.T16 style={{ marginBottom: 20 }}>
        L'abonnement se renouvelle automatiquement chaque mois. Vous pouvez le résilier à tout
        moment depuis votre compte.
      </text.T16>
      <components.Button
        title="Activer le compte Premium"
        // onPress={() => {
        //   navigation.navigate('Premium');
        // }}
        containerStyle={{ marginBottom: 20 }}
      />
      <text.T14 style={{ color: 'gray' }}>
        En activant le compte Premium, vous acceptez nos Conditions d'utilisation et notre Politique
        de confidentialité.
      </text.T14>
    </ScrollView>
  );
};

export default RenderPremiumOnly;
