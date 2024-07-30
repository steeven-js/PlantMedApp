// src/hooks/useAuth.ts

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { setUser, setLoading, setError } from '../store/slices/firebaseAuthSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user: any) => {
        dispatch(setUser(user));
        if (initializing) setInitializing(false);
    };

    const signIn = async (email: string, password: string) => {
        try {
            dispatch(setLoading(true));
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            dispatch(setUser(userCredential.user));
        } catch (error: any) {
            dispatch(setError(error.message));
        }
    };

    const signUp = async (email: string, password: string) => {
        try {
            dispatch(setLoading(true));
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            dispatch(setUser(userCredential.user));
        } catch (error: any) {
            dispatch(setError(error.message));
        }
    };

    const logOut = async () => {
        try {
            await auth().signOut();
            dispatch(clearUser());
        } catch (error: any) {
            dispatch(setError(error.message));
        }
    };

    const resetPassword = async (email: string) => {
        try {
            dispatch(setLoading(true));
            await auth().sendPasswordResetEmail(email);
            dispatch(setLoading(false));
        } catch (error: any) {
            dispatch(setError(error.message));
        }
    };

    return {
        initializing,
        onAuthStateChanged,
        signIn,
        signUp,
        logOut,
        resetPassword,
    };
};