import { showMessage } from 'react-native-flash-message';

export const validateCardNumber = (cardNumber: string) => {
  if (!cardNumber.trim()) {
    showMessage({
      message: 'Erreur',
      description: 'Veuillez remplir le champ du numéro de carte',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }

  const cleanCardNumber = cardNumber.replace(/\s/g, '');
  const regex = /^\d{16}$/;
  if (!regex.test(cleanCardNumber)) {
    showMessage({
      message: 'Erreur',
      description: 'Le numéro de carte doit comporter 16 chiffres',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }
};
