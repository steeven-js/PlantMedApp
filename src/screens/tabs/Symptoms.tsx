import React, {useState} from 'react';
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
import {components} from '../../components';
import {queryHooks} from '../../store/slices/apiSlice';
import PreniumSvg from '../../assets/svg/PreniumSvg';

const Symptoms: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  // const isPrenium = hooks.useAppSelector(
  //   state => state.userSlice.user?.isPrenium,
  // );

  const {
    data: plantsData,
    error: plantsError,
    isLoading: plantsLoading,
    refetch: refetchPlants,
  } = queryHooks.useGetPlantmedQuery();

  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
    refetch: refetchCategories,
  } = queryHooks.useGetSymptomsQuery();

  const [refreshing, setRefreshing] = useState(false);

  let categories = categoriesData?.symptoms ?? [];
  let plants = plantsData?.plantmed ?? [];

  const isError = categoriesError || plantsError;
  const isLoading = categoriesLoading || plantsLoading;
  const isData = categories.length === 0 && plants.length === 0;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Promise.all([refetchPlants(), refetchCategories()])
      .then(() => setRefreshing(false))
      .catch(error => {
        console.error(error);
        setRefreshing(false);
      });
  }, []);

  const renderCategories = (): JSX.Element | null => {
    const normalize = (str: string) => str.toLowerCase().trim();
    if (categories?.length) {
      return (
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: utils.responsiveHeight(40 - 14),
          }}
        >
          {categories.map((item, index) => {
            const dataFilter = plantsData?.plantmed.filter(e => {
              if (Array.isArray(e.symptoms)) {
                return e.symptoms.some(
                  symptom => normalize(symptom) === normalize(item.name),
                );
              }
              return false;
            });
            const qty = dataFilter?.length ?? 0;
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
                  if (qty > 0) {
                    navigation.navigate('PlantMedList', {
                      title: item.name,
                      products: dataFilter ?? [],
                    });
                    // if (isPrenium) {
                    //   navigation.navigate('PlantMedList', {
                    //     title: item.name,
                    //     products: dataFilter ?? [],
                    //   });
                    // } else if (!isPrenium && item.is_prenium == false) {
                    //   navigation.navigate('PlantMedList', {
                    //     title: item.name,
                    //     products: dataFilter ?? [],
                    //   });
                    // } else {
                    //   navigation.navigate('Prenium');
                    // }
                  }
                  if (qty === 0) {
                    Alert.alert(
                      'No data',
                      'No data available for this category',
                    );
                  }
                }}
              >
                <custom.ImageBackground
                  source={{uri: item.image ?? 'default_image_uri'}}
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    justifyContent: 'space-between',
                    paddingTop: 14,
                    paddingBottom: 12,
                  }}
                  imageStyle={{
                    borderRadius: 10,
                    backgroundColor: theme.colors.imageBackground,
                  }}
                  resizeMode='cover'
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#CFF5CE',
                        alignSelf: 'flex-start',
                        width: 40,
                        height: 40,
                        borderRadius: 40 / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: Platform.OS === 'ios' ? 20 : 18,
                          color: '#50858B',
                          // textTransform: 'capitalize',
                          ...theme.fonts.DM_Sans_500Medium,
                        }}
                      >
                        {qty}
                      </Text>
                    </View>

                    {/* <View
                      style={{
                        backgroundColor: '#CFF5CE',
                        alignSelf: 'flex-start',
                        width: 40,
                        height: 40,
                        borderRadius: 40 / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <PreniumSvg
                        width='20px'
                        height='20px'
                        fillColor={
                          item.is_prenium
                            ? theme.colors.yellowStar
                            : theme.colors.steelTeal
                        }
                        strokeColor={
                          item.is_prenium
                            ? theme.colors.yellowStar
                            : theme.colors.steelTeal
                        }
                      />
                    </View> */}
                  </View>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: Platform.OS === 'ios' ? 20 : 18,
                      // textTransform: 'capitalize',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    if (isData) return <components.NoData />;

    return (
      <custom.ImageBackground
        style={{flex: 1}}
        resizeMode='stretch'
        source={require('../../assets/bg/02.png')}
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

export default Symptoms;
