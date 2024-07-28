import { showMessage } from 'react-native-flash-message';

export const validateCardHolderName = (cardHolder: string) => {
  if (!cardHolder.trim()) {
    showMessage({
      message: 'Erreur',
      description: 'Veuillez remplir le champ du nom du titulaire de la carte',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }

  if (cardHolder.trim().length < 2) {
    showMessage({
      message: 'Erreur',
      description: 'Le nom du titulaire de la carte doit comporter au moins 3 caractères',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }

  const regex = /^[a-zA-Zа-яА-Я\s]*$/;
  if (!regex.test(cardHolder)) {
    showMessage({
      message: 'Erreur',
      description: 'Le nom du titulaire de la carte ne peut contenir que des lettres',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }
};
