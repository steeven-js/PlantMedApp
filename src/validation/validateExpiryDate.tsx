import { showMessage } from 'react-native-flash-message';

export const validateExpiryDate = (expiryDate: string) => {
  if (!expiryDate.trim()) {
    showMessage({
      message: 'Erreur',
      description: 'Veuillez remplir le champ de la date d\'expiration',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }

  // const regex = /^(0[1-9]|1[0-2])([0-9]{2})$/;
  // if (!regex.test(expiryDate)) {
  //   showMessage({
  //     message: 'Erreur',
  //     description: 'La date d\'expiration doit être au format MM/AA',
  //     type: 'danger',
  //     icon: 'danger',
  //   });
  //   return false;
  // }

  const [month, year] = expiryDate.split('/');
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;

  if (
    Number(year) < currentYear ||
    (Number(year) === currentYear && Number(month) < currentMonth)
  ) {
    showMessage({
      message: 'Erreur',
      description: 'La carte est déjà expirée',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }
};
