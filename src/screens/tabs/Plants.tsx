import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Platform,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import {utils} from '../../utils';
import {hooks} from '../../hooks';
import {custom} from '../../custom';
import {theme} from '../../constants';
import {plantmed} from '../../plantmed';
import {PlantMedType} from '../../types';
import {components} from '../../components';
import {useAppSelector} from '../../store';
import {queryHooks} from '../../store/slices/apiSlice';

const Plants: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const isPremium = useAppSelector(state => state.premiumSlice.premium);

  const {
    data: plantsData,
    error: plantsError,
    isLoading: plantsLoading,
    refetch: refetchPlants,
  } = queryHooks.useGetPlantmedQuery();

  const [refreshing, setRefreshing] = useState(false);
  const plants = plantsData?.plantmed ?? [];

  const isError = !!plantsError;
  const isLoading = plantsLoading;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetchPlants()
      .then(() => setRefreshing(false))
      .catch(error => {
        console.error(error);
        setRefreshing(false);
      });
  }, [refetchPlants]);

  const renderCategories = (): JSX.Element | null => {
    if (plants?.length) {
      return (
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: utils.responsiveHeight(40 - 14),
          }}
        >
          {plants.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  width: utils.responsiveWidth(150, true),
                  height: utils.responsiveWidth(150, true),
                  marginBottom: 40,
                  justifyContent: 'space-around',
                }}
                onPress={() => {
                  if (isPremium) {
                    navigation.navigate('PlantMed', {item});
                  } else if (!isPremium && item.is_premium == false) {
                    navigation.navigate('PlantMed', {item});
                  } else {
                    navigation.navigate('Premium');
                  }
                }}
              >
                <custom.ImageBackground
                  source={{uri: item.image ?? 'default_image_uri'}}
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    paddingTop: 14,
                    paddingBottom: 12,
                  }}
                  imageStyle={{
                    borderRadius: 10,
                    backgroundColor: theme.colors.imageBackground,
                  }}
                  resizeMode='cover'
                >
                  {item.is_premium ? (
                    <plantmed.PlantPrenium
                      item={item as PlantMedType}
                      containerStyle={{
                        position: 'absolute',
                        padding: 14,
                        top: -10,
                        left: -10,
                      }}
                    />
                  ) : null}

                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: Platform.OS === 'ios' ? 20 : 18,
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      textAlign: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                      color: theme.colors.mainColor,
                      ...theme.fonts.DM_Sans_400Regular,
                      padding: 5,
                    }}
                  >
                    {item.name}
                  </Text>
                </custom.ImageBackground>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }

    return null;
  };

  const renderContent = (): JSX.Element => {
    if (isLoading) return <components.Loader />;
    if (isError) return <components.Error />;
    if (!plants.length) return <components.NoData />;

    return (
      <custom.ImageBackground
        style={{flex: 1}}
        resizeMode='stretch'
        source={require('../../assets/bg/01.png')}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 20,
            paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {renderCategories()}
        </ScrollView>
      </custom.ImageBackground>
    );
  };

  return renderContent();
};

export default Plants;