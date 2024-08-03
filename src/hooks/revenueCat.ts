import { hooks } from '../hooks';
import { useAuth } from './useAuth';
import { Platform } from 'react-native';
import { actions } from '../store/actions';
import { useEffect, useState } from 'react';
import Purchases, { PurchasesPackage } from 'react-native-purchases';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

// Configuration des clés API RevenueCat
const API_KEYS = {
    apple: 'appl_AWOSjMlZGtVNqcEplEenAiuKKDJ',
    google: 'votre_cle_api_google'
};

// Initialisation de RevenueCat
Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
Purchases.configure({ apiKey: Platform.OS === 'ios' ? API_KEYS.apple : API_KEYS.google });

// Déclarez le type pour l'objet userProfile
type UserProfile = {
    displayName: string;
    email: string;
    location: string;
    premium: boolean;
    premiumUpdatedAt?: FirebaseFirestoreTypes.Timestamp;
    createdAt: FirebaseFirestoreTypes.Timestamp;
    updatedAt?: FirebaseFirestoreTypes.Timestamp;
};

export function useSubscription() {
    const dispatch = hooks.useAppDispatch();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [offerings, setOfferings] = useState<PurchasesPackage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [formattedPremiumDate, setFormattedPremiumDate] = useState<string>('');


    const navigation = hooks.useAppNavigation();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            checkSubscriptionStatus();
            fetchOfferings();
            fetchUserProfile();
        }
    }, [user]);

    const fetchUserProfile = async () => {
        try {
            const userProfileRef = firestore().collection('UserProfiles').doc(user?.uid);
            const docSnapshot = await userProfileRef.get();

            if (docSnapshot.exists) {
                setUserProfile(docSnapshot.data() as UserProfile);
            } else {
                setUserProfile(null);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du profil utilisateur:", error);
            setError("Impossible de récupérer les informations de l'utilisateur");
        }
    };

    const checkSubscriptionStatus = async () => {
        if (!user) return;
        try {
            const customerInfo = await Purchases.getCustomerInfo();
            const isPro = customerInfo.entitlements.active['pro'] !== undefined;
            setIsSubscribed(isPro);

            const userProfileRef = firestore().collection('UserProfiles').doc(user.uid);
            const docSnapshot = await userProfileRef.get();

            if (docSnapshot.exists) {
                if (isPro) {
                    const expirationDate = customerInfo.entitlements.active['pro']?.expirationDate;
                    await userProfileRef.update({
                        premium: true,
                        premiumUpdatedAt: firestore.FieldValue.serverTimestamp(),
                        premiumExpiresAt: expirationDate,
                    });
                    setIsSubscribed(true);
                    dispatch(actions.setPremium(true));
                    if (expirationDate) {
                        setFormattedPremiumDate(formatDate(expirationDate));
                    }
                } else {
                    await userProfileRef.update({
                        premium: false,
                        premiumUpdatedAt: null,
                        premiumExpiresAt: null,
                    });
                    setIsSubscribed(false);
                    dispatch(actions.setPremium(false));
                    setFormattedPremiumDate('');
                }
            } else {
                await userProfileRef.set({
                    premium: isPro,
                    premiumUpdatedAt: isPro ? firestore.FieldValue.serverTimestamp() : null,
                    premiumExpiresAt: isPro ? customerInfo.entitlements.active['pro']?.expirationDate : null,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                    // Ajoutez d'autres champs par défaut ici
                });
                if (isPro) {
                    const expirationDate = customerInfo.entitlements.active['pro']?.expirationDate;
                    if (expirationDate) {
                        setFormattedPremiumDate(formatDate(expirationDate));
                    }
                }
            }
        } catch (error) {
            console.error("Erreur lors de la vérification du statut d'abonnement:", error);
        }
    };

    const fetchOfferings = async () => {
        try {
            const offerings = await Purchases.getOfferings();
            if (offerings.current !== null) {
                setOfferings(offerings.current.availablePackages);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des offres:', error);
            setError('Impossible de récupérer les offres');
        }
    };

    const purchaseSubscription = async (packageToPurchase: PurchasesPackage) => {
        if (!user) {
            setError("Utilisateur non connecté");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
            const newSubscriptionStatus = customerInfo.entitlements.active['pro'] !== undefined;

            const userProfileRef = firestore().collection('UserProfiles').doc(user.uid);
            if (newSubscriptionStatus) {
                await userProfileRef.update({
                    premium: true,
                    premiumUpdatedAt: firestore.FieldValue.serverTimestamp(),
                    premiumExpiresAt: customerInfo.entitlements.active['pro'].expirationDate,
                });
                setFormattedPremiumDate(formatDate(customerInfo.entitlements.active['pro'].expirationDate));
                setIsSubscribed(true);
                dispatch(actions.setPremium(true));
                navigation.navigate('PremiumActivated');
            } else {
                await userProfileRef.update({
                    premium: false,
                    premiumUpdatedAt: null,
                    premiumExpiresAt: null,
                });
                setFormattedPremiumDate(formatDate(customerInfo.entitlements.active['pro'].expirationDate));
                setIsSubscribed(false);
            }
        } catch (error) {
            console.error("Erreur lors de l'achat de l'abonnement:", error);
            setError("Échec de l'achat de l'abonnement");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date: FirebaseFirestoreTypes.Timestamp | string | null): string => {
        if (!date) return 'Date inconnue';

        let d: Date;
        if (typeof date === 'string') {
            d = new Date(date);
        } else {
            d = date.toDate();
        }

        const day = d.getDate().toString().padStart(2, '0');
        const month = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(d);
        const year = d.getFullYear();

        return `${day} ${month} ${year}`;
    };

    return {
        error,
        loading,
        offerings,
        isSubscribed,
        userProfile,
        formattedPremiumDate,
        formatDate,
        fetchOfferings,
        purchaseSubscription,
        checkSubscriptionStatus,
    };
}
