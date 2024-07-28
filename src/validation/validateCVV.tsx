import { showMessage } from 'react-native-flash-message';

export const validateCVV = (cvv: string) => {
  if (!cvv.trim()) {
    showMessage({
      message: 'Erreur',
      description: 'Veuillez remplir le champ CVV',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }

  const regex = /^\d{3,4}$/;
  if (!regex.test(cvv)) {
    showMessage({
      message: 'Erreur',
      description: 'Le CVV doit comporter 3 ou 4 chiffres',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }
};
