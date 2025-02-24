import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuthToken, setAuthToken, removeAuthToken } from '~/lib/auth';
import { axiosInstance } from '~/lib/axios';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
    token: string | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadToken = async () => {
            const token = await getAuthToken();
            if (token) {
                axiosInstance.defaults.headers.common['Authorization'] = token;
                setTokenState(token);
            }
            setLoading(false);
        };
        loadToken();
    }, []);

    const login = async (token: string) => {
        await setAuthToken(token);
        axiosInstance.defaults.headers.common['Authorization'] = token;
        setTokenState(token);
    };

    const logout = async () => {
        delete axiosInstance.defaults.headers.common['Authorization'];
        const enroll = await AsyncStorage.getItem("enroll")
        await axiosInstance.post("/students/removeExpoPushToken", {enroll});
        setTokenState(null);
        await removeAuthToken();
        router.replace("/(auth)/login");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
