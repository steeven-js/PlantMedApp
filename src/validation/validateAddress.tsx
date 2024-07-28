import { showMessage } from 'react-native-flash-message';

export const validateAddress = (address: string) => {
  if (!address.trim()) {
    showMessage({
      message: 'Erreur',
      description: 'Veuillez remplir le champ adresse',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }
};
