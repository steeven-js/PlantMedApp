import {
  View,
  Text,
  Platform,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {svg} from '../assets/svg';

import {theme} from '../constants';

type Props = {
  loading?: boolean;
  title: string;
  onPress?: () => void;
  textStyle?: TextStyle;
  transparent?: boolean;
  touchableOpacityStyle?: ViewStyle;
};

const GoogleSignInButton: React.FC<Props> = ({
  title,
  loading = false,
  onPress,
  textStyle,
  transparent = false,
  touchableOpacityStyle,
}): JSX.Element => {
  return (
    <View style={
      {
        width: '50%',
      }
    }>
      <TouchableOpacity
        style={{
          height: 50,
          borderRadius: 25,
          borderColor: theme.colors.textColor,
          backgroundColor: transparent ? theme.colors.transparent : '#50858B',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          ...touchableOpacityStyle,
        }}
        onPress={onPress}
      >
        <svg.ArrowCloseSvg />
        {loading && (
          <ActivityIndicator
            color={transparent ? theme.colors.mainColor : theme.colors.white}
            size='small'
          />
        )}
        {!loading && (
          <Text
            style={{
              // textTransform: 'capitalize',
              fontSize: Platform.OS === 'ios' ? 18 : 16,
              color: transparent ? theme.colors.white : theme.colors.white,
              ...textStyle,
              ...theme.fonts.DM_Sans_700Bold,
            }}
          >
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(GoogleSignInButton);
