import { Alert, Image, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputField from '~/components/inputField'
import CustomButton from '~/components/customButton'
import Separator from '~/components/separator'
import { StudentLogin } from '~/api/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'

const Login = () => {
    const [enroll, setEnroll] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        if(!enroll || !password){
            Alert.alert("Please fill all the fields");
            return ;
        }
        setLoading(true);
        try{
            const res = await StudentLogin(parseInt(enroll), password);
            if(res?.statusCode == 200){
                await AsyncStorage.setItem("token", res.data?.token);
                await AsyncStorage.setItem("enroll", enroll);   
                router.replace("/(root)/(tabs)/dashboard");
            }
            else{
                Toast.show({ type: "error", text1: "Login Failed", text2: "Invalid credentials!" });
            }
        } catch(error: any){
            console.error("Error: ", error.message);
        }
    };

    return (
        <SafeAreaView className='flex h-full w-full items-center justify-center bg-black'>
            <View className='flex justify-center border border-gray-800 rounded-lg p-5 shadow-white'>
                <View className="flex flex-row items-center gap-5">
                    <Image source={require("~/assets/logo.png")} style={{ width: 60, height: 60 }} />
                    <Text className="font-medium text-3xl text-white">Campus Connect</Text>
                </View>
                <Separator className='mt-5' />
                <View className='p-5'>
                    <InputField
                        label="Enroll"
                        placeholder="Enrollment Number"
                        onChangeText={setEnroll}
                        keyboardType='number-pad'
                        maxLength={4}
                    />
                    <InputField
                        label="Password"
                        secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={setPassword}
                    />
                    <CustomButton title='Login' className='mt-5' onPress={handleLogin}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login