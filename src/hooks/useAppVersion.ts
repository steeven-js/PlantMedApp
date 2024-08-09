import { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import packageJson from '../../package.json';

export const useAppVersion = () => {
    const [firebaseVersion, setFirebaseVersion] = useState<string | null>(null);
    const [localVersion, setLocalVersion] = useState<string>(packageJson.version);

    const fetchAppVersion = async () => {
        try {
            const platformDocId = Platform.OS === 'ios' ? 'ios' : 'android';
            const appVersionDoc = await firestore().collection('app-version').doc(platformDocId).get();

            if (appVersionDoc.exists) {
                const appVersionData = appVersionDoc.data();
                const version = appVersionData?.version;

                if (version) {
                    console.log(`App Version (${platformDocId}):`, version);
                    console.log('localVersion', localVersion);
                    setFirebaseVersion(version);
                } else {
                    console.log(`Version not found in ${platformDocId} document.`);
                }
            } else {
                console.log(`No app-version data found for ${platformDocId}`);
            }
        } catch (error) {
            console.error('Error fetching app-version:', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de la récupération des informations de version.');
        }
    };

    useEffect(() => {
        fetchAppVersion();
    }, []);

    return { localVersion, firebaseVersion };
};
