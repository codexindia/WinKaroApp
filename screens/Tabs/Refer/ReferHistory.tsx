import {
  StyleSheet, Text,
  View, Image, Dimensions
} from 'react-native'
import React from 'react'
import icons from '../../../assets/icons/icons'
import { fonts } from '../../../styles/fonts'
import { colors } from '../../../styles/colors'



const { width, height } = Dimensions.get('window')


const ReferHistory = () => {
  return (
    <View className='bg-white flex-1'>
      <View className='p-4 pt-1'>
        <ReferAccount />
        <ReferAccount />
      </View>
    </View>
  )
}


function ReferAccount() {
  return <View className='flex-row p-5 mt-4 justify-between items-center' style={{
    backgroundColor: '#fafafa', borderRadius: 20, borderColor: '#e5e5e5', borderWidth: 0.5
  }}>

    <View className='flex-row items-center'>
      <View>
        <Image source={icons.user_icon} style={{ height: 50, aspectRatio: 1, resizeMode: 'contain', }} />
      </View>
      <View className='pl-5 justify-center gap-1'>
        <Text style={{ fontFamily: fonts.medium, color: colors.text, fontSize: 16 }}>Abinash Karmakar</Text>
        <View className='flex-row justify-between' style={{}}>
          <View className='flex-row justify-center items-center gap-1'>
            <Image source={icons.coins} style={{ height: 20, width: 20, aspectRatio: 1, resizeMode: 'contain', }} />
            <Text style={{ fontFamily: fonts.medium, color: colors.text, fontSize: 14, }}>50 earned</Text>
          </View>
          <View>
          </View>
        </View>
      </View>
    </View>

    <View>
      <Text style={{ fontFamily: fonts.medium, color: colors.textLight, fontSize: 12, textAlign: 'right' }}>{(new Date()).toLocaleDateString() + '\n'} {new Date().toLocaleTimeString()}</Text>
    </View>
  </View>
}


export default ReferHistory

const styles = StyleSheet.create({})