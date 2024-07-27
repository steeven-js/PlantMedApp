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
import { userSlice } from '../store/slices/userSlice';

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
    const [expirationDate, setExpirationDate] = useState<Date | null>(null);
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
            const newSubscriptionStatus = customerInfo.entitlements.active['pro'] !== undefined;
            setIsSubscribed(newSubscriptionStatus);
    
            await new Promise(resolve => setTimeout(resolve, 0));

            console.log('Informations client:', customerInfo);
            console.log('Statut de l\'abonnement:', newSubscriptionStatus);
    
            if (newSubscriptionStatus) {
                dispatch(userSlice.actions.setPrenium(true));
            } else {
                dispatch(userSlice.actions.setPrenium(false));
            }
    
            const latestExpirationDate = customerInfo.latestExpirationDate;
            if (latestExpirationDate) {
                const expirationDateObj = new Date(latestExpirationDate);
                convertTimestampToDate(expirationDateObj);
            } else {
                setExpirationDate(null);
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
            const newSubscriptionStatus = customerInfo.entitlements.active['pro'] !== undefined;

            if (user?.id) {
                const updatedUser = {
                    is_premium: newSubscriptionStatus
                };

                const response = await axios.put(
                    `${ENDPOINTS.UPDATE_SUBSCRIBE_USER}/${user.id}`,
                    updatedUser,
                    { headers: CONFIG.headers }
                );

                if (response.status === 200) {
                    dispatch(userSlice.actions.setPrenium(true));
                    console.log('Mise à jour de l\'abonnement de l\'utilisateur:', newSubscriptionStatus);
                } else {
                    dispatch(userSlice.actions.setPrenium(false));
                }
            }

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

    function convertTimestampToDate(date: Date | null): string {
        if (!date) return 'Pas de date d\'expiration';
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        const formattedDate = `${day}/${month}/${year}`;

        console.log('Date d\'expiration:', formattedDate);

        setExpirationDate(date);
        
        return formattedDate;
    }   

    return {
        offerings,
        isSubscribed,
        expirationDate,
        restorePurchases,
        purchaseSubscription,
        checkSubscriptionStatus,
    };
}