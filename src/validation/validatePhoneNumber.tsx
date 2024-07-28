import { showMessage } from 'react-native-flash-message';

export const validatePhoneNumber = (
  phoneNumber: string,
  iconValidation = false,
) => {
  if (!phoneNumber.trim()) {
    if (!iconValidation) {
      showMessage({
        message: 'Erreur',
        description: 'Veuillez remplir le champ du numéro de téléphone',
        type: 'danger',
        icon: 'danger',
      });
    }
    return false;
  }

  const regex = /^\+\d{10,}$/; // Suppression du signe "?" après "+"
  if (!regex.test(phoneNumber)) {
    if (!iconValidation) {
      showMessage({
        message: 'Erreur',
        description:
          'Le numéro de téléphone doit commencer par "+" et comporter au moins 10 chiffres',
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
