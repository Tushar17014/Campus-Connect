import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '~/context/authProvider'
import CustomButton from '~/components/customButton'

const Dashboard = () => {
  const {logout} = useAuth();

  return (
    <SafeAreaView className="flex items-center justify-center h-full bg-black p-5 w-full">
      <Text className="text-3xl mb-5 text-white">Welcome to Campus Connect</Text>
      <CustomButton title='Logout' onPress={logout} bgVariant='danger' textVariant='danger'/>
    </SafeAreaView>
  )
}

export default Dashboard