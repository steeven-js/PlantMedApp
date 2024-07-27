import axios from 'axios';
import { hooks } from '../hooks';
import { UserType } from '../types';
import { RootState } from '../store';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { actions } from '../store/actions';
import { useEffect, useState } from 'react';
import { ENDPOINTS, CONFIG } from '../config';
import Purchases, { PurchasesPackage } from 'react-native-purchases';

// Configurez vos clés API RevenueCat
const API_KEYS = {
    apple: 'appl_AWOSjMlZGtVNqcEplEenAiuKKDJ',
    google: 'votre_cle_api_google'
};

// Initialisez RevenueCat
Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
Purchases.configure({ apiKey: Platform.OS === 'ios' ? API_KEYS.apple : API_KEYS.google });

export function useSubscription() {
    const dispatch = hooks.useAppDispatch();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [offerings, setOfferings] = useState<PurchasesPackage[]>([]);

    const user: UserType | null = useSelector(
        (state: RootState) => state.userSlice.user,
    );

    useEffect(() => {
        checkSubscriptionStatus();
        fetchOfferings();
    }, []);

    async function checkSubscriptionStatus() {
        try {
            const customerInfo = await Purchases.getCustomerInfo();
            setIsSubscribed(customerInfo.entitlements.active['pro'] !== undefined);

            // console.log('Statut de l\'abonnement:', isSubscribed);

            const updatedUser = {
                is_premium: isSubscribed 
            };

            const response = await axios({
                method: 'put',
                url: ENDPOINTS.UPDATE_SUBSCRIBE_USER + `/${user?.id}`,
                headers: CONFIG.headers,
                data: updatedUser,
            });

            if (response.status === 200) {
                dispatch(actions.setUser(response.data.user));
                // console.log('Mise à jour de l\'abonnement de l\'utilisateur:', isSubscribed);
            }
        } catch (error) {
            console.error('Erreur lors de la vérification du statut de l\'abonnement:', error);
        }
    }

    async function fetchOfferings() {
        try {
            const offerings = await Purchases.getOfferings();
            if (offerings.current !== null) {
                setOfferings(offerings.current.availablePackages);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des offres:', error);
        }
    }

    async function purchaseSubscription(packageToPurchase: PurchasesPackage) {
        try {
            const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
            setIsSubscribed(customerInfo.entitlements.active['pro'] !== undefined);
        } catch (error) {
            console.error('Erreur lors de l\'achat de l\'abonnement:', error);
        }
    }

    async function restorePurchases() {
        try {
            const customerInfo = await Purchases.restorePurchases();
            setIsSubscribed(customerInfo.entitlements.active['pro'] !== undefined);
        } catch (error) {
            console.error('Erreur lors de la restauration des achats:', error);
        }
    }

    console.log('isSubscribed:', isSubscribed);

    return {
        isSubscribed,
        offerings,
        purchaseSubscription,
        restorePurchases
    };
}