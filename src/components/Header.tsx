import React, { useState } from 'react';

import Modal from 'react-native-modal';
import { Text, View, Platform, TouchableOpacity, StyleSheet } from 'react-native';

import BurgerMenu from './BurgerMenu';

import { hooks } from '@src/hooks';
import { svg } from '@src/assets/svg';
import { theme } from '@src/constants';
import { HeaderType } from '@src/types';
import { useAppSelector } from '@src/store';

const Header: React.FC<HeaderType> = ({
  title,
  style,
  search,
  onGoBack,
  burgerIcon,
  goBackIcon,
  bottomLine,
  exception,
}: HeaderType) => {
  const navigation = hooks.useAppNavigation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const currentTabScreen = useAppSelector(state => state.tabSlice.screen);

  const handleGoBack = () => {
    if (exception) {
      navigation.navigate('TabNavigator');
    } else if (onGoBack) {
      onGoBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
      <View style={[styles.container, style, bottomLine && styles.bottomBorder]}>
        {/* Go Back Button */}
        {(goBackIcon || onGoBack || exception) && navigation.canGoBack() && (
          <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
            <svg.GoBackSvg />
          </TouchableOpacity>
        )}

        {/* Burger Menu Button */}
        {burgerIcon && (
          <TouchableOpacity style={styles.burgerButton} onPress={() => setShowModal(true)}>
            <svg.BurgerSvg />
          </TouchableOpacity>
        )}

        {/* Title */}
        {title && (
          <Text numberOfLines={1} style={styles.titleText}>
            {title}
          </Text>
        )}

        {/* Search Button */}
        {search && (
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() =>
              currentTabScreen === 'Plants'
                ? navigation.navigate('SearchPlant')
                : navigation.navigate('SearchSymptom')
            }          >
            <svg.SearchSvg />
            <Text style={styles.searchText}>Recherche</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Burger Menu Modal */}
      <Modal
        isVisible={showModal}
        style={styles.modal}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        onBackdropPress={() => setShowModal(false)}
        deviceHeight={theme.sizes.deviceHeight}
        deviceWidth={theme.sizes.deviceWidth}
        animationInTiming={500}
        animationOutTiming={500}
      >
        <BurgerMenu
          setShowModal={setShowModal}
          navigation={navigation}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.antiFlashWhite,
  },
  goBackButton: {
    position: 'absolute',
    left: 0,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  burgerButton: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: theme.sizes.deviceWidth - 210,
    marginRight: 60,
  },
  searchText: {
    ...theme.fonts.DM_Sans_400Regular,
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    color: theme.colors.textColor,
    textTransform: 'capitalize',
    marginLeft: 7,
  },
  titleText: {
    color: theme.colors.mainColor,
    ...theme.fonts.DM_Sans_500Medium,
    fontSize: Platform.OS === 'ios' ? 20 : 18,
  },
  modal: {
    margin: 0,
    padding: 0,
  },
});

export default Header;
