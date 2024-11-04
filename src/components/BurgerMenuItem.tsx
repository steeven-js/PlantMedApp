import React from 'react';

import {Text, TouchableOpacity, TextStyle, Platform, View} from 'react-native';

type Props = {
  icon?: JSX.Element;
  qty?: string;
  title: string;
  onPress: () => void;
  textStyle?: TextStyle;
};

import {utils} from '../utils';
import {theme} from '../constants';

const BurgerMenuItem: React.FC<Props> = ({
  icon,
  title,
  onPress,
  textStyle,
  qty,
}): JSX.Element | null => {
  // if (qty === 0 && title !== '>  Categories' && title !== '>  Support') {
  //   return null;
  // }

  return (
    <TouchableOpacity
      style={{
        paddingBottom: utils.responsiveHeight(18),
        paddingTop: utils.responsiveHeight(10),
        marginBottom: utils.responsiveHeight(6),
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
      }}
      onPress={onPress}
    >
      <View
        style={{
          marginRight: 10,
        }}
      >
        {icon}
      </View>
      <View>
        <Text
          style={{
            color: theme.colors.mainColor,
            ...theme.fonts.DM_Sans_400Regular,
            lineHeight: 14 * 1.5,
            fontSize: Platform.OS === 'ios' ? 18 : 16,
            ...textStyle,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
        {qty && (
          <Text
            style={{
              fontSize: Platform.OS === 'ios' ? 14 : 12,
              color: theme.colors.textColor,
              marginLeft: 6,
              lineHeight: 10 * 1.5,
            }}
            numberOfLines={1}
          >
            {qty} plante(s)
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default BurgerMenuItem;
