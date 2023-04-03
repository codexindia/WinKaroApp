import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import images from '../../assets/images/images'
import { fonts } from '../../styles/fonts'
import ButtonFull from '../../components/ButtonFull'
import { colors } from '../../styles/colors'
import changeNavigationBarColor, { hideNavigationBar } from 'react-native-navigation-bar-color';
import icons from '../../assets/icons/icons'


export default function Spin({ navigation }: any) {
  const spinArr = [6, 7, 8, 9, 10, 6, 7, 8]
  const { width, height } = Dimensions.get('window')

  const imageWidth = width * (4 / 5)
  const extraWidth = width * (1 / 5)
  const deg = 360 / spinArr.length

  useEffect(() => {
    setTimeout(async () => {
      try {
        await changeNavigationBarColor('#012759', true);
      } catch (e) {
        console.log(e)
      }
    }, 0);
  }, [])
  return (
    <View style={{
      flex: 1, backgroundColor: '#012759', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10,
    }}>
      <StatusBar backgroundColor="#012759" barStyle="light-content" />
      <View>
        <Text style={{ fontSize: 25, fontFamily: fonts.semiBold, textAlign: 'center', marginTop: 20, color: 'white', opacity: 0.8 }}>Spin and Earn</Text>
      </View>
      <View style={{
        position: 'relative', width: '100%',
      }}>
        <View style={{
          marginLeft: 'auto', marginRight: 'auto',
          position: 'absolute',
          left: (width / 2) - 35,
          top: -35,
          zIndex: 100,
        }}>
          <Image source={icons.pin} style={{
            width: 65, height: 65, tintColor: 'white',
            justifyContent: 'center', alignItems: 'center',
          }} />
        </View>
        <Image source={images.spinWheel} style={{
          zIndex: 10, marginLeft: 'auto', marginRight: 'auto',
          width: imageWidth, height: imageWidth, borderRadius: (imageWidth) / 2, borderWidth: 2,
          borderColor: 'white', transform: [{ rotate: '10deg' }]
        }} />
        <View style={{
          position: 'absolute', top: 0,
          //  left: imageWidth / 2 - (width - imageWidth) / 2,
          left: extraWidth / 2,
          width: imageWidth, height: imageWidth,
          borderRadius: (imageWidth) / 2,
          justifyContent: 'center', alignItems: 'center', zIndex: 20, transform: [{ rotate: '-90deg' }]
        }}>
          {
            spinArr.map((item, index) => {
              return (
                <View style={{
                  position: 'absolute',
                  top: (imageWidth / 2) - 25,
                  left: (imageWidth / 2) - 10,
                  width: 20, height: 20,
                  transform: [
                    { rotate: `${index * deg}deg` },
                    { translateX: (imageWidth / 2 - 25) - 20 },
                    { rotate: `${-index * deg}deg` },
                  ]
                }}>
                  <View style={{
                    flexDirection: 'column', alignItems: 'center', gap: 5,
                    transform: [
                      { rotate: `${index * deg + 90}deg` }
                    ]
                  }}>
                    <Text style={{
                      fontSize: 20, fontFamily: fonts.semiBold, color: index % 2 == 0 ? 'black' : 'white',
                      // Make the text no wrap
                    }}>{item}</Text>
                    <Image source={icons.coin_dollar} style={{
                      width: 20, height: 20,
                      transform: [
                        { rotate: `${index * deg + 90}deg` }
                      ]
                    }} />
                  </View>
                </View>
              )
            })
          }

        </View>

      </View>
      <View style={{ padding: 20, width: width }}>
        <ButtonFull title="Test your Luck" onPress={() => { }} />
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