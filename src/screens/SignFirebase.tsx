import axios from 'axios';
import auth from '@react-native-firebase/auth';
import React, {useState, useEffect, useRef} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {text} from '../text';
import {alert} from '../alert';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {theme} from '../constants';
import {components} from '../components';
import {validation} from '../validation';
import {ENDPOINTS, CONFIG} from '../config';


const SignUp: React.FC = () => {
  const navigation = hooks.useAppNavigation();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'AIzaSyAozuRPyY7beRH4mzxV6A4YsU1K28USYKM',
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      // Vérifiez si votre appareil prend en charge Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Obtenez les informations de l'utilisateur
      const { idToken } = await GoogleSignin.signIn();
      // Créez un credential avec le token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Connectez-vous à Firebase avec le credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      
      // L'utilisateur est maintenant connecté
      // console.log('Utilisateur connecté :', userCredential.user.displayName);
      
      // Naviguez vers l'écran suivant ou effectuez d'autres actions nécessaires
      // navigation.replace('Home');
    } catch (error) {
      console.error('Erreur lors de la connexion Google :', error);
      alert.somethingWentWrong();
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      setLoading(true);
      const response = await axios({
        method: 'post',
        headers: CONFIG.headers,
        url: ENDPOINTS.CREATE_USER,
        // data: {name, email, password},
      });

      if (response.status === 200) {
        // navigation.replace('SignUpAccountCreated', {email, password});
        return;
      }

      alert.somethingWentWrong();
    } catch (error: any) {
      if (error.response.status === 409) {
        alert.userWithThisNameOrEmailAlreadyExists();
        return;
      }

      alert.somethingWentWrong();
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = (): JSX.Element => {
    return <components.Header goBackIcon={true} />;
  };

  const renderTitle = (): JSX.Element => {
    return (
      <text.H1
        style={{
          textTransform: 'capitalize',
          marginBottom: utils.responsiveHeight(40),
        }}
      >
        Inscription
      </text.H1>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title={'oAuth'}
        onPress={() => {handleGoogleSignIn}}
        loading={loading}
      />
    );
  };

  const renderHeight = (): JSX.Element => {
    return <View style={{height: utils.responsiveHeight(70, true)}} />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          justifyContent: 'center',
        }}
      >
        {renderTitle()}
        {renderButton()}
        {renderHeight()}
      </KeyboardAwareScrollView>
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

export default SignUp;
