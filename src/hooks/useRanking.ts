import { firebase } from '@react-native-firebase/firestore';
import { useState, useEffect } from 'react';
import { PlantType, SymptomType } from '@src/types';
import { usePlantData, useSymptomData } from './useData';

// Interfaces pour les entrées de classement
interface PlantRankingEntry {
    id: string;
    clicks: number;
    details: PlantType;
}

interface SymptomRankingEntry {
    id: string;
    clicks: number;
    details: SymptomType;
}

// Fonction pour incrémenter les clics d'une plante
export const incrementPlantClicks = async (plantId: string, plantName: string): Promise<void> => {
    const currentDate = new Date();
    const documentName = `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

    try {
        const plantRef = firebase.firestore().collection('plants-ranking').doc(documentName);

        await firebase.firestore().runTransaction(async (transaction) => {
            const doc = await transaction.get(plantRef);
            if (!doc.exists) {
                transaction.set(plantRef, {
                    [plantId]: { name: plantName, clicks: 1 }
                });
            } else {
                const currentData = doc.data()?.[plantId];
                const currentClicks = currentData?.clicks || 0;

                transaction.update(plantRef, {
                    [plantId]: { name: plantName, clicks: currentClicks + 1 }
                });
            }
        });
    } catch (error) {
        console.error("Error updating plant ranking:", error);
    }
};

// Fonction pour incrémenter les clics d'un symptôme
export const incrementSymptomClicks = async (symptomId: string, symptomName: string): Promise<void> => {
    const currentDate = new Date();
    const documentName = `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

    try {
        const symptomRef = firebase.firestore().collection('symptoms-ranking').doc(documentName);

        await firebase.firestore().runTransaction(async (transaction) => {
            const doc = await transaction.get(symptomRef);
            if (!doc.exists) {
                transaction.set(symptomRef, {
                    [symptomId]: { name: symptomName, clicks: 1 }
                });
            } else {
                const currentData = doc.data()?.[symptomId];
                const currentClicks = currentData?.clicks || 0;

                transaction.update(symptomRef, {
                    [symptomId]: { name: symptomName, clicks: currentClicks + 1 }
                });
            }
        });
    } catch (error) {
        console.error("Error updating symptom ranking:", error);
    }
};

// Hook pour récupérer le classement des plantes
export const usePlantRanking = (): PlantRankingEntry[] => {
    const [ranking, setRanking] = useState<PlantRankingEntry[]>([]);
    const { plants, hasData: hasPlantsData } = usePlantData();

    useEffect(() => {
        const fetchRanking = async () => {
            const currentDate = new Date();
            const documentName = `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    
            try {
                const doc = await firebase.firestore()
                    .collection('plants-ranking')
                    .doc(documentName)
                    .get();
    
                if (doc.exists && hasPlantsData) {
                    const data = doc.data() as Record<string, { clicks: number; name: string }>;
                    const rankingEntries: PlantRankingEntry[] = Object.entries(data)
                        .map(([id, { clicks }]) => {
                            const plantDetails = plants.find(plant => plant.id === id);
                            return plantDetails ? { id, clicks, details: plantDetails } : null;
                        })
                        .filter((entry): entry is PlantRankingEntry => entry !== null)
                        .sort((a, b) => b.clicks - a.clicks);
    
                    setRanking(rankingEntries);
                }
            } catch (error) {
                console.error("Error fetching plant ranking:", error);
            }
        };
    
        if (hasPlantsData) {
            fetchRanking();
        }
    }, [plants, hasPlantsData]);

    return ranking;
};

// Hook pour récupérer le classement des symptômes
export const useSymptomRanking = (): SymptomRankingEntry[] => {
    const [ranking, setRanking] = useState<SymptomRankingEntry[]>([]);
    const { symptoms, hasData: hasSymptomData } = useSymptomData();

    useEffect(() => {
        const fetchRanking = async () => {
            const currentDate = new Date();
            const documentName = `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    
            try {
                const doc = await firebase.firestore()
                    .collection('symptoms-ranking')
                    .doc(documentName)
                    .get();
    
                if (doc.exists && hasSymptomData) {
                    const data = doc.data() as Record<string, { clicks: number; name: string }>;
                    const rankingEntries: SymptomRankingEntry[] = Object.entries(data)
                        .map(([id, { clicks }]) => {
                            const symptomDetails = symptoms.find(symptom => symptom.id === id);
                            return symptomDetails ? { id, clicks, details: symptomDetails } : null;
                        })
                        .filter((entry): entry is SymptomRankingEntry => entry !== null)
                        .sort((a, b) => b.clicks - a.clicks);
    
                    setRanking(rankingEntries);
                }
            } catch (error) {
                console.error("Error fetching symptom ranking:", error);
            }
        };
    
        if (hasSymptomData) {
            fetchRanking();
        }
    }, [symptoms, hasSymptomData]);

    return ranking;
};

// Fonction pour obtenir les 5 plantes les plus consultées
export const getTopFivePlants = (ranking: PlantRankingEntry[]): PlantType[] => {
    return ranking.slice(0, 5).map(entry => entry.details);
};

// Fonction pour obtenir les 5 symptômes les plus consultés
export const getTopFiveSymptoms = (ranking: SymptomRankingEntry[]): SymptomType[] => {
    return ranking.slice(0, 5).map(entry => entry.details);
};