import { StudentData } from "../models/studentData.model.js";
import { Expo } from "expo-server-sdk";
const expo = new Expo();

export const sendNotification = async (expoPushToken, title, message) => {
    if (!expoPushToken || !Expo.isExpoPushToken(expoPushToken)) {
        console.error("Invalid Expo push token:", expoPushToken);
        return;
    }

    const notification = {
        to: expoPushToken,
        sound: "default",
        title: title,
        body: message,
        data: { extraData: "Some extra data" },
    };

    try {
        const ticket = await expo.sendPushNotificationsAsync([notification]);
    } catch (error) {
        console.error("Error sending push notification:", error);
    }
};

export async function saveExpoPustToken(req, res) {
    try {
        const { enroll, expoPushToken } = req.body;

        if (!enroll || !expoPushToken) {
            return res.status(400).json({ error: "User ID and Token are required" });
        }


        const data = await StudentData.findOneAndUpdate(
            { enroll: parseInt(enroll) },
            { expoPushToken },
            { upsert: true, new: true }
        );


        return res.status(200).json({ message: "Token stored successfully" });
    } catch (err) {
        console.error(err.message);
    }
}
export async function removeExpoPushToken(req, res) {
    try {
        const { enroll } = req.body;

        if (!enroll) {
            return res.status(400).json({ error: "Enrollment Number is required" });
        }
        
        const data = await StudentData.updateOne(
            { enroll: parseInt(enroll) },
            { $unset: { expoPushToken: 1 } }
        );


        return res.status(200).json({ message: "Token removed successfully" });
    } catch (err) {
        console.error(err.message);
    }
}