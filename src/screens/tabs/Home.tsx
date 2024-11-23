import { useEffect } from 'react';

import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import { useSymptomData } from '@src/hooks/useData';
import { useSubscription } from '@src/hooks/revenueCat';
import { getPremiumPlants } from '@src/hooks/plantStatus';
import { getPremiumSymptoms } from '@src/hooks/symptomStatus';
import { usePlantPress, useSymptomPress } from '@src/hooks/useCommonNav';
import { getTopFivePlants, usePlantRanking } from '@src/hooks/useRanking';

import LoadingScreen from '@src/components/LoadingScreen';

import { utils } from '@src/utils';
import { hooks } from '@src/hooks';
import { custom } from '@src/custom';
import { theme } from '@src/constants';
import { getPlantImage, PlantImageName } from '@src/data/plantImages';


const Home: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const { ranking } = usePlantRanking();
  const featuredPlants = getTopFivePlants(ranking);
  const { symptoms } = useSymptomData();
  const premiumSymptoms = getPremiumSymptoms();
  const premiumPlants = getPremiumPlants();
  const handlePlantPress = usePlantPress();
  const handleSymptomPress =  useSymptomPress();

  const {
    subscriptionDetails,
    loading,
    isPremium,
    isExpired,
    isTrial,
  } = useSubscription();

  useEffect(() => {
    if (subscriptionDetails) {
      console.log('Subscription Status:', {
        details: subscriptionDetails,
        isPremium,
        isExpired,
        isTrial,
        timestamp: new Date().toISOString(),
      });
    }
  }, [subscriptionDetails, isPremium, isExpired, isTrial]);

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Plantes Médicinales</Text>
      <Text style={styles.headerSubtitle}>Découvrez les bienfaits de la nature</Text>
    </View>
  );

  const renderSearchBar = () => (
    <TouchableOpacity
      style={styles.searchBar}
      onPress={() => navigation.navigate('SearchPlant')}
      activeOpacity={0.8}
    >
      <Text style={styles.searchText}>🔍 Rechercher une plante...</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <LoadingScreen />;
  }

  const renderCategories = (): JSX.Element | null => {
    return (
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Catégories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {symptoms.map(category => {
            const isSymptomPremium = premiumSymptoms.includes(category.id);

            return (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                activeOpacity={0.7}
                onPress={() => handleSymptomPress(category)}
              >
                {isSymptomPremium && (
                  <custom.ItemPrenium
                  item={category}
                  containerStyle={styles.premiumBadge}
                  />
                )}
                <View style={styles.categoryContent}>
                  <custom.ImageBackground
                    source={category.image}
                    style={styles.categoryImage}
                    imageStyle={styles.categoryImageStyle}
                    resizeMode="contain"
                  />
                  <Text style={styles.categoryName} numberOfLines={2}>
                    {category.name}
                  </Text>
                  <View style={styles.categoryCountContainer}>
                    <Text style={styles.categoryCount}>
                      {category.plantIds.length} plantes
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const renderFeaturedPlants = () => {
    if (!featuredPlants) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Découvrez nos plantes médicinales</Text>
          <Text style={styles.emptySubtitle}>
            Parcourez notre collection et trouvez les plantes adaptées à vos besoins
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('SearchPlant')}
            activeOpacity={0.8}
          >
            <Text style={styles.exploreButtonText}>Explorer les plantes</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Plantes populaires</Text>
        {featuredPlants.map(plant => {
          // Get plant name from the image path
          const plantName = plant.image?.toString().split('/').pop()?.split('.')[0];
          // Use the plant name to get the correct image from plantImages
          const imageSource = plantName ? getPlantImage(plantName as PlantImageName) : require('@src/assets/images/plants/default.png');

          const isPlantPremium = premiumPlants.includes(plant.id);

          return (
            <TouchableOpacity
              key={plant.id}
              style={styles.plantCard}
              onPress={() => handlePlantPress(plant)}
              activeOpacity={0.8}
            >
              <custom.ImageBackground
                source={imageSource}
                style={styles.plantImage}
                imageStyle={styles.plantImageStyle}
                resizeMode="cover"
              />
                {isPlantPremium && (
                  <custom.ItemPrenium
                  item={plant}
                  containerStyle={styles.premiumBadge}
                  />
                )}
              <View style={styles.plantInfo}>
                <View style={styles.plantHeader}>
                  <Text style={styles.plantName}>{plant.name}</Text>
                  {/* <Text style={styles.plantScientific}>{plant.scientificName}</Text> */}
                </View>
                {/* <View style={styles.divider} />
                <View style={styles.benefitsContainer}>
                  <View style={[styles.benefitTag, styles.familyTag]}>
                    <Text style={styles.familyText}>{plant.famille}</Text>
                  </View>
                  {plant.symptomIds.slice(0, 3).map((symptomId, index) => (
                    <View key={index} style={styles.benefitTag}>
                      <Text style={styles.benefitText}>{symptomId}</Text>
                    </View>
                  ))}
                </View> */}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <custom.ImageBackground
      style={styles.container}
      resizeMode="stretch"
      source={require('@src/assets/bg/02.png')}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderHeader()}
        {renderSearchBar()}
        {renderCategories()}
        {renderFeaturedPlants()}
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
    paddingBottom: utils.responsiveHeight(20),
  },
  header: {
    padding: 20,
    marginTop: utils.responsiveHeight(5),
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2C3E50',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 8,
    letterSpacing: 0.3,
  },
  searchBar: {
    margin: 20,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchText: {
    color: '#95A5A6',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginHorizontal: 20,
    marginBottom: 15,
    color: '#2C3E50',
    letterSpacing: 0.3,
  },
  categoriesSection: {
    marginVertical: 15,
  },
  categoriesContainer: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    marginRight: 12,
    borderRadius: 16,
    width: utils.responsiveWidth(160),
    minHeight: utils.responsiveHeight(120),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  premiumBadge: {
    position: 'absolute',
    padding: 14,
    top: -10,
    left: -10,
  },
  categoryContent: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryImage: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  categoryImageStyle: {
    borderRadius: 12,
    backgroundColor: theme.colors.imageBackground,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 6,
    height: 40,
    lineHeight: 20,
  },
  categoryCountContainer: {
    backgroundColor: '#F0F3F4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryCount: {
    fontSize: 12,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  featuredSection: {
    marginTop: 25,
  },
  plantCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  plantInfo: {
    padding: 16,
  },
  plantHeader: {
    marginBottom: 12,
  },
  plantName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    letterSpacing: 0.3,
  },
  plantScientific: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7F8C8D',
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: 12,
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  benefitTag: {
    backgroundColor: '#E8F6F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  familyTag: {
    backgroundColor: '#FFF3E0',
  },
  benefitText: {
    fontSize: 13,
    color: '#16A085',
    fontWeight: '500',
  },
  familyText: {
    fontSize: 13,
    color: '#F57C00',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 24,
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  exploreButton: {
    backgroundColor: '#16A085',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  loadingContainer: {
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantImage: {
    width: '100%',
    height: utils.responsiveHeight(200),
  },
  plantImageStyle: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

export default Home;
