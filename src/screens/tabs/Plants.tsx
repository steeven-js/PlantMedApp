import React from 'react';

import {
  Text,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {usePlantPress} from '@src/hooks/useCommonNav';

import {utils} from '@src/utils';
import {custom} from '@src/custom';
import {theme} from '@src/constants';
import {PlantType} from '@src/types';
import {components} from '@src/components';
import {usePlantData} from '@src/hooks/useData';
import {getPlantImage, PlantImageName} from '@src/data/plantImages';

const Plants: React.FC = () => {
  const handlePlantPress = usePlantPress();
  const {plants, hasData} = usePlantData();

    // Fonction de sécurité pour gérer les images manquantes
    const getImage = (imageName: string) => {
      try {
        // Récupérer l'image avec getPlantImage
        const image = getPlantImage(imageName as PlantImageName);
        // Retourner l'image dans le bon format pour FastImage
        return typeof image === 'number' 
          ? image  // Si c'est déjà un require()
          : { uri: image };  // Si c'est une URL
      } catch (error) {
        console.warn(`Image not found for: ${imageName}`);
        return require('@src/assets/images/plants/default.png');
      }
    };

    const renderCategories = (): JSX.Element | null => {
      if (plants?.length) {
        return (
          <View style={styles.categoriesContainer}>
            {plants.map((item, index) => {
              // On s'assure que item.image est une chaîne
              const imageSource = getImage(item.image?.toString() || '');
              
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.plantCard}
                  onPress={() => handlePlantPress(item)}>
                  <custom.ImageBackground
                    source={imageSource}
                    style={styles.plantImageBackground}
                    imageStyle={styles.plantImage}
                    resizeMode="cover">
                    {item.is_premium && Platform.OS === 'ios' ? (
                      <custom.PlantPrenium
                        item={item as PlantType}
                        containerStyle={styles.premiumBadge}
                      />
                    ) : null}
                    <Text numberOfLines={2} style={styles.plantName}>
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

  if (!hasData) {
    return <components.NoData />;
  }

  return (
    <custom.ImageBackground
      resizeMode="stretch"
      source={require('@src/assets/bg/02.png')}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {renderCategories()}
      </ScrollView>
    </custom.ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  categoriesContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: utils.responsiveHeight(40 - 14),
  },
  plantCard: {
    width: utils.responsiveWidth(150, true),
    height: utils.responsiveWidth(150, true),
    marginBottom: 40,
    justifyContent: 'space-around',
  },
  plantImage: {
    borderRadius: 10,
    backgroundColor: theme.colors.imageBackground,
  },
  plantImageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: 14,
    paddingBottom: 12,
  },
  premiumBadge: {
    position: 'absolute',
    padding: 14,
    top: -10,
    left: -10,
  },
  plantName: {
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
  },
});

export default Plants;
