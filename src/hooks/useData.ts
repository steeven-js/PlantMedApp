import { useState, useEffect } from 'react';
import { plants } from '@src/data/plants';
import { symptoms } from '@src/data/symptoms';
import { PlantType, SymptomType } from '@src/types';

export const usePlantData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const activePlants = plants.filter(plant => plant.is_active);
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

    const activeSymptoms = symptoms.filter(symptom => symptom.is_active);
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