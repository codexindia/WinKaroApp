import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Easing, StatusBar, StyleSheet, Text, View } from 'react-native';
import { API_URL } from '../appData';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';
import CustomModal from '../components/CustomModal';
// import { AsyncStorage } from 'react-native';

async function storeUserData(res: any) {
  const userData = {
    name: res.data.name,
    email: res.data.email,
    phone: res.data.phone,
    refer_code: res.data.refer_code,
  }
  await AsyncStorage.setItem('userData', JSON.stringify(userData))
  console.log('User data is stored in AsyncStorage')
}

async function unexpectedLoggedOut(navigation: any, setModals: Function) {
  setModals([{ title: 'Error', description: 'Unexpectedly logged out from the app. Please login again.' }])
  await AsyncStorage.removeItem('isLoggedIn')
  navigation.replace('LogIn')
}




const Splash = ({ navigation }: any) => {

  async function mainProcess() {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
    const isOnboarding = await AsyncStorage.getItem('onboarding')
    if (isLoggedIn === 'true') {
      const token = await AsyncStorage.getItem('token')
      const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + token }
      try {
        const fetched = await fetch(API_URL.get_user, { method: 'POST', headers })
        const res = await fetched.json()

        console.log(res)

        if (res.status === true || res.status === 'true') {
          await storeUserData(res)
          navigation.replace('Home')
        }
        else {
          // Show error message
          await unexpectedLoggedOut(navigation, setModals)
        }
      }
      catch (err) {
        setModals([{ title: 'Network Error', message: 'Please check your internet connection and try again' }])
      }
    }
    else if (isOnboarding === 'true') {
      navigation.replace('LogIn')
    }
    else {
      navigation.replace('Onboarding')
    }
  }
  useEffect(() => {
    setTimeout(async () => {
      mainProcess() 
    }, 3000)
  }, []);
  const [modals, setModals] = React.useState<any>([])

  // return (
  //   <View style={styles.main}>
  //     <StatusBar backgroundColor="white" barStyle="dark-content" />
  //     <CustomModal modals={modals} updater={setModals} />
  //     <View style={styles.center}>
  //       <View style={{
  //         // display: 'flex', justifyContent: 'center', alignItems: 'center',
  //         // width: 50, height: 50, overflow: 'hidden', borderRadius: 50
  //       }}>
  //         <Image source={icons.logo} style={styles.logo} />
  //       </View>
  //       {/* <Text style={{
  //         color: colors.gray, marginTop: 15
  //       }}>Connecting...</Text> */}
  //     </View>
  //   </View>
  // )
  // Animation takes total 4 seconds
  const [size] = useState(new Animated.ValueXY({ x: 15, y: 15 }));
  const [top] = useState(new Animated.Value(0));
  const [borderRadius] = useState(new Animated.Value(1000));
  const [isActive, setIsActive] = useState(false);
  const { height, width } = Dimensions.get('window');
  const [statusBarColor, setStatusBarColor] = useState('white')

  useEffect(() => {
    topAnimation()

    setTimeout(() => {
      sizeAnimation()
      Animated.timing(top, {
        toValue: 0,
        duration: 700,
        useNativeDriver: false,
      }).start();
    }, 1500);

    setTimeout(() => {
      Animated.timing(borderRadius, {
        toValue: 0,
        duration: 700,
        useNativeDriver: false,
      }).start();
    }, 1600);

    setTimeout(() => {
      setIsActive(true)
      setStatusBarColor(colors.accent)
    }, 2000);
  }, [])

  function topAnimation() {
    Animated.timing(top, {
      toValue: height / 2,
      duration: 1500,
      useNativeDriver: false,
      // Add bouncing effect
      easing: Easing.bounce,
    }).start();
  }
  function sizeAnimation() {
    Animated.timing(size, {
      toValue: { x: height, y: height },
      duration: 700,
      useNativeDriver: false,
    }).start();
  }
  return (
    <View style={{
      backgroundColor: 'white', flex: 1, justifyContent: "flex-start", alignItems: "center"
    }}>
      <StatusBar backgroundColor={statusBarColor} barStyle={statusBarColor === colors.accent ? "light-content" : "dark-content"} />
      <CustomModal modals={modals} updater={setModals} />

      <Animated.View style={{}}>
        <Animated.View style={{
          height: size.x, width: size.y, backgroundColor: colors.accent, borderRadius: borderRadius,
          top: top, display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}
        >

          <View style={{
            opacity: isActive ? 1 : 0, display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}>
            <Text style={{ color: 'white', fontSize: 100, fontFamily: fonts.semiBold, }}>WK</Text>
            <Text style={{
              color: 'white', fontSize: 25, fontFamily: fonts.medium,
            }}>Win Karo</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

export default Splash

// const styles = StyleSheet.create({
//   main: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   center: {
//     // display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%'
//   },
//   logo: {
//     // flex: 0.5,
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     resizeMode: 'contain',
//   }
// })