import { showMessage } from 'react-native-flash-message';

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
) => {
  if (!confirmPassword.trim()) {
    showMessage({
      message: 'Erreur',
      description: 'Veuillez remplir le champ de confirmation du mot de passe',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }

  if (confirmPassword.trim().length < 6) {
    showMessage({
      message: 'Erreur',
      description: 'Le mot de passe doit comporter au moins 6 caractères',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }

  if (password !== confirmPassword) {
    showMessage({
      message: 'Erreur',
      description: 'Les mots de passe ne correspondent pas',
      type: 'danger',
      icon: 'danger',
    });
    return false;
  }
};
