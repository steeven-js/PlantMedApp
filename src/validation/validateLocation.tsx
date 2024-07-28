import { showMessage } from 'react-native-flash-message';

export const validateLocation = (location: string) => {
  if (!location.trim()) {
    showMessage({
      message: 'Erreur',
      description: 'Veuillez remplir le champ localisation',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }
};
