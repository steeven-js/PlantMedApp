import { showMessage } from 'react-native-flash-message';

export const validatePromoCode = (promoCode: string) => {
  if (!promoCode.trim()) {
    showMessage({
      message: 'Erreur',
      description: 'Veuillez remplir le champ du code promo',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }

  if (promoCode.length < 3) {
    showMessage({
      message: 'Erreur',
      description: 'Le code promo doit comporter au moins 3 caractères',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }
};
