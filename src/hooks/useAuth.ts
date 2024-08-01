// useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';

type AuthService = 'google' | 'apple' | 'email' | 'unknown';

export const useAuth = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    // Clean up subscription on unmount
    return unsubscribe;
  }, []);

  const getAuthService = useCallback(async (): Promise<AuthService> => {
    if (!user) return 'unknown';

    const providers = await user.getIdTokenResult().then(idTokenResult => 
      idTokenResult.signInProvider ? [idTokenResult.signInProvider] : []
    );

    if (providers.includes('google.com')) {
      return 'google';
    } else if (providers.includes('apple.com')) {
      return 'apple';
    } else if (providers.includes('password')) {
      return 'email';
    } else {
      return 'unknown';
    }
  }, [user]);

  return { user, loading, getAuthService };
};