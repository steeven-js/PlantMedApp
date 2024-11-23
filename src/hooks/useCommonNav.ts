import { Platform } from 'react-native';

import { useInterstitialAd } from './useAds';
import { isActiveAndPremium } from './plantStatus';
import { checkSymptomStatus } from './symptomStatus';
import { SubscriptionStatus, useSubscription } from './revenueCat';
import { incrementPlantClicks, incrementSymptomClicks } from './useRanking';

import { hooks } from '@src/hooks';
import { PlantType, SymptomType } from '@src/types';


export const usePlantPress = () => {
    const navigation = hooks.useAppNavigation();
    const { showAd, adLoaded } = useInterstitialAd();
    const { subscriptionDetails } = useSubscription();

    const handlePlantPress = async (item: PlantType) => {
        try {
            const plantStatus = isActiveAndPremium(item.id);
            incrementPlantClicks(item.id.toString(), item.name);

            // Afficher une pub si l'utilisateur n'est pas premium et qu'une pub est disponible
            if (subscriptionDetails?.status !== SubscriptionStatus.PREMIUM && adLoaded) {
                await showAd();
            }

            // Naviguer vers Premium seulement si ce n'est pas un utilisateur premium et que l'item est premium
            if (Platform.OS === 'ios' &&
                plantStatus &&
                subscriptionDetails?.status !== SubscriptionStatus.PREMIUM) {
                navigation.navigate('Premium');
                return;
            }

            // Sinon, naviguer vers la page de la plante
            navigation.navigate('Plant', { item, id: item.id });

        } catch (error) {
            console.warn('Error checking plant status:', error);
            navigation.navigate('Plant', { item, id: item.id });
        }
    };

    return handlePlantPress;
};

export const useSymptomPress = () => {
    const navigation = hooks.useAppNavigation();
    const { showAd, adLoaded } = useInterstitialAd();
    const { subscriptionDetails } = useSubscription();

    const handleSymptomPress = async (item: SymptomType) => {
        try {
            const symptomStatus = checkSymptomStatus(item.id);
            incrementSymptomClicks(item.id.toString(), item.name);

            // Afficher une pub si l'utilisateur n'est pas premium et qu'une pub est disponible
            if (subscriptionDetails?.status !== SubscriptionStatus.PREMIUM && adLoaded) {
                await showAd();
            }

            // Naviguer vers Premium seulement si ce n'est pas un utilisateur premium et que l'item est premium
            if (Platform.OS === 'ios' &&
                symptomStatus.is_premium &&
                subscriptionDetails?.status !== SubscriptionStatus.PREMIUM) {
                navigation.navigate('Premium');
                return;
            }

            // Sinon, naviguer vers la page du symptôme
            navigation.navigate('Symptom', { item, id: item.id });

        } catch (error) {
            console.warn('Error checking symptom status:', error);
            navigation.navigate('Symptom', { item, id: item.id });
        }
    };

    return handleSymptomPress;
};
