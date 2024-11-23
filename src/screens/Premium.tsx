import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  Platform,
} from 'react-native';

import { SubscriptionStatus, useSubscription } from '@src/hooks/revenueCat';
import { text } from '@src/text';
import { hooks } from '@src/hooks';
import { utils } from '@src/utils';
import { custom } from '@src/custom';
import { theme } from '@src/constants';
import { components } from '@src/components';

const PREMIUM_FEATURES = [
  'Aucune publicité.',
  'Accès à des fiches détaillées sur plus de 100 plantes médicinales.',
  'Recettes exclusives pour préparer des remèdes maison.',
  'Conseils personnalisés pour utiliser les plantes selon vos besoins.',
  'Mises à jour régulières avec de nouvelles informations et plantes ajoutées chaque mois.',
];

const Premium: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const {
    offerings,
    purchaseSubscription,
    fetchOfferings,
    loading,
    error,
    subscriptionDetails,
  } = useSubscription();

  const isPremium = subscriptionDetails?.status === SubscriptionStatus.PREMIUM;

  const handleSubscribe = async () => {
    if (isPremium) {
      Alert.alert('Info', 'Vous êtes déjà abonné Premium.');
      return;
    }

    if (!offerings || offerings.length === 0) {
      await fetchOfferings();
    }

    if (!offerings || offerings.length === 0) {
      Alert.alert('Erreur', 'Aucune offre disponible pour le moment.');
      return;
    }

    try {
      await purchaseSubscription(offerings[0]);
    } catch (err) {
      console.error("Erreur lors de l'abonnement:", err);
      Alert.alert(
        'Erreur',
        error || "Une erreur est survenue lors de l'abonnement. Veuillez réessayer."
      );
    }
  };

  const navigationLinks = [
    {
      title: 'Confidentialité',
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
    {
      title: 'Conditions',
      onPress: () => navigation.navigate('TermsOfUse'),
    },
    {
      title: Platform.OS === 'ios' ? 'CLUF Apple' : 'CLUF Google',
      onPress: Platform.OS === 'ios'
        ? () => Linking.openURL('https://www.apple.com/legal/internet-services/itunes/chfr/terms.html')
        : () => Linking.openURL('https://play.google.com/about/play-terms/'),
    },
  ];

  const renderFeatures = () => (
    <View style={styles.featuresContainer}>
      {PREMIUM_FEATURES.map((feature, index) => (
        <text.T16 key={index} style={styles.featureText}>
          • {feature}
        </text.T16>
      ))}
    </View>
  );

  return (
    <custom.ImageBackground
      style={styles.background}
      resizeMode="stretch"
      source={require('@src/assets/bg/02.png')}
    >
      <custom.SafeAreaView
        insets={['top', 'bottom']}
        containerStyle={styles.safeArea}
      >
        <components.Header goBackIcon={true} title="Premium" />
        
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            <text.H2 style={styles.title}>
              Pour accéder à plus de fonctionnalités, passez à un compte Premium
            </text.H2>
            <text.H4 style={styles.subtitle}>
              Avantages du compte Premium :
            </text.H4>
            {renderFeatures()}
          </View>

          <text.T16 style={styles.disclaimer}>
            L'abonnement se renouvelle automatiquement chaque mois. Vous pouvez le
            résilier à tout moment depuis votre compte.
          </text.T16>

          <TouchableOpacity
            style={[styles.subscribeButton, loading && styles.disabledButton]}
            onPress={handleSubscribe}
            disabled={loading || isPremium}
          >
            <text.T18 style={styles.buttonText}>
              {loading 
                ? 'Chargement...' 
                : isPremium 
                  ? 'Vous êtes déjà Premium'
                  : 'Devenir Premium - 1,99 €/mois'}
            </text.T18>
          </TouchableOpacity>

          <text.T14 style={styles.termsText}>
            En activant le compte Premium, vous acceptez nos Conditions
            d'utilisation et notre Politique de confidentialité.
          </text.T14>

          <View style={styles.linksContainer}>
            {navigationLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.linkButton}
                onPress={link.onPress}
              >
                <text.T12 style={styles.linkText}>{link.title}</text.T12>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </custom.SafeAreaView>
    </custom.ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: theme.colors.transparent,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    flexGrow: 1,
    paddingTop: utils.responsiveHeight(40),
    paddingBottom: utils.responsiveHeight(20),
  },
  contentContainer: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 10,
  },
  featuresContainer: {
    marginVertical: 10,
  },
  featureText: {
    marginBottom: 8,
  },
  disclaimer: {
    marginBottom: 20,
    textAlign: 'center',
    color: theme.colors.textColor,
  },
  subscribeButton: {
    backgroundColor: theme.colors.steelTeal,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: utils.responsiveHeight(20),
    width: '100%',
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  termsText: {
    color: theme.colors.textColor,
    textAlign: 'center',
    marginBottom: 20,
  },
  linksContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  linkButton: {
    paddingHorizontal: 10,
    borderWidth: 1,
    paddingVertical: 20,
    borderRadius: 10,
    borderColor: theme.colors.steelTeal,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  linkText: {
    color: theme.colors.steelTeal,
  },
});

export default Premium;