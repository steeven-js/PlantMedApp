import { useState, useEffect } from 'react';
import { plants } from '@src/data/plants';
import { symptoms } from '@src/data/symptoms';
import { PlantType, SymptomType } from '@src/types';
import { getActiveSymptoms } from './symptomStatus';
import { getActivePlants } from './plantStatus';

export const usePlantData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Utiliser getActivePlants pour obtenir les IDs des plantes actives
    const activePlantIds = getActivePlants();
    
    // Filtrer les plantes en fonction des IDs actifs
    const activePlants = plants.filter(plant => 
        activePlantIds.includes(plant.id)
    );
    
    const hasData = activePlants.length > 0;

    useEffect(() => {
        try {
            setLoading(false);
        } catch (err) {
            setError('Erreur lors du chargement des plantes');
            setLoading(false);
        }
    }, []);

    return {
        plants: activePlants,
        loading,
        error,
        hasData
    };
};

export const useSymptomData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Utiliser getActiveSymptoms pour obtenir les IDs des symptômes actifs
    const activeSymptomIds = getActiveSymptoms();
    
    // Filtrer les symptômes en fonction des IDs actifs
    const activeSymptoms = symptoms.filter(symptom => 
        activeSymptomIds.includes(symptom.id)
    );
    
    const hasData = activeSymptoms.length > 0;

    useEffect(() => {
        try {
            setLoading(false);
        } catch (err) {
            setError('Erreur lors du chargement des symptômes');
            setLoading(false);
        }
    }, []);

    return {
        symptoms: activeSymptoms,
        loading,
        error,
        hasData
    };
};

export const useRelatedPlants = (symptomId: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const symptom = symptoms.find(s => s.id === symptomId);
    const relatedPlants = symptom
        ? plants.filter(plant => symptom.plantIds.includes(plant.id))
        : [];

    useEffect(() => {
        try {
            setLoading(false);
        } catch (err) {
            setError('Erreur lors du chargement des plantes associées');
            setLoading(false);
        }
    }, [symptomId]);

    return {
        plants: relatedPlants,
        loading,
        error,
        hasData: relatedPlants.length > 0
    };
};

export const useRelatedSymptoms = (plantId: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const plant = plants.find(p => p.id === plantId);
    const relatedSymptoms = plant
        ? symptoms.filter(symptom => plant.symptomIds.includes(symptom.id))
        : [];

    useEffect(() => {
        try {
            setLoading(false);
        } catch (err) {
            setError('Erreur lors du chargement des symptômes associés');
            setLoading(false);
        }
    }, [plantId]);

    return {
        symptoms: relatedSymptoms,
        loading,
        error,
        hasData: relatedSymptoms.length > 0
    };
};