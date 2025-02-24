import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as Notifications from "expo-notifications";
import { axiosInstance } from "~/lib/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function registerForPushNotificationsAsync() {
  const enroll = await AsyncStorage.getItem("enroll");

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for notifications!");
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;

  await axiosInstance.post("/students/saveExpoPushToken", { enroll, expoPushToken: token });

  return token;
}

const Layout = () => {

  useEffect(() => {
    const enableNotifications = async () => {
      const userToken = await AsyncStorage.getItem("token");
      if (userToken) {
        await registerForPushNotificationsAsync();
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: true,
          }),
        });
      }
    };
    enableNotifications();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
