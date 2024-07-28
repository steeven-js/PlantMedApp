import { showMessage } from 'react-native-flash-message';

export const validateEmail = (email: string, iconValidation = false) => {
  if (!email.trim()) {
    if (!iconValidation) {
      showMessage({
        message: 'Erreur',
        description: 'Veuillez remplir le champ de l\'email',
        type: 'danger',
        icon: 'danger',
      });
    }
    return false;
  }

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    if (!iconValidation) {
      showMessage({
        message: 'Erreur',
        description: 'Format de l\'email invalide',
        type: 'danger',
        icon: 'danger',
      });
    }
    return false;
  }

  if (iconValidation) {
    return true;
  }
};
