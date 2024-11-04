import {Alert, TouchableOpacity} from 'react-native';

import {utils} from '../../../utils';
import {custom} from '../../../custom';
import {theme} from '../../../constants';

const HomeBanner = ({banner, bannersData, plantsData, navigation}) => {
    if (banner?.length === 0) {return null;}

    const bannerPromotion = bannersData?.banners[0]?.promotion;
    const bannerLength = bannersData?.banners?.length ?? 0;
    const products =
      plantsData?.plantmeds.filter((item: { promotion: any; }) => item.promotion === bannerPromotion) ??
      [];

    if (bannerLength > 0) {
      return (
        <TouchableOpacity
          style={{marginBottom: utils.responsiveHeight(50)}}
          onPress={() => {
            if (products.length === 0) {
              Alert.alert('No data', 'No data available for this promotion');
              return;
            }

            navigation.navigate('PlantMedList', {
              title: bannerPromotion || 'Promotion',
              products: products,
            });
          }}
        >
          <custom.Image
            source={{uri: banner[0]?.image}}
            style={{
              width: theme.sizes.deviceWidth - 20,
              aspectRatio: 355 / 200,
            }}
            imageStyle={{
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              backgroundColor: theme.colors.imageBackground,
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      );
    }

    return null;
};

export default HomeBanner;
