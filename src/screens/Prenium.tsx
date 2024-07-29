import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Linking,
} from 'react-native';

import {text} from '../text';
import {custom} from '../custom';
import {theme} from '../constants';
import {UserType} from '../types';
import {RootState} from '../store';
import {components} from '../components';
import {utils} from '../utils';
import {hooks} from '../hooks';
import {useSubscription} from '../hooks/revenueCat';
import {userSlice} from '../store/slices/userSlice';

const SUBSCRIPTION_SKU = 'plm_199_m';

const Premium: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = hooks.useAppDispatch();
  const navigation = hooks.useAppNavigation();

  const user: UserType | null = useSelector(
    (state: RootState) => state.userSlice.user,
  );

  const {isSubscribed, offerings, purchaseSubscription} = useSubscription();

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const packageToPurchase = offerings.find(
        offer => offer.product.identifier === SUBSCRIPTION_SKU,
      );
      if (packageToPurchase) {
        await purchaseSubscription(packageToPurchase);
      } else {
        Alert.alert('Erreur', "Le package d'abonnement n'a pas été trouvé.");
        dispatch(userSlice.actions.setPrenium(false));
      }
    } catch (error) {
      console.error("Erreur lors de l'abonnement:", error);
      Alert.alert(
        'Erreur',
        "Une erreur est survenue lors de l'abonnement. Veuillez réessayer.",
      );
    } finally {
      setLoading(false);
    }
  };

  const alreadyPremium = () => {
    Alert.alert('Success', 'Vous êtes déjà Premium', [
      {
        text: 'OK',
        onPress: () => {
          console.log('OK Pressed');
        },
      },
    ]);
  };

  const openPrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const openTermsOfUse = () => {
    navigation.navigate('TermsOfUse');
  };

  const openAppleEULA = () => {
    // Ouvrir le lien vers le CLUF d'Apple
    // Vous pouvez utiliser Linking.openURL() de React Native pour ouvrir un lien web
    Linking.openURL(
      'https://www.apple.com/legal/internet-services/itunes/chfr/terms.html',
    );
  };

  const renderHeader = (): JSX.Element => {
    return <components.Header goBackIcon={true} title='Premium' />;
  };

  const renderContent = (): JSX.Element => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color={theme.colors.steelTeal} />
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <text.H2 style={styles.title}>
            Pour accéder à plus de fonctionnalités, passez à un compte Premium
          </text.H2>
          <text.H4 style={styles.subtitle}>
            Avantages du compte Premium :
          </text.H4>
          <text.T16>
            • Accès à des fiches détaillées sur plus de 100 plantes médicinales.
          </text.T16>
          <text.T16>
            • Recettes exclusives pour préparer des remèdes maison.
          </text.T16>
          <text.T16>
            • Conseils personnalisés pour utiliser les plantes selon vos
            besoins.
          </text.T16>
          <text.T16>
            • Mises à jour régulières avec de nouvelles informations et plantes
            ajoutées chaque mois.
          </text.T16>
        </View>
        <text.T16 style={styles.disclaimer}>
          L'abonnement se renouvelle automatiquement chaque mois. Vous pouvez le
          résilier à tout moment depuis votre compte.
        </text.T16>

        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={isSubscribed ? alreadyPremium : handleSubscribe}
        >
          <text.T18 style={styles.buttonText}>
            {isSubscribed
              ? 'Vous êtes déjà Premium'
              : 'Devenir Premium - 1,99 €/mois'}
          </text.T18>
        </TouchableOpacity>

        <text.T14 style={styles.termsText}>
          En activant le compte Premium, vous acceptez nos Conditions
          d'utilisation et notre Politique de confidentialité.
        </text.T14>

        <View style={styles.linksContainer}>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={openPrivacyPolicy}
          >
            <text.T12 style={styles.linkText}>Confidentialité</text.T12>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton} onPress={openTermsOfUse}>
            <text.T12 style={styles.linkText}>Conditions</text.T12>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton} onPress={openAppleEULA}>
            <text.T12 style={styles.linkText}>CLUF Apple</text.T12>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <custom.ImageBackground
      style={styles.background}
      resizeMode='stretch'
      source={require('../assets/bg/02.png')}
    >
      <custom.SafeAreaView
        insets={['top', 'bottom']}
        containerStyle={styles.safeArea}
      >
        {renderHeader()}
        {renderContent()}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    flexGrow: 1,
    paddingTop: utils.responsiveHeight(40),
    paddingBottom: utils.responsiveHeight(20),
    alignItems: 'center',
  },
  contentContainer: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 20,
  },
  subtitle: {
    marginBottom: 10,
  },
  disclaimer: {
    marginBottom: 20,
  },
  subscribeButton: {
    backgroundColor: theme.colors.steelTeal,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: utils.responsiveHeight(20),
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  termsText: {
    color: 'gray',
  },
  linksContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between', // Changé de 'space-around' à 'space-between'
    marginTop: 20,
  },
  linkButton: {
    paddingHorizontal: 10,
    borderWidth: 1,
    paddingVertical: 20,
    borderRadius: 10,
    borderColor: theme.colors.steelTeal,
    flex: 1, // Ajouté pour que les boutons prennent une largeur égale
    marginHorizontal: 5, // Ajouté pour un peu d'espace entre les boutons
    alignItems: 'center', // Pour centrer le texte horizontalement
  },
  linkText: {
    color: theme.colors.steelTeal,
  },
});

export default Premium;
