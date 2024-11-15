import { useCallback, useEffect, useState } from 'react';

import { Platform } from 'react-native';
import Purchases, { PurchasesPackage } from 'react-native-purchases';

import { hooks } from '../hooks';
import { actions } from '../store/actions';

// Configuration des clés API RevenueCat
const API_KEYS = {
    apple: 'appl_AWOSjMlZGtVNqcEplEenAiuKKDJ',
    google: 'votre_cle_api_google',
};

// Initialisation de RevenueCat
Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
Purchases.configure({ apiKey: Platform.OS === 'ios' ? API_KEYS.apple : API_KEYS.google });

export function useSubscription() {
    const dispatch = hooks.useAppDispatch();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [offerings, setOfferings] = useState<PurchasesPackage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [expirationDate, setExpirationDate] = useState<string | null>(null);

    const checkSubscriptionStatus = useCallback(async () => {
        try {
            const customerInfo = await Purchases.getCustomerInfo();
            const isPro = customerInfo.entitlements.active.pro !== undefined;
            setIsSubscribed(isPro);

            if (isPro && customerInfo.entitlements.active.pro?.expirationDate) {
                setExpirationDate(formatDate(customerInfo.entitlements.active.pro.expirationDate));
            } else {
                setExpirationDate(null);
            }

            dispatch(actions.setPremium(isPro));
        } catch (err) {
            console.error("Erreur lors de la vérification du statut d'abonnement:", err);
            setError("Impossible de vérifier le statut de l'abonnement");
        }
    }, [dispatch]);

    useEffect(() => {
        checkSubscriptionStatus();
        fetchOfferings();
    }, [checkSubscriptionStatus]);

    const fetchOfferings = async () => {
        try {
            const response = await Purchases.getOfferings();
            if (response.current !== null) {
                setOfferings(response.current.availablePackages);
            }
        } catch (err) {
            console.error('Erreur lors de la récupération des offres:', err);
            setError('Impossible de récupérer les offres');
        }
    };

    const purchaseSubscription = async (packageToPurchase: PurchasesPackage) => {
        setLoading(true);
        setError(null);
        try {
            const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
            const newSubscriptionStatus = customerInfo.entitlements.active.pro !== undefined;

            setIsSubscribed(newSubscriptionStatus);
            dispatch(actions.setPremium(newSubscriptionStatus));

            if (newSubscriptionStatus && customerInfo.entitlements.active.pro?.expirationDate) {
                setExpirationDate(formatDate(customerInfo.entitlements.active.pro.expirationDate));
                // navigation.navigate('PremiumActivated');
            } else {
                setExpirationDate(null);
            }
        } catch (error) {
            console.error("Erreur lors de l'achat de l'abonnement:", error);
            setError("Échec de l'achat de l'abonnement");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(date);
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };

    return {
        error,
        loading,
        offerings,
        isSubscribed,
        expirationDate,
        formatDate,
        fetchOfferings,
        purchaseSubscription,
        checkSubscriptionStatus,
    };
}
