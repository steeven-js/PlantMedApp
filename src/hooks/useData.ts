import { useState, useEffect, useMemo } from 'react';

import { getActivePlants } from './plantStatus';
import { getActiveSymptoms } from './symptomStatus';

import { plants } from '@src/data/plants';
import { symptoms } from '@src/data/symptoms';

export const usePlantData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activePlantIds, setActivePlantIds] = useState<string[]>([]);

    useEffect(() => {
        try {
            const ids = getActivePlants();
            setActivePlantIds(ids);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors du chargement des plantes');
            setLoading(false);
        }
    }, []);

    const activePlants = useMemo(() =>
        plants.filter(plant => activePlantIds.includes(plant.id)),
        [activePlantIds]
    );

    return {
        plants: activePlants,
        loading,
        error,
        hasData: activePlants.length > 0,
    };
};

export const useSymptomData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeSymptomIds, setActiveSymptomIds] = useState<string[]>([]);

    useEffect(() => {
        try {
            const ids = getActiveSymptoms();
            setActiveSymptomIds(ids);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors du chargement des symptômes');
            setLoading(false);
        }
    }, []);

    const activeSymptoms = useMemo(() =>
        symptoms.filter(symptom => activeSymptomIds.includes(symptom.id)),
        [activeSymptomIds]
    );

    return {
        symptoms: activeSymptoms,
        loading,
        error,
        hasData: activeSymptoms.length > 0,
    };
};

export const useRelatedPlants = (symptomId: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const relatedPlants = useMemo(() => {
        const symptom = symptoms.find(s => s.id === symptomId);
        return symptom
            ? plants.filter(plant => symptom.plantIds.includes(plant.id))
            : [];
    }, [symptomId]);

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
        hasData: relatedPlants.length > 0,
    };
};

export const useRelatedSymptoms = (plantId: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const relatedSymptoms = useMemo(() => {
        const plant = plants.find(p => p.id === plantId);
        return plant
            ? symptoms.filter(symptom => plant.symptomIds.includes(symptom.id))
            : [];
    }, [plantId]);

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
        hasData: relatedSymptoms.length > 0,
    };
};
