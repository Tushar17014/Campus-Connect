import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAuthToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (error) {
        console.error('Error saving auth token:', error);
    }
};

export const getAuthToken = async () => {
    try {
        return await AsyncStorage.getItem('token');
    } catch (error) {
        console.error('Error retrieving auth token:', error);
        return null;
    }
};

export const removeAuthToken = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error('Error removing auth token:', error);
    }
};
