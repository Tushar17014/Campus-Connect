import { View } from 'react-native'
import React from 'react'

const Separator = ({className} : {className?: string}) => {
  return (
    <View className={`h-[1px] bg-gray-500 ${className}`}/>
  )
}

export default Separator