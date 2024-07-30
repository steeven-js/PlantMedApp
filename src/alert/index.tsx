import { Alert } from 'react-native';

const alreadyAdded = () => {
  return Alert.alert('Déjà ajouté', 'Produit déjà dans le panier.', [
    { text: 'Annuler', style: 'cancel' },
  ]);
};

const userDeleted = () => {
  return Alert.alert('Succès', 'Compte supprimé avec succès', [
    {
      text: 'OK',
      onPress: () => {
        console.log('OK Pressed');
      },
    },
  ]);
};

const somethingWentWrong = () => {
  return Alert.alert('Une erreur s\'est produite, veuillez réessayer plus tard');
};

const invalidOtp = () => {
  return Alert.alert('OTP invalide', 'Veuillez entrer un OTP valide');
};

const invalidUsernameOrPassword = () => {
  return Alert.alert('Erreur', 'Nom d\'utilisateur ou mot de passe invalide', [
    {
      text: 'OK',
      onPress: () => {
        console.log('OK Pressed');
      },
    },
  ]);
};

const userWithThisNameOrEmailAlreadyExists = () => {
  return Alert.alert(
    'Erreur',
    'Un utilisateur avec ce nom ou cet email existe déjà',
    [
      {
        text: 'OK',
        onPress: () => {
          console.log('OK Pressed');
        },
      },
    ],
    { cancelable: false },
  );
};

const userWithThisEmailAlreadyExists = () => {
  return Alert.alert(
    'Erreur',
    'Un utilisateur avec cet email existe déjà',
    [
      {
        text: 'OK',
        onPress: () => {
          console.log('OK Pressed');
        },
      },
    ],
    { cancelable: false },
  );
};

export const alert = {
  invalidOtp,
  userDeleted,
  alreadyAdded,
  somethingWentWrong,
  invalidUsernameOrPassword,
  userWithThisEmailAlreadyExists,
  userWithThisNameOrEmailAlreadyExists,
};
