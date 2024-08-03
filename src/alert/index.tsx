import { Alert } from 'react-native';

// Notifications de succès
const userSuccessCreated = () => {
  return Alert.alert('Succès', 'Compte créé avec succès', [
    {
      text: 'OK',
      onPress: () => {
        console.log('OK Pressed');
      },
    },
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

const profileUpdated = () => {
  return Alert.alert('Succès', 'Profil mis à jour avec succès', [
    {
      text: 'OK',
      onPress: () => {
        console.log('OK Pressed');
      },
    },
  ]);
};

// Erreurs liées à l'authentification
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

const invalidEmail = () => {
  return Alert.alert(
    'Email invalide',
    'L\'adresse email fournie n\'est pas valide. Veuillez vérifier et réessayer.',
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
  );
};

const invalidCredential = () => {
  return Alert.alert(
    'Informations invalides',
    'Les informations fournies sont incorrectes. Veuillez vérifier et réessayer.',
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
  );
};

const wrongPassword = () => {
  return Alert.alert(
    'Mot de passe incorrect',
    'Le mot de passe entré est incorrect. Veuillez réessayer.',
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
  );
};

const userNotFound = () => {
  return Alert.alert(
    'Utilisateur non trouvé',
    'Aucun utilisateur ne correspond à cet email. Veuillez vérifier vos informations ou créer un nouveau compte.',
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
  );
};

const userDisabled = () => {
  return Alert.alert(
    'Compte désactivé',
    'Votre compte a été désactivé. Veuillez contacter le support pour plus d\'informations.',
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
  );
};

// Erreurs générales
const somethingWentWrong = () => {
  return Alert.alert('Une erreur s\'est produite, veuillez réessayer plus tard');
};

const networkError = () => {
  return Alert.alert(
    'Erreur réseau',
    'Une erreur de connexion s\'est produite. Veuillez vérifier votre connexion internet et réessayer.',
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
  );
};

const operationNotAllowed = () => {
  return Alert.alert(
    'Opération non autorisée',
    'Cette opération n\'est pas autorisée. Veuillez contacter le support si le problème persiste.',
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
  );
};

const weakPassword = () => {
  return Alert.alert(
    'Mot de passe faible',
    'Le mot de passe fourni est trop faible. Veuillez choisir un mot de passe plus fort.',
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
  );
};

const tooManyRequests = () => {
  return Alert.alert(
    'Trop de tentatives',
    'Trop de tentatives ont été effectuées. Veuillez réessayer plus tard.',
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
  );
};

// Alertes spécifiques à l'application
const alreadyAdded = () => {
  return Alert.alert('Déjà ajouté', 'Produit déjà dans le panier.', [
    { text: 'Annuler', style: 'cancel' },
  ]);
};

// Export des alertes regroupées par catégorie
export const alert = {
  // Succès
  userSuccessCreated,
  userDeleted,
  profileUpdated,

  // Authentification
  invalidOtp,
  invalidUsernameOrPassword,
  userWithThisEmailAlreadyExists,
  userWithThisNameOrEmailAlreadyExists,
  invalidEmail,
  invalidCredential,
  wrongPassword,
  userNotFound,
  userDisabled,

  // Erreurs générales
  somethingWentWrong,
  networkError,
  operationNotAllowed,
  weakPassword,
  tooManyRequests,

  // Alertes spécifiques
  alreadyAdded,
};
