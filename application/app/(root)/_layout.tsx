import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from '~/context/authProvider';

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token, loading } = useAuth();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem("token");
            setAuthenticated(!!token);
        };
        checkAuth();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    if (!authenticated) return <Redirect href="/login" />;
    return <>{children}</>;
};

const Layout = () => {
    return (
        <AuthProvider>
            <AuthWrapper>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </AuthWrapper>
        </AuthProvider>
    );
};

export default Layout;

