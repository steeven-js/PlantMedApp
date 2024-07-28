import {useSelector} from 'react-redux';
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
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
          alignItems: 'center',
        }}
      >
        <View style={{marginBottom: 20}}>
          {/* <text.H3 style={{marginBottom: 10}}>
              Votre compte est actuellement gratuit
            </text.H3> */}
          <text.H2 style={{marginBottom: 20}}>
            Pour accéder à plus de fonctionnalités, passez à un compte Premium
          </text.H2>
          <text.H4 style={{marginBottom: 10}}>
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
        <text.T16 style={{marginBottom: 20}}>
          L'abonnement se renouvelle automatiquement chaque mois. Vous pouvez le
          résilier à tout moment depuis votre compte.
        </text.T16>

        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.steelTeal,
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
            marginBottom: utils.responsiveHeight(20),
            width: '100%',
          }}
          onPress={isSubscribed ? alreadyPrenium : handleSubscribe}
        >
          <text.T18 style={{color: 'white', fontWeight: 'bold'}}>
            {isSubscribed
              ? 'Vous êtes déjà Premium'
              : 'Devenir Premium - 1,99 €/mois'}
          </text.T18>
        </TouchableOpacity>

        <text.T14 style={{color: 'gray'}}>
          En activant le compte Premium, vous acceptez nos Conditions
          d'utilisation et notre Politique de confidentialité.
        </text.T14>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
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
            <text.T14 style={{color: theme.colors.steelTeal}}>
              Confidentialité
            </text.T14>
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
            <text.T14 style={{color: theme.colors.steelTeal}}>
              Conditions
            </text.T14>
          </TouchableOpacity>
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
