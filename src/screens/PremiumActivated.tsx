import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';

import {text} from '../text';
import {alert} from '../alert';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {components} from '../components';
import {theme} from '../constants';

const PremiumActivated: React.FC = () => {
  const dispatch = hooks.useAppDispatch();
  const navigation = hooks.useAppNavigation();

  const [loading, setLoading] = useState<boolean>(false);

  const handlePremiumActivated = async () => {
    try {
      setLoading(true);

      navigation.reset({
        index: 0,
        routes: [{name: 'TabNavigator'}],
      });
    } catch (error: any) {
      alert.somethingWentWrong();
    } finally {
      setLoading(false);
    }
  };

  const renderContent = (): JSX.Element => {
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
          <text.H2 style={{marginBottom: 20}}>Félicitations !</text.H2>
          <text.H4 style={{marginBottom: 10}}>
            Vous êtes maintenant un membre Premium !
          </text.H4>
          <text.T16>
            Votre abonnement a été activé avec succès. Voici ce qui vous attend
            :
          </text.T16>
          <text.T16>
            • Accès immédiat à plus de 150 fiches détaillées sur les plantes
            médicinales
          </text.T16>
          <text.T16>
            • Recettes exclusives pour préparer vos remèdes maison
          </text.T16>
          <text.T16>
            • Conseils personnalisés pour l'utilisation des plantes
          </text.T16>
          {/* <text.T16>• Vidéos et tutoriels exclusifs</text.T16> */}
        </View>
      </ScrollView>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        loading={loading}
        title='Découvrir PlantMed'
        containerStyle={{margin: 20}}
        onPress={() => {
          handlePremiumActivated();
        }}
      />
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
        {renderContent()}
        {renderButton()}
      </custom.SafeAreaView>
    </custom.ImageBackground>
  );
};

export default PremiumActivated;
