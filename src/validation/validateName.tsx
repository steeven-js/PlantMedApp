import { showMessage } from 'react-native-flash-message';

export const validateName = (name: string, iconValidation = false) => {
  if (!name.trim()) {
    if (!iconValidation) {
      showMessage({
        message: 'Erreur',
        description: 'Veuillez remplir le champ nom',
        type: 'danger',
        icon: 'danger',
      });
    }

    return false;
  }

  if (name.trim().length < 2) {
    if (!iconValidation) {
      showMessage({
        message: 'Erreur',
        description: 'Le nom doit comporter au moins 3 caractères',
        type: 'danger',
        icon: 'danger',
      });
    }

    return false;
  }

  const regex = /^[a-zA-Zа-яА-Я\s]*$/;
  if (!regex.test(name)) {
    if (!iconValidation) {
      showMessage({
        message: 'Erreur',
        description: 'Le nom ne peut contenir que des lettres',
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
