import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import icons from '../assets/icons/icons';
import { colors } from '../styles/colors';
// import { AsyncStorage } from 'react-native';
const Splash = ({ navigation }: any) => {

  useEffect(() => {
    setTimeout(async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
      const isOnboarding = await AsyncStorage.getItem('onboarding')
      if (isLoggedIn === 'true') {
        navigation.navigate('Home')
      }
      else if (isOnboarding === 'true') {
        navigation.replace('LogIn')
      }
      else {
        navigation.replace('Onboarding')
      }
    }, 0)
  }, []);
  return (
    <View style={styles.main}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.center}>
        <Image source={icons.logo} style={styles.logo} />
        {/* <Text style={{ fontSize: 30, fontWeight: 'bold', color: colors.text, marginTop: 20 }}>Win Karo</Text> */}
      </View>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: 'white',
    // backgroundColor: colors.accent
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    flex: 0.5,
    width: 200,
    height: 200,
    borderRadius: 100,
  }
})