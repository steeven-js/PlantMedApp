import axios from 'axios';
import {StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import firestore from '@react-native-firebase/firestore';

import {text} from '../text';
import {alert} from '../alert';
import {utils} from '../utils';
import {hooks} from '../hooks';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';
import {actions} from '../store/actions';
import {validation} from '../validation';
import {ENDPOINTS, CONFIG} from '../config';
import {useAppSelector, useAppDispatch} from '../store';
import {validateEmail} from '../validation/validateEmail';
import {handleTextChange} from '../utils/handleTextChange';

const SignIn: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const dispatch = useAppDispatch();

  // const rememberMe = hooks.useAppSelector(state => state.userSlice.rememberMe);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const handleEmailChange = handleTextChange(setEmail);
  const handlePasswordChange = handleTextChange(setPassword);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const user = {email, password};

  useEffect(() => {
    if (loading) {
      emailInputRef.current?.blur();
      passwordInputRef.current?.blur();
    }

    GoogleSignin.configure({
      webClientId:
        '453782988338-bjrced2v0tqohg68j6dljju0qp1tqrgm.apps.googleusercontent.com',
    });
  }, [loading]);

  // Générer une chaine de caractères aléatoire de 7 caractères
  const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  // Fonction pour gérer la connexion de l'utilisateur
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        emailVerified: userCredential.user.emailVerified,
      };

      if (user) {
        // Créer un document Firestore dans la collection 'UserProfiles' avec l'uid de l'utilisateur
        await firestore()
          .collection('UserProfiles')
          .doc(user.uid)
          .set({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp(),
            // Ajoutez d'autres champs nécessaires ici
          });

        console.log('UserProfile login successfully');
      }
    } catch (error: any) {
      console.error('Error:', error);
      alert.somethingWentWrong();
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour gérer la connexion Google
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      // Get the user's ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );

      // Get the authenticated user
      const authenticatedUser = userCredential.user;

      if (authenticatedUser) {
        const userProfileRef = firestore()
          .collection('UserProfiles')
          .doc(authenticatedUser.uid);

        const userProfileData = {
          uid: authenticatedUser.uid,
          email: authenticatedUser.email,
          displayName: authenticatedUser.displayName || `Utilisateur - ${generateRandomString()}`,
          photoURL: authenticatedUser.photoURL || '',
          updatedAt: firestore.FieldValue.serverTimestamp(),
          service: 'google',
          // Ajoutez d'autres champs nécessaires ici
        };

        // Utilisation de set avec merge: true pour créer ou mettre à jour le document
        await userProfileRef.set(userProfileData, {merge: true});

        console.log('UserProfile created/updated successfully');
      }

      return userCredential;
    } catch (error) {
      console.error('Erreur lors de la connexion Google :', error);
      alert.somethingWentWrong();
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour gérer la connexion Apple
  const handleAppleSignIn = async () => {
    setLoading(true);
    try {
      // Start the sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identity token returned');
      }

      // Create a Firebase credential from the response
      const {identityToken, nonce} = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );

      // Sign the user in with the credential
      const userCredential = await auth().signInWithCredential(appleCredential);
      const authenticatedUser = userCredential.user;

      if (authenticatedUser) {
        const userProfileRef = firestore()
          .collection('UserProfiles')
          .doc(authenticatedUser.uid);

        const userProfileData = {
          uid: authenticatedUser.uid,
          email: authenticatedUser.email || 'identifiant apple',
          displayName: authenticatedUser.displayName || `Utilisateur - ${generateRandomString()}`,
          photoURL: authenticatedUser.photoURL || '',
          updatedAt: firestore.FieldValue.serverTimestamp(),
          service: 'apple',
          // Ajoutez d'autres champs nécessaires ici
        };

        await userProfileRef.set(userProfileData, {merge: true});

        console.log('UserProfile created/updated successfully');
      }

      return userCredential;
    } catch (error) {
      console.error('Erreur lors de la connexion Apple :', error);
      alert.somethingWentWrong();
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour afficher le header
  const renderHeader = (): JSX.Element => {
    return <components.Header goBackIcon={true} />;
  };

  // Fonction pour afficher le titre
  const renderTitle = (): JSX.Element => {
    return (
      <text.H1
        numberOfLines={1}
        style={{
          textTransform: 'capitalize',
          marginBottom: utils.responsiveHeight(14),
        }}>
        Bienvenue
      </text.H1>
    );
  };

  // Fonction pour afficher la description
  const renderDescription = (): JSX.Element => {
    return (
      <text.T18
        style={{marginBottom: utils.responsiveHeight(40)}}
        numberOfLines={1}>
        Connectez-vous à votre compte
      </text.T18>
    );
  };

  // Fonction pour afficher les champs de saisie
  const renderInputFields = (): JSX.Element => {
    return (
      <React.Fragment>
        <custom.InputField
          label="email"
          value={email}
          innerRef={emailInputRef}
          placeholder="entrez votre email"
          keyboardType="email-address"
          onChangeText={handleEmailChange}
          checkIcon={validateEmail(email, true)}
          containerStyle={{marginBottom: utils.responsiveHeight(20)}}
        />
        <custom.InputField
          label="mot de passe"
          value={password}
          eyeOffIcon={true}
          keyboardType="default"
          innerRef={passwordInputRef}
          placeholder="entrez votre mot de passe"
          secureTextEntry={secureTextEntry}
          onChangeText={handlePasswordChange}
          setSecureTextEntry={setSecureTextEntry}
          containerStyle={{marginBottom: utils.responsiveHeight(20)}}
        />
      </React.Fragment>
    );
  };

  // Fonction pour afficher le lien pour récupérer le mot de passe
  const renderForgotPassword = (): JSX.Element => {
    return (
      <View
        style={{
          ...theme.flex.rowCenterSpaceBetween,
          marginBottom: utils.responsiveHeight(30),
        }}>
        <TouchableOpacity style={{...theme.flex.rowCenter}} onPress={() => {}}>
          <View
            style={{
              width: 18,
              height: 18,
              borderWidth: 1,
              borderRadius: 3,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.white,
              borderColor: theme.colors.antiFlashWhite,
            }}>
            {/* {rememberMe && <svg.RememberCheckSvg />} */}
            <svg.RememberCheckSvg />
          </View>
          <text.T14 style={{marginLeft: 10}} numberOfLines={1}>
            Se souvenir de moi
          </text.T14>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SendEmailOtpForgot');
          }}>
          <text.T14 numberOfLines={1} style={{color: theme.colors.mainColor}}>
            Mot de passe oublié?
          </text.T14>
        </TouchableOpacity>
      </View>
    );
  };

  // Fonction pour afficher le bouton de connexion
  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title="Connexion"
        onPress={() => {
          validation(user) ? handleSignIn() : null;
        }}
        loading={loading}
      />
    );
  };

  // Fonction pour afficher le bouton Google
  const renderOauthButtons = (): JSX.Element => {
    return (
      <>
        <text.T14 style={styles.buttonChoices}>Se connecter avec :</text.T14>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={handleGoogleSignIn}>
            <svg.Google2Svg />
            <text.T12 style={styles.linkText}>Google</text.T12>
          </TouchableOpacity>

          <AppleButton
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.SIGN_IN}
            style={{
              width: 160,
              height: 45,
            }}
            onPress={handleAppleSignIn}
          />
        </View>
      </>
    );
  };

  // Fonction pour afficher le lien si l'utilisateur n'a pas de compte
  const renderIfYouDontHaveAnAccount = (): JSX.Element => {
    return (
      <View style={{flexDirection: 'row', padding: 20}}>
        <text.T14 numberOfLines={1}>Vous n'avez pas de compte? </text.T14>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <text.T14 style={{color: theme.colors.mainColor}} numberOfLines={1}>
            Inscrivez-vous
          </text.T14>
        </TouchableOpacity>
      </View>
    );
  };

  // Fonction pour afficher la hauteur
  const renderHeight = (): JSX.Element => {
    return (
      <View
        style={{
          height: utils.responsiveHeight(70, true),
        }}
      />
    );
  };

  // Fonction pour afficher le contenu
  const renderContent = (): JSX.Element => {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          justifyContent: 'center',
        }}>
        {renderTitle()}
        {renderDescription()}
        {renderInputFields()}
        {renderForgotPassword()}
        {renderButton()}
        {renderOauthButtons()}
        {renderHeight()}
      </KeyboardAwareScrollView>
    );
  };

  // Retourner le contenu
  return (
    <custom.ImageBackground
      style={{flex: 1}}
      resizeMode="stretch"
      source={require('../assets/bg/02.png')}>
      <custom.SafeAreaView
        insets={['top', 'bottom']}
        containerStyle={{backgroundColor: theme.colors.transparent}}>
        {renderHeader()}
        {renderContent()}
        {renderIfYouDontHaveAnAccount()}
      </custom.SafeAreaView>
    </custom.ImageBackground>
  );
};

export default SignIn;

// Styles
const styles = StyleSheet.create({
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
  buttonChoices: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  linkButton: {
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 5,
    alignItems: 'center',
    width: 160,
    height: 45,
    backgroundColor: theme.colors.white,
  },
  linkText: {
    color: theme.colors.black,
  },
});
