import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
    endConnection,
    getSubscriptions,
    initConnection,
} from 'react-native-iap';

const SUBSCRIPTION_SKU = 'plm_199_m';

const useIAP = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                console.log("Début de l'initialisation");
                await initConnection();
                console.log('Connexion initialisée');
                const subscriptions = await getSubscriptions({ skus: [SUBSCRIPTION_SKU] });
                if (subscriptions.length === 0) {
                    console.log('Aucun abonnement trouvé pour le SKU:', SUBSCRIPTION_SKU);
                } else {
                    console.log('Abonnements trouvés:', subscriptions);
                }

            } catch (error) {
                console.error('Erreur complète:', error);
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'Une erreur inconnue est survenue';
                Alert.alert('Erreur', `Une erreur est survenue: ${errorMessage}`);
            } finally {
                setLoading(false);
            }
        };

        init();

        return () => {
            endConnection().catch(error => {
                console.error('Erreur lors de la fin de la connexion:', error);
            });
        };
    }, []);

    return { loading };
};

export default useIAP;
