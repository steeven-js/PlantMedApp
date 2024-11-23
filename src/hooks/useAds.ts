import { useEffect, useState, useRef, useCallback } from 'react';
import { Platform } from 'react-native';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = Platform.OS === 'ios'
    ? 'ca-app-pub-6048143702887535/7409572068'
    : 'ca-app-pub-6048143702887535/9241372956';

export const useInterstitialAd = () => {
    const [interstitialAd, setInterstitialAd] = useState<InterstitialAd | null>(null);
    const [adLoaded, setAdLoaded] = useState(false);
    const lastAdShowTime = useRef<number>(0);

    useEffect(() => {
        const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
            requestNonPersonalizedAdsOnly: true,
            keywords: ['fashion', 'clothing'],
        });

        // Abonnement aux événements publicitaires
        const handleAdLoaded = () => setAdLoaded(true);
        const handleAdClosed = () => {
            setAdLoaded(false);
            interstitial.load();
        };

        const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, handleAdLoaded);
        const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, handleAdClosed);

        // Charger la première annonce
        interstitial.load();
        setInterstitialAd(interstitial);

        return () => {
            unsubscribeLoaded();
            unsubscribeClosed();
        };
    }, []);

    const showAd = useCallback(async () => {
        const currentTime = Date.now();

        if (adLoaded && interstitialAd) {
            try {
                await interstitialAd.show();
                lastAdShowTime.current = currentTime;
            } catch (error) {
                console.error('Failed to show interstitial ad', error);
            }
        } else {
            console.log('Ad not ready yet or too soon since last ad');
        }
    }, [adLoaded, interstitialAd]);

    return { showAd, adLoaded };
};
