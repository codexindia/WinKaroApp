import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import images from '../../assets/images/images'
import { fonts } from '../../styles/fonts'

export default function Spin() {
  const spinArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const { width, height } = Dimensions.get('window')
  return (
    <View style={{
      flex: 1, backgroundColor: '#5a0b42', alignItems: 'center', justifyContent: 'space-between'
    }}>
      <StatusBar backgroundColor="#5a0b42" barStyle="light-content" />
      <View>
        <Text style={{ fontSize: 25, fontFamily: fonts.semiBold, textAlign: 'center', marginTop: 20, color: 'white', opacity: 0.8 }}>Spin and Earn</Text>
      </View>
      <View>
        <Image source={images.spinWheel} style={{
          width: width * (4 / 5) - 20, height: width * (4 / 5) - 20, borderRadius: (width * (4 / 5) - 20) / 2, borderWidth: 2, borderColor: 'white'
        }} />
      </View>
      <View>
        <TouchableOpacity activeOpacity={0.8}>
          <View style={{
            backgroundColor: '#9c1e47', width: width / 2, borderRadius: 15
          }}>
            <Text style={{
              color: 'white', fontSize: 16, fontFamily: fonts.medium, textAlign: 'center', padding: 20
            }}>Spin</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>

      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  box: {
    width: 100, height: 100,
    backgroundColor: 'red',
  }
})