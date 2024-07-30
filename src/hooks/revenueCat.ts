import axios from 'axios';
import { hooks } from '../hooks';
import { UserType } from '../types';
import { RootState } from '../store';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ENDPOINTS, CONFIG } from '../config';
import Purchases, { PurchasesPackage } from 'react-native-purchases';
import { userSlice } from '../store/slices/userSlice';

// Configuration des clés API RevenueCat
const API_KEYS = {
    apple: 'appl_AWOSjMlZGtVNqcEplEenAiuKKDJ',
    google: 'goog_sjHUEfOPYLjhdPZKOtuujZhLtdi'
};

// SKU de l'abonnement en fonction de la plateforme
const SUBSCRIPTION_SKU = Platform.OS === 'ios' ? 'pro' : 'pro_android';

// Initialisation de RevenueCat
Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
Purchases.configure({ apiKey: Platform.OS === 'ios' ? API_KEYS.apple : API_KEYS.google });

export function useSubscription() {
    const dispatch = hooks.useAppDispatch();
    // États locaux pour gérer l'abonnement et les offres
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [expirationDate, setExpirationDate] = useState<Date | null>(null);
    const [offerings, setOfferings] = useState<PurchasesPackage[]>([]);

    const navigation = hooks.useAppNavigation();

    // Récupération de l'utilisateur depuis le state global
    const user: UserType | null = useSelector(
        (state: RootState) => state.userSlice.user,
    );

    // Effet pour vérifier le statut de l'abonnement et récupérer les offres au montage du composant
    useEffect(() => {
        checkSubscriptionStatus();
        fetchOfferings();
    }, []);

    // Fonction pour vérifier le statut de l'abonnement
    async function checkSubscriptionStatus() {
        try {
            const customerInfo = await Purchases.getCustomerInfo();
            const SubscriptionStatus = Platform.OS === 'ios' ? customerInfo.entitlements.active['pro'] !== undefined : customerInfo.entitlements.active['pro_android'] !== undefined
            const newSubscriptionStatus = SubscriptionStatus;

            // console.log('Informations client:', customerInfo);
            // console.log('Nouveau statut de l\'abonnement:', newSubscriptionStatus);

            // Mise à jour de l'état local
            setIsSubscribed(newSubscriptionStatus);

            // Mise à jour du store Redux
            dispatch(userSlice.actions.setPrenium(newSubscriptionStatus));

            // Mise à jour du backend
            if (user?.id) {
                try {
                    const updatedUser = {
                        is_premium: newSubscriptionStatus
                    };

                    const response = await axios.put(
                        `${ENDPOINTS.UPDATE_SUBSCRIBE_USER}/${user.id}`,
                        updatedUser,
                        { headers: CONFIG.headers }
                    );

                    if (response.status === 200) {
                        // console.log('Mise à jour de l\'abonnement de l\'utilisateur:', newSubscriptionStatus);
                    } else {
                        console.error('Erreur lors de la mise à jour de l\'abonnement sur le backend');
                    }
                } catch (error) {
                    console.error('Erreur lors de la mise à jour de l\'abonnement sur le backend:', error);
                }
            }

            // Gestion de la date d'expiration
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

    // Fonction pour récupérer les offres disponibles
    async function fetchOfferings() {
        try {
            const offerings = await Purchases.getOfferings();
            if (offerings.current !== null) {
                setOfferings(offerings.current.availablePackages);
            }
        } catch (error) {
            // console.error('Erreur lors de la récupération des offres:', error);
        }
    }

    // Fonction pour effectuer un achat d'abonnement
    async function purchaseSubscription() {
        try {
            const offerings = await Purchases.getOfferings();
            if (!offerings.current) {
                console.error('Aucune offre disponible');
                return;
            }

            setOfferings(offerings.current.availablePackages);

            const packageToPurchase = offerings.current.monthly;

            if (!packageToPurchase) {
                console.error('Package mensuel non trouvé');
                return;
            }

            const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
            const subscriptionStatus = Platform.OS === 'ios'
                ? customerInfo.entitlements.active['pro'] !== undefined
                : customerInfo.entitlements.active['pro_android'] !== undefined;

            setIsSubscribed(subscriptionStatus);

            if (user?.id) {
                const updatedUser = {
                    is_premium: subscriptionStatus
                };

                const response = await axios.put(
                    `${ENDPOINTS.UPDATE_SUBSCRIBE_USER}/${user.id}`,
                    updatedUser,
                    { headers: CONFIG.headers }
                );

                if (response.status === 200) {
                    dispatch(userSlice.actions.setPrenium(subscriptionStatus));
                    navigation.navigate('PremiumActivated');
                } else {
                    dispatch(userSlice.actions.setPrenium(false));
                }
            }

        } catch (error) {
            console.error('Erreur lors de l\'achat de l\'abonnement:', error);
        }
    }

    // Fonction pour restaurer les achats
    async function restorePurchases() {
        try {
            const customerInfo = await Purchases.restorePurchases();
            const restoredSubscriptionStatus = customerInfo.entitlements.active['pro'] !== undefined;
            setIsSubscribed(restoredSubscriptionStatus);
            // Mise à jour du backend et du Redux store si nécessaire
            // TODO: Ajouter la logique de mise à jour similaire à celle de purchaseSubscription
        } catch (error) {
            console.error('Erreur lors de la restauration des achats:', error);
        }
    }

    // Fonction pour convertir un timestamp en date formatée
    function convertTimestampToDate(date: Date | null): string {
        if (!date) return 'Pas de date d\'expiration';

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        // console.log('Date d\'expiration:', formattedDate);

        setExpirationDate(date);

        return formattedDate;
    }

    // Retourne les valeurs et fonctions nécessaires pour gérer l'abonnement
    return {
        offerings,
        isSubscribed,
        expirationDate,
        restorePurchases,
        purchaseSubscription,
        checkSubscriptionStatus,
    };
}