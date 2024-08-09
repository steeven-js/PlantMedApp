import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';

import {text} from '../text';
import {items} from '../items';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {components} from '../components';
import {queryHooks} from '../store/slices/apiSlice';

const PlantWishlist: React.FC = () => {
  const wishlist = hooks.useAppSelector(
    state => state.plantmedWishlistSlice.list,
  );

  const {
    data: plantsData,
    error: plantsError,
    refetch: refetchPlants,
    isLoading: plantsLoading,
  } = queryHooks.useGetPlantmedQuery();

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title="Mes favoris"
        goBackIcon={true}
      />
    );
  };

  const renderProducts = (): JSX.Element | null => {
    if (wishlist.length > 0) {
      return (
        <custom.ImageBackground
          style={{flex: 1}}
          resizeMode='stretch'
          source={require('../assets/bg/01.png')}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, padding: 20}}
          >
            {wishlist.map((item, index, array) => {
              const isLast = index === array.length - 1;
              return (
                <items.PlantWishlistItem
                  key={index}
                  item={item}
                  isLast={isLast}
                />
              );
            })}
          </ScrollView>
        </custom.ImageBackground>
      );
    }

    return null;
  };

  const renderEmpty = (): JSX.Element | null => {
    if (wishlist.length === 0) {
      return (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: 20,
            justifyContent: 'center',
          }}
        >
          <custom.Image
            source={require('../assets/icons/03.png')}
            style={{
              height: utils.responsiveHeight(120),
              aspectRatio: 123.39 / 120,
              marginBottom: utils.responsiveHeight(14),
            }}
          />
          <text.H2
            numberOfLines={1}
            style={{marginBottom: utils.responsiveHeight(14)}}
          >
            Votre liste de souhaits est vide!
          </text.H2>
          <text.T16 numberOfLines={2}>
            Parcourez notre liste de plantes et {'\n'}ajoutez vos préférées.
          </text.T16>
        </ScrollView>
      );
    }

    return null;
  };

  const renderContent = (): JSX.Element => {
    if (plantsLoading) {
      return <components.Loader />;
    }

    return (
      <custom.SafeAreaView insets={['top', 'bottom']}>
        {renderHeader()}
        {renderProducts()}
        {renderEmpty()}
      </custom.SafeAreaView>
    );
  };

  return renderContent();
};

export default PlantWishlist;
