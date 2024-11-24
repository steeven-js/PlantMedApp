import React from 'react';

import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// Composant de chargement
const Loader: React.FC = (): JSX.Element => (
  <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.loadingText}>Chargement</Text>
    </View>
  );

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

export default Loader;
