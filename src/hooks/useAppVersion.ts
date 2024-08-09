import { Alert, Platform } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import firestore from '@react-native-firebase/firestore';

import packageJson from '../../package.json';
import { compareVersions } from 'compare-versions';

export const useAppVersion = () => {
    const [firebaseVersion, setFirebaseVersion] = useState<string | null>(null);
    const [localVersion] = useState<string>(packageJson.version);
    const [isUpdateRequired, setIsUpdateRequired] = useState<boolean>(false);

    const fetchAppVersion = useCallback(async () => {
        try {
            const platformDocId = Platform.OS === 'ios' ? 'ios' : 'android';
            const appVersionDoc = await firestore().collection('app-version').doc(platformDocId).get();

            if (appVersionDoc.exists) {
                const appVersionData = appVersionDoc.data();
                const version = appVersionData?.version;

                if (version) {
                    // console.log(`App Version (${platformDocId}):`, version);
                    // console.log('Local Version:', localVersion);

                    const updateRequired = compareVersions(version, localVersion) > 0;
                    setIsUpdateRequired(updateRequired);
                    // console.log(updateRequired ? 'Update required' : 'No update required');

                    setFirebaseVersion(version);
                } else {
                    // console.log(`Version not found in ${platformDocId} document.`);
                }
            } else {
                // console.log(`No app-version data found for ${platformDocId}`);
            }
        } catch (error) {
            console.error('Error fetching app-version:', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de la récupération des informations de version.');
        }
    }, [localVersion]);

    useEffect(() => {
        fetchAppVersion();
    }, [fetchAppVersion]);

    return { localVersion, firebaseVersion, isUpdateRequired };
};