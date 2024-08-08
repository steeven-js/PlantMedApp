import { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import packageJson from '../../package.json';

export const useAppVersion = () => {
    useEffect(() => {
        checkAppVersion();
    }, []);

    const checkAppVersion = async () => {
        try {
            // Récupérer la version actuelle de l'application depuis package.json
            const currentVersion = packageJson.version;

            // Récupérer la version de l'application depuis Firebase
            const doc = await firestore()
                .collection('app-version')
                .doc(Platform.OS) // 'ios' ou 'android'
                .get();

                console.log('doc', doc);

            if (doc.exists) {
                const remoteVersion = doc.data()?.version;

                // Comparer les versions
                if (remoteVersion && remoteVersion !== currentVersion) {
                    Alert.alert(
                        'Mise à jour disponible',
                        'Une nouvelle version de l\'application est disponible. Veuillez mettre à jour l\'application pour continuer.'
                    );
                }
            } else {
                console.log('Document non trouvé');
            }
        } catch (error) {
            console.error('Erreur lors de la vérification de la version de l\'application :', error);
        }
    };
};
