import { showMessage } from 'react-native-flash-message';

export const validatePassword = (password: string, iconValidation = false) => {
  if (!password.trim()) {
    showMessage({
      message: 'Erreur',
      description: 'Veuillez remplir le champ mot de passe',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }

  if (password.trim().length < 6) {
    showMessage({
      message: 'Erreur',
      description: 'Le mot de passe doit comporter au moins 6 caractères',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }

  if (iconValidation) {
    return true;
  }
};
