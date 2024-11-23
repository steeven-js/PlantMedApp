import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { enableScreens } from 'react-native-screens';
import Orientation from 'react-native-orientation-locker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { useAppVersion } from '@src/hooks/useAppVersion';
import AppState from '@src/components/AppState';
import FlashMessage from '@src/components/FlashMessage';
import StackNavigator from '@src/navigation/StackNavigator';
import PleaseUpdateStack from '@src/navigation/PleaseUpdateStack';
import { store } from '@src/store';
import { useSubscription } from '@src/hooks/revenueCat';
import MobileAds from 'react-native-google-mobile-ads';

enableScreens();

// Composant de chargement
const LoadingScreen = () => (
  <View style={styles.centerContainer}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text style={styles.loadingText}>Vérification de l'abonnement...</Text>
  </View>
);

// Composant d'erreur
const ErrorScreen = ({ error, retry }: { error: string; retry: () => void }) => (
  <View style={styles.centerContainer}>
    <Text style={styles.errorTitle}>Une erreur est survenue</Text>
    <Text style={styles.errorMessage}>{error}</Text>
    <TouchableOpacity onPress={retry} style={styles.retryButton}>
      <Text style={styles.retryButtonText}>Réessayer</Text>
    </TouchableOpacity>
  </View>
);

// Composant de contenu principal
const MainContent = ({ isUpdateRequired }: { isUpdateRequired: boolean }) => (
  <NavigationContainer>
    {!isUpdateRequired ? <StackNavigator /> : <PleaseUpdateStack />}
  </NavigationContainer>
);

// Composant pour l'abonnement expiré
const ExpiredSubscriptionScreen = () => (
  <View style={styles.centerContainer}>
    <Text style={styles.errorTitle}>Votre abonnement a expiré</Text>
    <Text style={styles.errorMessage}>
      Veuillez renouveler votre abonnement pour continuer à utiliser l'application
    </Text>
  </View>
);

// Composant séparé pour la logique qui nécessite le Provider Redux
const AppContent = () => {
  const { isUpdateRequired } = useAppVersion();
  const { 
    subscriptionDetails, 
    isPremium,
    isExpired,
    isTrial,
    loading, 
    error, 
    checkSubscriptionStatus,
  } = useSubscription();

  useEffect(() => {
    const initialize = async () => {
      try {
        Orientation.lockToPortrait();
        await checkSubscriptionStatus();
        await MobileAds().initialize();
      } catch (err) {
        console.error('Erreur lors de l\'initialisation:', err);
      }
    };

    initialize();
  }, []);

  // Logging des changements d'état de l'abonnement
  useEffect(() => {
    if (subscriptionDetails) {
      console.log('Subscription Status:', {
        details: subscriptionDetails,
        isPremium,
        isExpired,
        isTrial,
        timestamp: new Date().toISOString()
      });
    }
  }, [subscriptionDetails, isPremium, isExpired, isTrial]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} retry={checkSubscriptionStatus} />;
  }

  if (!subscriptionDetails) {
    return (
      <ErrorScreen 
        error="Impossible de récupérer les informations d'abonnement" 
        retry={checkSubscriptionStatus} 
      />
    );
  }

  // Décommentez si vous voulez gérer les abonnements expirés
  /*
  if (isExpired) {
    return <ExpiredSubscriptionScreen />;
  }
  */

  return (
    <>
      <MainContent isUpdateRequired={isUpdateRequired} />
      <AppState />
    </>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppContent />
      </Provider>
      <FlashMessage />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff0000',
    marginBottom: 16,
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;