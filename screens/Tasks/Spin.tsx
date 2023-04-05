import {
  Alert, Animated, Dimensions, Easing, Image, StatusBar,
  StyleSheet, Text, TouchableOpacity, View, BackHandler
} from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../../assets/images/images'
import { fonts } from '../../styles/fonts'
import ButtonFull from '../../components/ButtonFull'
import { colors } from '../../styles/colors'
import changeNavigationBarColor, { hideNavigationBar } from 'react-native-navigation-bar-color';
import icons from '../../assets/icons/icons'


  
const SPIN_DURATION = 7000


export default function Spin({ navigation }: any) {
  const spinArr = [6, 7, 8, 9, 10, 6, 7, 8]
  const { width, height } = Dimensions.get('window')
  const [isSpinning, setIsSpinning] = useState(false)
  const [isSpinningFinished, setIsSpinningFinished] = useState(false)
  const [earnedCoins, setEarnedCoins] = useState(0)
  const [buttonText, setButtonText] = useState('Test your luck')


  const imageWidth = width * (4 / 5)
  const extraWidth = width * (1 / 5)
  const deg = 360 / spinArr.length
  const [rotateValue, setRotateValue] = useState(new Animated.Value(0));

  const [rotate, setRotate] = useState(rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  }))

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Home')
      changeNavigationBarColor('#ffffff', true);
      return true
    })
  }, [])


  function spinWheel() {
    const random = Math.floor(Math.random() * spinArr.length)
    const result = spinArr[random]
    const randomDeg = random * deg
    // Alert.alert('You won', `${result} coins`)


    setIsSpinning(true)

    rotateValue.setValue(0)
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: SPIN_DURATION,
      useNativeDriver: false,
      easing: Easing.elastic(2),
    }).start()

    setRotate(rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg',
        `${360 * 2 + randomDeg}deg`
      ]
    }))
    setTimeout(() => {
      setIsSpinning(false)
      setEarnedCoins(result)
      setIsSpinningFinished(true)
      setButtonText('Watch ad to claim')
    }, SPIN_DURATION - 1000)
  }


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


        <Animated.View style={{
          transform: [{ rotate: rotate }],
        }}>

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
                  }}
                    key={index}
                  >
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
        </Animated.View>
      </View>

      <View style={{
        opacity: earnedCoins == 0 ? 0 : 1,
      }}>
        <Text style={{ fontSize: 16, color: 'white', fontFamily: fonts.medium, textAlign: 'center' }}>You own 8 coins</Text>
      </View>


      <View style={{ padding: 20, width: width, opacity: isSpinning ? 0 : 1 }}>
        {
          <ButtonFull title={buttonText}
            disabled={isSpinning}
            cb={() => {
              return isSpinningFinished ? watchAdToClaim(navigation, earnedCoins) : spinWheel()
            }} />
        }
      </View>
    </View >
  )
}
function watchAdToClaim(navigation: any, earnedCoins: number) {
  navigation.navigate('RewardAd', {
    earnedCoins: earnedCoins
  })
  console.log('watch ad to claim')
}

const styles = StyleSheet.create({
  box: {
    width: 100, height: 100,
    backgroundColor: 'red',
  }
})