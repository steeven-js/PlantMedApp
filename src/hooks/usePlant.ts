import { useMemo } from 'react';

import { PlantType } from '@src/types';
import { Plants } from '@src/data/plants';


export const usePlant = () => {
    const plants = useMemo(() => Plants, []);
    const hasData = useMemo(() => plants.length > 0, [plants]);

    // Nouvelle fonction pour récupérer une plante par ID
    const getPlantById = (id: string): PlantType | undefined => {
        return plants.find(plant => plant.id === id);
    };

    return {
        plants,
        hasData,
        getPlantById,
    };
};
