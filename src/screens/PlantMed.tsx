import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {plantmed} from '../plantmed';
import {components} from '../components';
import {PlantMedScreenProps} from '../types/ScreenProps';
import {PlantMedType, ViewableItemsChanged} from '../types';

const PlantMed: React.FC<PlantMedScreenProps> = ({route}) => {
  const {item} = route.params;
  const [tab, setTab] = useState(0);
  const dispatch = hooks.useAppDispatch();
  const navigation = hooks.useAppNavigation();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const isPrenium = hooks.useAppSelector(
    state => state.userSlice.user?.isPrenium,
  );

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef((info: ViewableItemsChanged) => {
    const index = info.viewableItems[0]?.index ?? 0;
    setActiveIndex(index);
  }).current;

  const cart = hooks.useAppSelector(state => state.cartSlice.list);
  const exist = (item: PlantMedType) => cart.find(i => i.id === item.id);

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title={item.name}
        logoIcon={true}
        goBackIcon={true}
        basketIcon={true}
        bottomLine={true}
      />
    );
  };

  const renderImages = (): JSX.Element => {
    return (
      <FlatList
        bounces={false}
        horizontal={true}
        data={item.images}
        pagingEnabled={true}
        style={{flexGrow: 0}}
        viewabilityConfig={viewabilityConfig}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({item}) => {
          return (
            <custom.Image
              resizeMode='contain'
              source={{uri: item}}
              style={{
                // aspectRatio: 375 / 500,
                // aspectRatio: 335 / 165,
                aspectRatio: 700 / 500,
                width: theme.sizes.deviceWidth,
                backgroundColor: theme.colors.imageBackground,
              }}
            />
          );
        }}
      />
    );
  };

  const renderCarousel = (): JSX.Element | null => {
    const renderIndicator = (): JSX.Element | null => {
      if (item.images.length > 1) {
        return (
          <View
            style={{
              bottom: 31,
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              alignSelf: 'center',
            }}
          >
            {item.images.map(
              (
                _: any,
                current: React.Key | null | undefined,
                array: string | any[],
              ) => {
                const last = current === array.length - 1;
                return (
                  <View
                    key={current}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor:
                        activeIndex === current
                          ? theme.colors.mainColor
                          : theme.colors.white,
                      borderColor:
                        activeIndex === current
                          ? theme.colors.mainColor
                          : theme.colors.antiFlashWhite,
                      marginRight: last ? 0 : 10,
                      borderWidth: 1,
                    }}
                  />
                );
              },
            )}
          </View>
        );
      }

      return null;
    };

    const renderInWishlist = (): JSX.Element => {
      return (
        <plantmed.PlantmedInWishlist
          item={item}
          containerStyle={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            paddingHorizontal: 20,
            paddingVertical: 24,
          }}
          version={2}
        />
      );
    };

    if (item.images.length > 0) {
      return (
        <View style={{marginBottom: utils.rsHeight(30)}}>
          {renderImages()}
          {renderIndicator()}
          {renderInWishlist()}
        </View>
      );
    }

    return null;
  };

  const renderTabs = (): JSX.Element => {
    const tabs = [
      {name: 'Description', svg: <svg.infoSquareSvg />, isPremium: false},
      {name: 'Propriétés', svg: <svg.clipboardListSvg />, isPremium: true},
      {name: 'Usages', svg: <svg.handHeartSvg />, isPremium: true},
      {name: 'Précautions', svg: <svg.dangerTriangleSvg />, isPremium: false},
    ];

    return (
      <View
        style={{
          ...theme.flex.rowCenterSpaceBetween,
          marginHorizontal: 20,
          marginBottom: utils.responsiveHeight(20),
        }}
      >
        {tabs.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              paddingVertical: 20,
              borderRadius: 10,
              borderColor:
                tab === index
                  ? theme.colors.steelTeal
                  : theme.colors.transparent,
              backgroundColor:
                tab === index
                  ? `${theme.colors.white}50`
                  : theme.colors.transparent,
              position: 'relative',
            }}
            onPress={() => setTab(index)}
          >
            {item.svg}
            {item.isPremium && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              >
                <svg.TabPreniumSvg />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderPreniumOnly = (): JSX.Element => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: utils.responsiveHeight(24),
        }}
      >
        <text.H2
          style={{
            textTransform: 'capitalize',
            color: theme.colors.mainColor,
            marginBottom: utils.responsiveHeight(10),
          }}
        >
          Contenu réservé aux abonnés
        </text.H2>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: utils.responsiveHeight(6),
          }}
        >
          <text.T18
            style={{
              color: theme.colors.textColor,
            }}
          >
            Pour accéder à ce contenu, veuillez souscrire à un abonnement
          </text.T18>
        </View>
      </View>
    );
  };

  const renderDescription = (): JSX.Element => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: utils.responsiveHeight(24),
        }}
      >
        <text.H2
          style={{
            textTransform: 'capitalize',
            color: theme.colors.mainColor,
            marginBottom: utils.responsiveHeight(10),
          }}
        >
          Description
        </text.H2>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: utils.responsiveHeight(6),
          }}
        >
          <text.T18
            style={{
              paddingBottom: 20,
              color: theme.colors.textColor,
            }}
          >
            {item.description}
          </text.T18>
        </View>

        <text.H2
          style={{
            textTransform: 'capitalize',
            color: theme.colors.mainColor,
            marginBottom: utils.responsiveHeight(10),
          }}
        >
          Habitat
        </text.H2>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: utils.responsiveHeight(6),
          }}
        >
          <text.T18
            style={{
              paddingBottom: 20,
              color: theme.colors.textColor,
            }}
          >
            {item.habitat}
          </text.T18>
        </View>

        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            borderWidth: 1,
            paddingVertical: 20,
            borderRadius: 10,
            borderColor: theme.colors.steelTeal,
            backgroundColor: `${theme.colors.white}50`,
          }}
          onPress={() => {
            navigation.navigate('Source', {
              source: item.sources,
              title: item.name,
            });
          }}
        >
          <text.H2
            style={{
              textAlign: 'center',
              textTransform: 'capitalize',
              color: theme.colors.mainColor,
              marginBottom: utils.responsiveHeight(10),
            }}
          >
            {'Sources >'}
          </text.H2>
        </TouchableOpacity>
      </View>
    );
  };

  const renderProperty = (): JSX.Element => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: utils.responsiveHeight(24),
        }}
      >
        {isPrenium ? (
          <>
            <text.H2
              style={{
                textTransform: 'capitalize',
                color: theme.colors.mainColor,
                marginBottom: utils.responsiveHeight(10),
              }}
            >
              Description
            </text.H2>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: utils.responsiveHeight(6),
              }}
            >
              <text.T18
                style={{
                  paddingBottom: 20,
                  color: theme.colors.textColor,
                }}
              >
                {item.description}
              </text.T18>
            </View>

            <text.H2
              style={{
                textTransform: 'capitalize',
                color: theme.colors.mainColor,
                marginBottom: utils.responsiveHeight(10),
              }}
            >
              Propriétés
            </text.H2>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: utils.responsiveHeight(6),
              }}
            >
              <text.T18
                style={{
                  paddingBottom: 20,
                  color: theme.colors.textColor,
                }}
              >
                {item.propriete}
              </text.T18>
            </View>
          </>
        ) : (
          renderPreniumOnly()
        )}
      </View>
    );
  };

  const renderUse = (): JSX.Element => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: utils.responsiveHeight(24),
        }}
      >
        {isPrenium ? (
          <>
            <text.H2
              style={{
                textTransform: 'capitalize',
                color: theme.colors.mainColor,
                marginBottom: utils.responsiveHeight(10),
              }}
            >
              Usages internes
            </text.H2>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: utils.responsiveHeight(6),
              }}
            >
              <text.T18
                style={{
                  paddingBottom: 20,
                  color: theme.colors.textColor,
                }}
              >
                {item.usageInterne}
              </text.T18>
            </View>

            <text.H2
              style={{
                textTransform: 'capitalize',
                color: theme.colors.mainColor,
                marginBottom: utils.responsiveHeight(10),
              }}
            >
              Usages externes
            </text.H2>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: utils.responsiveHeight(6),
              }}
            >
              <text.T18
                style={{
                  paddingBottom: 20,
                  color: theme.colors.textColor,
                }}
              >
                {item.usageExterne}
              </text.T18>
            </View>
          </>
        ) : (
          renderPreniumOnly()
        )}
      </View>
    );
  };

  const renderCaution = (): JSX.Element => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: utils.responsiveHeight(24),
        }}
      >
        <text.H2
          style={{
            textTransform: 'capitalize',
            color: theme.colors.mainColor,
            marginBottom: utils.responsiveHeight(10),
          }}
        >
          Précautions
        </text.H2>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: utils.responsiveHeight(6),
          }}
        >
          <text.T18
            style={{
              color: theme.colors.textColor,
            }}
          >
            {item.precaution}
          </text.T18>
        </View>
      </View>
    );
  };

  const renderTabContent = (): JSX.Element => {
    if (tab === 0) {
      return renderDescription();
    } else if (tab === 1) {
      return renderProperty();
    } else if (tab === 2) {
      return renderUse();
    } else {
      return renderCaution();
    }
  };

  const renderContent = (): JSX.Element => {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
      >
        {renderCarousel()}
        {renderTabs()}
        {renderTabContent()}
      </ScrollView>
    );
  };

  return (
    <custom.ImageBackground
      style={{flex: 1}}
      resizeMode='stretch'
      source={require('../assets/bg/02.png')}
    >
      <custom.SafeAreaView
        insets={['top', 'bottom']}
        containerStyle={{backgroundColor: theme.colors.transparent}}
      >
        {renderHeader()}
        {renderContent()}
      </custom.SafeAreaView>
    </custom.ImageBackground>
  );
};

export default PlantMed;
