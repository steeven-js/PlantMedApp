import {useState, useEffect} from 'react';

import {View, ScrollView} from 'react-native';

import {items} from '../../../items';
import {utils} from '../../../utils';
import {hooks} from '../../../hooks';
import {components} from '../../../components';
import {PlantMedType, SymptomType} from '../../../types';
import {queryHooks} from '../../../store/slices/apiSlice';

import {firebase} from '@react-native-firebase/firestore';

interface PlantRankingEntry {
  id: string;
  clicks: number;
  details: PlantMedType;
}

interface SymptomRankingEntry {
  id: string;
  clicks: number;
  details: SymptomType;
}

const HomePlantRank = () => {
  const currentDate = new Date();
  const navigation = hooks.useAppNavigation();
  const [plantRanking, setPlantRanking] = useState<PlantRankingEntry[]>([]);
  const [topFivePlants, setTopFivePlants] = useState<PlantRankingEntry[]>([]);
  const [topTenPlants, setTopTenPlants] = useState<PlantRankingEntry[]>([]);
  const documentName = `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

  const {
    data: plantsData,
    error: plantsError,
    isLoading: plantsLoading,
    refetch: refetchPlants,
  } = queryHooks.useGetPlantmedsQuery();

  const fetchRanking = async () => {
    try {
      const doc = await firebase
        .firestore()
        .collection('plants-ranking')
        .doc(documentName)
        .get();

      if (doc.exists && plantsData?.plantmeds) {
        const data = doc.data() as Record<string, {clicks: number; name: string}>;
        const rankingEntries: PlantRankingEntry[] = Object.entries(data)
          .map(([id, {clicks, name}]) => {
            const plantDetails = plantsData.plantmeds.find(
              plant => plant.id.toString() === id,
            );
            return plantDetails ? {id, clicks, details: plantDetails} : null;
          })
          .filter((entry): entry is PlantRankingEntry => entry !== null)
          .sort((a, b) => b.clicks - a.clicks);

        setPlantRanking(rankingEntries);
        setTopFivePlants(rankingEntries.slice(0, 5));
        setTopTenPlants(rankingEntries.slice(0, 10));
      } else {
        console.log('No ranking document found or plants data is missing.');
      }
    } catch (error) {
      console.error('Error fetching ranking:', error);
    }
  };

  useEffect(() => {
    fetchRanking();
  }, [plantsData]);

  return (
    <View style={{marginBottom: utils.responsiveHeight(50)}}>
      <components.BlockHeading
        title="Les plus consultées"
        containerStyle={{
          paddingHorizontal: 20,
          marginBottom: 11,
        }}
      />
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          paddingLeft: 20,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {topFivePlants.map((item, index, array) => (
          <items.PlantmedCard
            item={item.details}
            key={item.id.toString()}
            version={3}
            isLast={index === array.length - 1}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const HomeSymptomRank = () => {
  const currentDate = new Date();
  const navigation = hooks.useAppNavigation();
  const [symptomRanking, setSymptomRanking] = useState<SymptomRankingEntry[]>([]);
  const [topFiveSymptoms, setTopFiveSymptoms] = useState<SymptomRankingEntry[]>([]);
  const [topTenSymptoms, setTopTenSymptoms] = useState<SymptomRankingEntry[]>([]);
  const documentName = `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

  const {
    data: symptomsData,
    error: symptomsError,
    isLoading: symptomsLoading,
    refetch: refetchSymptoms,
  } = queryHooks.useGetSymptomsQuery();

  const fetchRanking = async () => {
    try {
      const doc = await firebase
        .firestore()
        .collection('symptoms-ranking')
        .doc(documentName)
        .get();

      if (doc.exists && symptomsData?.symptoms) {
        const data = doc.data() as Record<string, {clicks: number; name: string}>;
        const rankingEntries: SymptomRankingEntry[] = Object.entries(data)
          .map(([id, {clicks, name}]) => {
            const symptomDetails = symptomsData.symptoms.find(
              symptom => symptom.id.toString() === id,
            );
            return symptomDetails ? {id, clicks, details: symptomDetails} : null;
          })
          .filter((entry): entry is SymptomRankingEntry => entry !== null)
          .sort((a, b) => b.clicks - a.clicks);

        setSymptomRanking(rankingEntries);
        setTopFiveSymptoms(rankingEntries.slice(0, 5));
        setTopTenSymptoms(rankingEntries.slice(0, 10));
      } else {
        console.log('No ranking document found or symptoms data is missing.');
      }
    } catch (error) {
      console.error('Error fetching ranking:', error);
    }
  };

  useEffect(() => {
    fetchRanking();
  }, [symptomsData]);

  return (
    <View style={{marginBottom: utils.responsiveHeight(20)}}>
      <components.BlockHeading
        title="Les plus consultées"
        containerStyle={{
          paddingHorizontal: 20,
          marginBottom: 11,
        }}
      />
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          paddingLeft: 20,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {topFiveSymptoms.map((item, index, array) => (
          <items.SymptomCard
            item={item.details}
            key={item.id.toString()}
            version={2}
            isLast={index === array.length - 1}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export {HomePlantRank, HomeSymptomRank};
