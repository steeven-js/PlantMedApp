import axios from 'axios';
import { hooks } from '../hooks';
import { useState } from 'react';
import { actions } from '../store/actions';
import { ENDPOINTS, CONFIG } from '../config';
import { alert } from '../alert';

export function useUsers() {
    const [userExists, setUserExists] = useState<boolean>(false);
    const dispatch = hooks.useAppDispatch();
    const navigation = hooks.useAppNavigation();

    async function handleOAuthSignIn(email: string, password: string, name: string) {
        try {
            const _email = {
                email: email
            };

            console.log('data', email);

            const response = await axios.post(
                `${ENDPOINTS.GET_USER_BY_EMAIL}`,
                _email,
                { headers: CONFIG.headers }
            );

            if (response.status === 200) {
                setUserExists(true);
                // L'utilisateur existe, on le connecte
                const response = await axios({
                    data: { email, password },
                    method: 'post',
                    headers: CONFIG.headers,
                    url: ENDPOINTS.LOGIN_USER,
                });

                if (response.status === 200) {
                    dispatch(actions.setUser(response.data.user));
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'TabNavigator' }],
                    });
                }
            } else {
                setUserExists(false);
                const createResponse = await axios({
                    data: { name, email, password },
                    method: 'post',
                    headers: CONFIG.headers,
                    url: ENDPOINTS.CREATE_USER,
                });

                if (createResponse.status === 200) {
                    dispatch(actions.setUser(createResponse.data.user));
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'TabNavigator' }],
                    });
                }
                console.log('L\'utilisateur n\'existe pas');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion/inscription OAuth:', error);
            alert.userWithThisEmailAlreadyExists();
        }
    }

    return {
        userExists,
        handleOAuthSignIn
    };
}