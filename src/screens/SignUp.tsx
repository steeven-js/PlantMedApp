import axios from 'axios';
import auth from '@react-native-firebase/auth';
import React, {useState, useEffect, useRef} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import firestore from '@react-native-firebase/firestore';

import {text} from '../text';
import {alert} from '../alert';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';
import {validation} from '../validation';
import {ENDPOINTS, CONFIG} from '../config';
import {validateName} from '../validation/validateName';
import {validateEmail} from '../validation/validateEmail';
import {handleTextChange} from '../utils/handleTextChange';

const SignUp: React.FC = () => {
  const navigation = hooks.useAppNavigation();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassowrd] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] =
    useState<boolean>(true);

  const handleNameChange = handleTextChange(setName);
  const handleEmailChange = handleTextChange(setEmail);
  const handlePasswordChange = handleTextChange(setPassword);
  const handleConfirmPasswordChange = handleTextChange(setConfirmPassowrd);

  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (loading) {
      nameInputRef.current?.blur();
      emailInputRef.current?.blur();
      passwordInputRef.current?.blur();
      confirmPasswordInputRef.current?.blur();
    }

    GoogleSignin.configure({
      webClientId:
        '453782988338-p1fn125tgm3ilpvibk846mjgise2qt36.apps.googleusercontent.com',
    });
  }, [loading]);

  const handleCreateUser = async () => {
    try {
      setLoading(true);
      // Créer l'utilisateur avec Firebase Auth
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const user = userCredential.user;

      if (user) {
        // Créer un document Firestore dans la collection 'UserProfiles' avec l'uid de l'utilisateur
        await firestore()
          .collection('UserProfiles')
          .doc(user.uid)
          .set({
            uid: user.uid,
            email: user.email,
            displayName: name,
            photoURL: user.photoURL || '',
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp(),
            premium: false,
            service: 'email',
            platform: Platform.OS === 'ios' ? 'ios' : 'android',
            // Ajoutez d'autres champs nécessaires ici
          });

        // Mettre à jour le nom de l'utilisateur
        await user.updateProfile({
          displayName: name,
        });

        alert.userSuccessCreated();

        console.log('UserProfile created successfully');

        // Optionnel : Recharger l'utilisateur pour s'assurer que les changements sont reflétés
        await user.reload();
      }
    } catch (error: any) {
      console.error('Error creating user:', error);

      switch (error.code) {
        case 'auth/email-already-in-use':
          alert.userWithThisNameOrEmailAlreadyExists();
          break;
        case 'auth/invalid-email':
          alert.invalidEmail();
          break;
        case 'auth/operation-not-allowed':
          alert.operationNotAllowed();
          break;
        case 'auth/weak-password':
          alert.weakPassword();
          break;
        case 'auth/network-request-failed':
          alert.networkError();
          break;
        case 'auth/too-many-requests':
          alert.tooManyRequests();
          break;
        case 'auth/invalid-credential':
          alert.invalidCredential();
          break;
        default:
          alert.somethingWentWrong();
      }
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
      // Get the users ID token
      const {idToken, user} = await GoogleSignin.signIn();

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

        const docSnapshot = await userProfileRef.get();

        if (docSnapshot.exists) {
          // Si le document existe, nous le mettons à jour
          await userProfileRef.update({
            uid: authenticatedUser.uid,
            email: authenticatedUser.email,
            displayName: authenticatedUser.displayName || '',
            photoURL: authenticatedUser.photoURL || '',
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp(),
            service: 'google',
            platform: Platform.OS === 'ios' ? 'ios' : 'android',
            // Ajoutez d'autres champs nécessaires ici
          });
        } else {
          // Si le document n'existe pas, nous le créons
          await userProfileRef.set({
            uid: authenticatedUser.uid,
            email: authenticatedUser.email,
            displayName: authenticatedUser.displayName || '',
            photoURL: authenticatedUser.photoURL || '',
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp(),
            service: 'google',
            platform: Platform.OS === 'ios' ? 'ios' : 'android',
            // Ajoutez d'autres champs nécessaires ici
          });
          alert.userSuccessCreated();
        }

        console.log('UserProfile created successfully');
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
          displayName: authenticatedUser.displayName || 'Utilisateur Apple',
          photoURL: authenticatedUser.photoURL || '',
          updatedAt: firestore.FieldValue.serverTimestamp(),
          service: 'apple',
          platform: Platform.OS === 'ios' ? 'ios' : 'android',
          // Ajoutez d'autres champs nécessaires ici
        };

        await userProfileRef.set(userProfileData, {merge: true});

        console.log('UserProfile created/updated successfully');
      } else {
        alert.userSuccessCreated();
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
        style={{
          textTransform: 'capitalize',
          marginBottom: utils.responsiveHeight(40),
        }}
      >
        Inscription
      </text.H1>
    );
  };

  // Fonction pour afficher les champs de saisie
  const renderInputFields = (): JSX.Element => {
    return (
      <React.Fragment>
        <custom.InputField
          label='nom'
          value={name}
          keyboardType='default'
          innerRef={nameInputRef}
          placeholder='entrez votre nom'
          onChangeText={handleNameChange}
          checkIcon={validateName(name, true)}
          containerStyle={{marginBottom: utils.responsiveHeight(20)}}
        />
        <custom.InputField
          label='email'
          value={email}
          innerRef={emailInputRef}
          placeholder='entrez votre email'
          keyboardType='email-address'
          onChangeText={handleEmailChange}
          checkIcon={validateEmail(email, true)}
          containerStyle={{marginBottom: utils.responsiveHeight(20)}}
        />
        <custom.InputField
          label='mot de passe'
          value={password}
          eyeOffIcon={true}
          keyboardType='default'
          innerRef={passwordInputRef}
          placeholder='entrez votre mot de passe'
          secureTextEntry={secureTextEntry}
          onChangeText={handlePasswordChange}
          setSecureTextEntry={setSecureTextEntry}
          containerStyle={{marginBottom: utils.responsiveHeight(20)}}
        />
        <custom.InputField
          eyeOffIcon={true}
          keyboardType='default'
          value={confirmPassword}
          label='confirmer mot de passe'
          innerRef={confirmPasswordInputRef}
          placeholder='confirmez votre mot de passe'
          secureTextEntry={confirmSecureTextEntry}
          onChangeText={handleConfirmPasswordChange}
          setSecureTextEntry={setConfirmSecureTextEntry}
          containerStyle={{marginBottom: utils.responsiveHeight(20)}}
        />
      </React.Fragment>
    );
  };

  // Fonction pour afficher le bouton d'inscription
  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title={'inscription'}
        onPress={() => {
          validation({name, email, password, confirmPassword})
            ? handleCreateUser()
            : null;
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
            onPress={handleGoogleSignIn}
          >
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

  // Fonction pour afficher le lien de connexion
  const renderIfYouHaveAccount = (): JSX.Element => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 20}}>
        <text.T18 numberOfLines={1}>Vous avez déjà un compte? </text.T18>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <text.T18 style={{color: theme.colors.mainColor}} numberOfLines={1}>
            Connectez-vous.
          </text.T18>
        </TouchableOpacity>
      </View>
    );
  };

  // Fonction pour afficher la hauteur
  const renderHeight = (): JSX.Element => {
    return <View style={{height: utils.responsiveHeight(70, true)}} />;
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
        }}
      >
        {renderTitle()}
        {renderInputFields()}
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
      resizeMode='stretch'
      source={require('../assets/bg/02.png')}
    >
      <custom.SafeAreaView
        insets={['top', 'bottom']}
        containerStyle={{backgroundColor: theme.colors.transparent}}
      >
        {renderHeader()}
        {renderContent()}
        {renderIfYouHaveAccount()}
      </custom.SafeAreaView>
    </custom.ImageBackground>
  );
};

export default SignUp;

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
