import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
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
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [offerings, setOfferings] = useState<PurchasesPackage[]>([]);

    useEffect(() => {
        checkSubscriptionStatus();
        fetchOfferings();
    }, []);

    async function checkSubscriptionStatus() {
        try {
            const customerInfo = await Purchases.getCustomerInfo();
            setIsSubscribed(customerInfo.entitlements.active['pro'] !== undefined);
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

    return {
        isSubscribed,
        offerings,
        purchaseSubscription,
        restorePurchases
    };
}