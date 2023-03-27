import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Alert, Image, StatusBar, StyleSheet, Text, View, BackHandler } from 'react-native';
import { API_URL } from '../appData';
import icons from '../assets/icons/icons';
import CustomModal from '../components/CustomModal';
import Loading from '../components/Loading';
import { colors } from '../styles/colors';
import { networkError } from './lib';
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
    }, 0)
  }, []);
  const [modals, setModals] = React.useState<any>([])

  return (
    <View style={styles.main}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <CustomModal modals={modals} updater={setModals} />
      <View style={styles.center}>
        <View>
          <Image source={icons.logo} style={styles.logo} />
        </View>
        {/* <View style={{
          width: '100%', marginTop: 50, backgroundColor: 'red',
        }}>
          <Loading />
        </View> */}
        <Text style={{
          color: colors.gray, marginTop: 15
        }}>Connecting...</Text>

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
    backgroundColor: 'white',
  },
  center: {
    // display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  logo: {
    // flex: 0.5,
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'contain',
  }
})