import { showMessage } from 'react-native-flash-message';

export const validateOTPCode = (otpCode: string) => {
  if (!otpCode.trim()) {
    showMessage({
      message: 'Erreur',
      description: 'Veuillez remplir le champ OTP',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }

  const regex = /^\d{5}$/;
  if (!regex.test(otpCode)) {
    showMessage({
      message: 'Erreur',
      description: 'Le code OTP doit comporter 5 chiffres',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }
};
