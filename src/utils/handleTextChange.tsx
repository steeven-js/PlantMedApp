import { useCallback } from 'react';

type TextSetter = React.Dispatch<React.SetStateAction<string>>;
type NumberSetter = React.Dispatch<React.SetStateAction<number>>;

// Créez des hooks personnalisés au lieu de fonctions simples
export const useTextChangeHandler = (setter: TextSetter) => {
  return useCallback(
    (text: string): void => {
      setter(text);
    },
    [setter] // Incluez setter dans les dépendances
  );
};

export const usePromocodeChangeHandler = (setter: NumberSetter) => {
  return useCallback(
    (text: number): void => {
      setter(text);
    },
    [setter] // Incluez setter dans les dépendances
  );
};
