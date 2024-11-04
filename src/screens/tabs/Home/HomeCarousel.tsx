import React, { useRef, useState } from 'react';

import {
  View,
  Alert,
  FlatList,
  ViewToken,
  TouchableOpacity,
} from 'react-native';

import { text } from '../../../text';
import { utils } from '../../../utils';
import { custom } from '../../../custom';
import { theme } from '../../../constants';

type ViewableItemsChanged = {
  viewableItems: Array<ViewToken>;
  changed: Array<ViewToken>;
};

const HomeCarousel = ({ carousel, carouselData, plantsData, navigation }) => {
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onViewableItemsChanged = useRef((info: ViewableItemsChanged) => {
    const index = info.viewableItems[0]?.index ?? 0;
    setActiveIndex(index);
  }).current;

  const renderCarouselItem = ({ item }: { item: any }) => {
    const products = plantsData?.plantmeds.filter(plant => {
      return plant.promotion === item.promotion;
    });

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          if (products?.length === 0) {
            Alert.alert(
              'Aucune plante',
              "Malheureusement, il n'y a pas de plantes disponibles pour cette promotion.",
              [
                {
                  text: 'OK',
                  onPress: () => console.log('OK Pressed'),
                },
              ],
            );
            return;
          }

          navigation.navigate('PlantMedList', {
            title: item.promotion || 'Plante du jour',
            products: products || [],
          });
        }}
      >
        <custom.ImageBackground
          source={{ uri: item.image }}
          style={{
            width: theme.sizes.deviceWidth,
            aspectRatio: 375 / 450,
            paddingHorizontal: 20,
            paddingTop: 40,
            paddingBottom: 20,
            justifyContent: 'space-between',
          }}
          imageStyle={{ backgroundColor: theme.colors.imageBackground }}
        >
          <View>
            <text.H2
              style={{
                backgroundColor: theme.colors.whiteTransparent,
                padding: 10,
              }}
            >
              {item.title_line_1}
            </text.H2>
            <text.H3
              style={{
                backgroundColor: theme.colors.whiteTransparent,
                padding: 10,
              }}
            >
              {item.title_line_2}
            </text.H3>
          </View>
        </custom.ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderFlatList = () => {
    return (
      <FlatList
        data={carousel}
        horizontal={true}
        pagingEnabled={true}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={renderCarouselItem}
      />
    );
  };

  const renderDots = (): JSX.Element | null => {
    if (carousel.length > 0) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
            bottom: 0,
            position: 'absolute',
          }}
        >
          {carouselData?.carousel.map((_, current, array) => {
            const last = current === array.length - 1;
            return (
              <View
                key={current}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 6,
                  backgroundColor:
                    activeIndex === current
                      ? theme.colors.mainColor
                      : theme.colors.white,
                  marginRight: last ? 0 : 10,
                }}
              />
            );
          })}
        </View>
      );
    }

    return null;
  };

  const renderCarousel = (): JSX.Element | null => {
    if (carouselData?.carousel.length > 0) {
      return (
        <View
          style={{
            width: theme.sizes.deviceWidth,
            marginBottom: utils.responsiveHeight(20),
          }}
        >
          {renderFlatList()}
          {renderDots()}
        </View>
      );
    }

    return null;
  };

  return <>{renderCarousel()}</>;
};

export default HomeCarousel;
