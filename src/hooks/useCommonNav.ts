import { Platform } from 'react-native';

import { hooks } from '@src/hooks';
import { PlantType, SymptomType } from '@src/types';


export const usePlantPress = () => {
    const navigation = hooks.useAppNavigation();

    const handlePlantPress = async (item: PlantType) => {

        if (Platform.OS === 'ios' && item.is_premium) {
            navigation.navigate('Premium');
            return;
        } else {
            navigation.navigate('Plant', { item, id: item.id });
        }
    };

    return handlePlantPress;
};

export const useSymptomPress = () => {
    const navigation = hooks.useAppNavigation();

    const handleSymptomPress = async (item: SymptomType) => {

        if (Platform.OS === 'ios' && item.is_premium) {
            navigation.navigate('Premium');
            return;
        } else {
            navigation.navigate('Symptom', { item, id: item.id });
        }
    };

    return handleSymptomPress;
};
