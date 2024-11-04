import {ViewStyle} from 'react-native';

export type HeaderType = {
  search?: boolean;
  style?: ViewStyle;
  logoIcon?: boolean;
  userName?: boolean;
  userImage?: boolean;
  exception?: boolean;
  goBackIcon?: boolean;
  basketIcon?: boolean;
  bottomLine?: boolean;
  burgerIcon?: boolean;
  userAvatar?: boolean;
  onGoBack?: () => void;
  title?: string | null;
  backgroundColor?: string;
};
