import {
  SafeAreaView,
  StyleSheet, ScrollView,
  Text, View, Image, Button,
  StatusBar, TextInput,
  TouchableOpacity, Modal,
} from 'react-native'
import React, { useState } from 'react'

// import { TextInput } from 'react-native/Libraries/Components/TextInput/TextInput'
import icons from '../../assets/icons/icons'
import images from '../../assets/images/images'
import { colors } from '../../styles/colors'
import ButtonFull from '../../components/ButtonFull'
import { Alert } from 'react-native'
import buttons from '../../styles/buttons'
import styles from './styles'
import { API_URL } from '../../api'


// import { StatusBar } from 'react-native/Libraries/Components/StatusBar/StatusBar'

const Login = ({ navigation }: any) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [isSendingOTP, setIsSendingOTP] = useState<boolean>(false)
  const [isSendingOTPText, setIsSendingOTPText] = useState<string>('Send OTP')

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.topContainer}>
          <Image source={images.log_in} style={styles.topImage} />
          <Text style={styles.title}>Log In to Win Karo</Text>
          <Text style={styles.description}>Log In to Win Karo to watch and win</Text>
        </View>

        <View style={styles.inputContainer}>


          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.singleInputContainer}>
            <Image source={icons.mobile_solid} style={[styles.inputImage, { width: 23, height: 23 }]} />
            <TextInput
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              placeholderTextColor={colors.textLighter}
              style={styles.input}
              placeholder="eg. 9876543210"
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          {/* <Text style={styles.label}>Your Password</Text>
          <View style={styles.singleInputContainer}>
            <Image source={icons.lock_solid} style={[styles.inputImage,]} />
            <TextInput
              placeholderTextColor={colors.textLighter}
              style={styles.input}
              placeholder="Enter password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View> */}



          <View style={{ marginTop: 20 }}>
            <ButtonFull title={isSendingOTPText} cb={handleLogin} disabled={isSendingOTP} />
          </View>

          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.textLight }}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
              <Text style={{ color: colors.accent }}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <View>
            <TouchableOpacity onPress={() => navigation.replace('SignUp')} activeOpacity={0.9}>
            <Text style={buttons.button}>Sign Up?</Text>
            </TouchableOpacity>
            </View>
          </View> */}
          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.textLight }}>By Logging in you accept out </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
              <Text style={{ color: colors.accent }}>terms and conditions</Text>
            </TouchableOpacity>
          </View>

        </View>


      </ScrollView>
    </SafeAreaView>
  )
  function openModal() {

  }

  function handleLogin() {
    // If phone number length is not 10 then show error
    // Check if phone number is valid
    if (phoneNumber.length === 0) {
      Alert.alert('Enter Phone Number', 'Please enter a phone number which you have used to sign up.')
      return
    }

    if (phoneNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a 10 digit phone number.')
      return
    }

    if (isNaN(phoneNumber as any)) {
      Alert.alert('Error', 'Please enter a valid phone number')
      return
    }

    // Send OTP
    setIsSendingOTP(true)
    setIsSendingOTPText('Sending OTP...')
    // Send OTP to phone number
    // create a form data object
    const formData = new FormData()
    formData.append('phone', phoneNumber)
    // Send OTP
    fetch(API_URL.login, {
      method: 'POST',
      body: formData
    }).then((res) => res.json()).then((res) => {
      console.log(res)
      if (res.status === true || res.status === 'true') {
        navigation.replace('OTP', { phone: phoneNumber })
      } else {
        Alert.alert('Error', res.message)
        setIsSendingOTP(false)
        setIsSendingOTPText('Send OTP')
        return
      }
    }).catch((err) => {
      console.log(err)
      setIsSendingOTP(false)
      setIsSendingOTPText('Send OTP')
      Alert.alert('Network Error', 'Something went wrong. Please Check your internet connection and try again.')
    })
  }
}

export default Login

