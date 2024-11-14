import { Platform } from 'react-native';

import { hooks } from '@src/hooks';
import { PlantType, SymptomType } from '@src/types';
import { checkPlantStatus } from './plantStatus';
import { checkSymptomStatus } from './symptomStatus';


export const usePlantPress = () => {
    const navigation = hooks.useAppNavigation();

    const handlePlantPress = async (item: PlantType) => {
        try {
            // Vérifier le statut premium de la plante
            const plantStatus = checkPlantStatus(item.id);
            
            if (Platform.OS === 'ios' && plantStatus.is_premium) {
                navigation.navigate('Premium');
                return;
            } else {
                navigation.navigate('Plant', { item, id: item.id });
            }
        } catch (error) {
            console.warn('Error checking plant status:', error);
            // En cas d'erreur, naviguer vers la page de la plante par défaut
            navigation.navigate('Plant', { item, id: item.id });
        }
    };

    return handlePlantPress;
};

export const useSymptomPress = () => {
    const navigation = hooks.useAppNavigation();

    const handleSymptomPress = async (item: SymptomType) => {
        try {
            // Vérifier le statut premium de la plante
            const symptomStatus = checkSymptomStatus(item.id);
            
            if (Platform.OS === 'ios' && symptomStatus.is_premium) {
                navigation.navigate('Premium');
                return;
            } else {
                navigation.navigate('Symptom', { item, id: item.id });
            }
        } catch (error) {
            console.warn('Error checking plant status:', error);
            // En cas d'erreur, naviguer vers la page de la plante par défaut
            navigation.navigate('Symptom', { item, id: item.id });
        }
    };

    return handleSymptomPress;
};
