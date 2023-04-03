import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import images from '../../assets/images/images'
import { fonts } from '../../styles/fonts'
import ButtonFull from '../../components/ButtonFull'
import { colors } from '../../styles/colors'
import changeNavigationBarColor, {hideNavigationBar} from 'react-native-navigation-bar-color';


export default function Spin() {
  const spinArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const { width, height } = Dimensions.get('window')


  useEffect(() => {
    // setTimeout(async () => {
    //   try {
    //     await changeNavigationBarColor('#012759', true);
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }, 0);
    hideNavigationBar();
  }, [])
  return (
    <View style={{
      flex: 1, backgroundColor: '#012759', alignItems: 'center', justifyContent: 'space-between'
    }}>
      <StatusBar backgroundColor="#012759" barStyle="light-content" />
      <View>
        <Text style={{ fontSize: 25, fontFamily: fonts.semiBold, textAlign: 'center', marginTop: 20, color: colors.text, opacity: 0.8 }}>Spin and Earn</Text>
      </View>
      <View>
        <Image source={images.spinWheel} style={{
          width: width * (4 / 5) - 20, height: width * (4 / 5) - 20, borderRadius: (width * (4 / 5) - 20) / 2, borderWidth: 2, borderColor: 'white'
        }} />
      </View>
      <View style={{ padding: 20, width: width }}>
        <ButtonFull title="Spin and Win" onPress={() => { }} />
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