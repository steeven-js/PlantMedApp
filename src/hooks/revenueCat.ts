import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Purchases, { PurchasesPackage, CustomerInfo } from 'react-native-purchases';
import { hooks } from '../hooks';
import { actions } from '../store/actions';

// Types pour le statut de l'abonnement
export enum SubscriptionStatus {
  FREE = 'FREE',
  TRIAL = 'TRIAL',
  PREMIUM = 'PREMIUM',
  EXPIRED = 'EXPIRED'
}

interface SubscriptionDetails {
  status: SubscriptionStatus;
  expirationDate: string | null;
  startDate: string | null;
  productId: string | null;
  isActive: boolean;
}

// Configuration initiale
const setupRevenueCat = () => {
    const API_KEYS = {
        apple: 'appl_AWOSjMlZGtVNqcEplEenAiuKKDJ',
        google: 'votre_cle_api_google',
    };

    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
    Purchases.configure({
        apiKey: Platform.OS === 'ios' ? API_KEYS.apple : API_KEYS.google
    });
};

setupRevenueCat();

// Utilitaires
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(date);
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

const getSubscriptionStatus = (customerInfo: CustomerInfo): SubscriptionDetails => {
    const proEntitlement = customerInfo.entitlements.active.pro;
    const now = new Date().getTime();

    if (!proEntitlement) {
        return {
            status: SubscriptionStatus.FREE,
            expirationDate: null,
            startDate: null,
            productId: null,
            isActive: false
        };
    }

    const purchaseDate = customerInfo.allPurchaseDates[proEntitlement.productIdentifier];
    const expirationDate = customerInfo.allExpirationDates[proEntitlement.productIdentifier];
    const expirationTime = expirationDate ? new Date(expirationDate).getTime() : 0;

    // Déterminer si c'est une période d'essai
    const isTrial = proEntitlement.productIdentifier.includes('trial');
    
    // Vérifier si l'abonnement est expiré
    const isExpired = expirationTime < now;

    let status: SubscriptionStatus;
    if (isExpired) {
        status = SubscriptionStatus.EXPIRED;
    } else if (isTrial) {
        status = SubscriptionStatus.TRIAL;
    } else {
        status = SubscriptionStatus.PREMIUM;
    }

    return {
        status,
        expirationDate: expirationDate ? formatDate(expirationDate) : null,
        startDate: purchaseDate ? formatDate(purchaseDate) : null,
        productId: proEntitlement.productIdentifier,
        isActive: !isExpired
    };
};

export function useSubscription() {
    const dispatch = hooks.useAppDispatch();
    const [isInitialized, setIsInitialized] = useState(false);
    const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails>({
        status: SubscriptionStatus.FREE,
        expirationDate: null,
        startDate: null,
        productId: null,
        isActive: false
    });
    const [offerings, setOfferings] = useState<PurchasesPackage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const checkSubscriptionStatus = useCallback(async () => {
        if (!isInitialized) {
            setLoading(true);
        }
        
        try {
            const customerInfo = await Purchases.getCustomerInfo();
            const details = getSubscriptionStatus(customerInfo);
            
            setSubscriptionDetails(details);
            dispatch(actions.setPremium(details.isActive));
            
        } catch (err) {
            console.error("Erreur lors de la vérification du statut d'abonnement:", err);
            setError("Impossible de vérifier le statut de l'abonnement");
        } finally {
            setLoading(false);
            setIsInitialized(true);
        }
    }, [dispatch, isInitialized]);

    const fetchOfferings = useCallback(async () => {
        try {
            const response = await Purchases.getOfferings();
            if (response.current !== null) {
                setOfferings(response.current.availablePackages);
            }
        } catch (err) {
            console.error('Erreur lors de la récupération des offres:', err);
            setError('Impossible de récupérer les offres');
        }
    }, []);

    useEffect(() => {
        const initialize = async () => {
            await checkSubscriptionStatus();
            await fetchOfferings();
        };
        
        initialize();
    }, [checkSubscriptionStatus, fetchOfferings]);

    // Ne retourner les valeurs que lorsque l'initialisation est terminée
    if (loading) {
        return {
            loading: true,
            error: null,
            subscriptionDetails: null,
            isSubscribed: false,
            isPremium: false,
            isTrial: false,
            isExpired: false,
            offerings: [],
            fetchOfferings,
            purchaseSubscription: async () => {},
            checkSubscriptionStatus
        };
    }

    return {
        error,
        loading,
        offerings,
        subscriptionDetails,
        isSubscribed: subscriptionDetails.isActive,
        isPremium: subscriptionDetails.status === SubscriptionStatus.PREMIUM,
        isTrial: subscriptionDetails.status === SubscriptionStatus.TRIAL,
        isExpired: subscriptionDetails.status === SubscriptionStatus.EXPIRED,
        fetchOfferings,
        purchaseSubscription: async (packageToPurchase: PurchasesPackage) => {
            setLoading(true);
            setError(null);
            try {
                const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
                const details = getSubscriptionStatus(customerInfo);
                
                setSubscriptionDetails(details);
                dispatch(actions.setPremium(details.isActive));

            } catch (err) {
                console.error("Erreur lors de l'achat de l'abonnement:", err);
                setError("Échec de l'achat de l'abonnement");
            } finally {
                setLoading(false);
            }
        },
        checkSubscriptionStatus,
    };
}