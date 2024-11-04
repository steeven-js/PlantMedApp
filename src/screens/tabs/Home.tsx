import React from 'react';

import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import { utils } from '@src/utils';
import { hooks } from '@src/hooks';
import { custom } from '@src/custom';

// Types
interface PlantCard {
  id: string;
  name: string;
  scientificName: string;
  benefits: string[];
  category: string;
  image: string;
}

interface CategoryCard {
  id: string;
  name: string;
  count: number;
  icon: string;
}

const Home: React.FC = () => {
  const navigation = hooks.useAppNavigation();

  // Mock data
  const featuredPlants: PlantCard[] = [
    {
      id: '1',
      name: 'Lavande',
      scientificName: 'Lavandula',
      benefits: ['Relaxant', 'Anti-stress', 'Sommeil'],
      category: 'Aromathérapie',
      image: '@src/assets/images/plants/Lavande.png',
    },
    {
      id: '2',
      name: 'Thym',
      scientificName: 'Thymus vulgaris',
      benefits: ['Antibactérien', 'Système immunitaire'],
      category: 'Plantes digestives',
      image: '@src/assets/images/plants/Thym.png',
    },
  ];

  const categories: CategoryCard[] = [
    { id: '1', name: 'Aromathérapie', count: 25, icon: '🌸' },
    { id: '2', name: 'Plantes digestives', count: 18, icon: '🌿' },
    { id: '3', name: 'Sommeil & Détente', count: 12, icon: '😴' },
    { id: '4', name: 'Immunité', count: 15, icon: '💪' },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Plantes Médicinales</Text>
      <Text style={styles.headerSubtitle}>Découvrez les bienfaits de la nature</Text>
    </View>
  );

  const renderSearchBar = () => (
    <TouchableOpacity style={styles.searchBar} onPress={() => navigation.navigate('SearchPlant')}>
      <Text style={styles.searchText}>Rechercher une plante...</Text>
    </TouchableOpacity>
  );

  const renderCategories = () => (
    <View style={styles.categoriesSection}>
      <Text style={styles.sectionTitle}>Catégories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map(category => (
          <TouchableOpacity key={category.id} style={styles.categoryCard} activeOpacity={0.7}>
            <View style={styles.categoryContent}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName} numberOfLines={2} adjustsFontSizeToFit={false}>
                {category.name}
              </Text>
              <Text style={styles.categoryCount}>{category.count} plantes</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderFeaturedPlants = () => (
    <View style={styles.featuredSection}>
      <Text style={styles.sectionTitle}>Plantes populaires</Text>
      {featuredPlants.map(plant => (
        <TouchableOpacity key={plant.id} style={styles.plantCard}>
          <View style={styles.plantInfo}>
            <Text style={styles.plantName}>{plant.name}</Text>
            <Text style={styles.plantScientific}>{plant.scientificName}</Text>
            <View style={styles.benefitsContainer}>
              {plant.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitTag}>
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: utils.responsiveHeight(20),
        }}
        showsVerticalScrollIndicator={false}
      >
        {renderHeader()}
        {renderSearchBar()}
        {renderCategories()}
        {renderFeaturedPlants()}
      </ScrollView>
    );
  };

  return (
    <custom.ImageBackground
      style={{ flex: 1 }}
      resizeMode="stretch"
      source={require('@src/assets/bg/02.png')}
    >
      {renderContent()}
    </custom.ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    marginTop: utils.responsiveHeight(5),
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 5,
  },
  searchBar: {
    margin: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchText: {
    color: '#95A5A6',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 20,
    marginBottom: 15,
    color: '#2C3E50',
  },
  categoriesSection: {
    marginVertical: 10,
  },
  categoriesContainer: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    borderRadius: 12,
    width: utils.responsiveWidth(160),
    minHeight: utils.responsiveHeight(115),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14, // Taille de police réduite
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 4,
    height: 35, // Hauteur fixe pour 2 lignes
    lineHeight: 17, // Pour un meilleur espacement des lignes
  },
  categoryCount: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  featuredSection: {
    marginTop: 20,
  },
  plantCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  plantInfo: {
    padding: 15,
  },
  plantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  plantScientific: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7F8C8D',
    marginTop: 5,
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  benefitTag: {
    backgroundColor: '#E8F6F3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 5,
    marginTop: 5,
  },
  benefitText: {
    fontSize: 12,
    color: '#16A085',
  },
});

export default Home;
