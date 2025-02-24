import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

const Layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </>
  );
};

export default Layout;

