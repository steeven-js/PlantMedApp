import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {custom} from '../custom';
import {theme} from '../constants';
import {UserType} from '../types';
import {RootState} from '../store';
import {components} from '../components';
import {utils} from '../utils';
import {hooks} from '../hooks';
import {useSubscription} from '../hooks/revenueCat';

const SUBSCRIPTION_SKU = 'plm_199_m';

const Prenium: React.FC = () => {
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
        // Après l'achat, nous devons vérifier à nouveau l'état de l'abonnement
      } else {
        Alert.alert('Erreur', "Le package d'abonnement n'a pas été trouvé.");
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

  const alreadyPrenium = () => {
    return Alert.alert('Success', 'Vous êtes déjà Prenium', [
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

  const renderHeader = (): JSX.Element => {
    return <components.Header goBackIcon={true} title='Premium' />;
  };

  const renderContent = (): JSX.Element => {
    if (loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size='large' color={theme.colors.steelTeal} />
        </View>
      );
    }

    return (
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          flexGrow: 1,
          paddingTop: utils.responsiveHeight(40),
          paddingBottom: utils.responsiveHeight(20),
        }}
      >
        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 10}}>
            Devenez Membre Premium!
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
            Abonnement Premium Plantes Médicinales
          </Text>
          <Text style={{fontSize: 16, marginBottom: 20}}>
            Pour seulement 1,99 € par mois, profitez d'un accès exclusif à des
            contenus premium sur les plantes médicinales. Voici ce que vous
            obtenez avec l'abonnement Premium :
          </Text>
          <Text style={{fontSize: 16, marginBottom: 10}}>
            - Accès à des fiches détaillées sur plus de 100 plantes médicinales.
          </Text>
          <Text style={{fontSize: 16, marginBottom: 10}}>
            - Recettes exclusives pour préparer des remèdes maison.
          </Text>
          <Text style={{fontSize: 16, marginBottom: 10}}>
            - Conseils personnalisés pour utiliser les plantes selon vos
            besoins.
          </Text>
          <Text style={{fontSize: 16, marginBottom: 10}}>
            - Mises à jour régulières avec de nouvelles informations et plantes
            ajoutées chaque mois.
          </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>
            Durée de l'abonnement : 1 mois
          </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 20}}>
            Prix : 1,99 € par mois (renouvellement automatique)
          </Text>
          <components.Button
            loading={loading}
            title={isSubscribed ? 'Vous êtes abonné' : "S'abonner maintenant"}
            containerStyle={{margin: 20}}
            onPress={isSubscribed ? alreadyPrenium : handleSubscribe}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                borderWidth: 1,
                paddingVertical: 20,
                borderRadius: 10,
                borderColor: theme.colors.steelTeal,
              }}
              onPress={openPrivacyPolicy}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: 'gray',
                }}
              >
                Politique de confidentialité
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                borderWidth: 1,
                paddingVertical: 20,
                borderRadius: 10,
                borderColor: theme.colors.steelTeal,
              }}
              onPress={openTermsOfUse}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: 'gray',
                }}
              >
                Conditions d'utilisation
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <custom.ImageBackground
      style={{flex: 1}}
      resizeMode='stretch'
      source={require('../assets/bg/02.png')}
    >
      <custom.SafeAreaView
        insets={['top', 'bottom']}
        containerStyle={{backgroundColor: theme.colors.transparent}}
      >
        {renderHeader()}
        {renderContent()}
      </custom.SafeAreaView>
    </custom.ImageBackground>
  );
};

export default Prenium;
