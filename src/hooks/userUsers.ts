import axios from 'axios';
import { useState } from 'react';
import { ENDPOINTS, CONFIG } from '../config';


export function useUsers() {
    // Vérifier si l'utilisateur existe dans la base de données
    const [userExists, setUserExists] = useState<boolean>(false);

    async function ifUserExists({ email }: { email: string | null }) {
        try {
            const data = {
                email: email
            };

            const response = await axios.post(
                `${ENDPOINTS.GET_USER_BY_EMAIL}`,
                data,
                { headers: CONFIG.headers }
            );

            if (response.status === 200) {
                setUserExists(true);
            } else {
                setUserExists(false);
                console.log('L\'utilisateur n\'existe pas');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        }
    }
    return {
        userExists,
        ifUserExists
    };
}