import React, { useEffect, useState } from 'react'
import {
  Image, SafeAreaView, ScrollView, StatusBar, Text, TextInput,
  TouchableOpacity, View
} from 'react-native'
import DeviceInfo from 'react-native-device-info'
// import { TextInput } from 'react-native/Libraries/Components/TextInput/TextInput'
import { Alert } from 'react-native'
import { API_URL } from '../../api'
import icons from '../../assets/icons/icons'
import images from '../../assets/images/images'
import ButtonFull from '../../components/ButtonFull'
import { colors } from '../../styles/colors'
import styles from './styles'

const SignUp = ({ navigation }: any) => {
  let [deviceName, setDeviceName] = useState('')
  let [mobileNumber, setMobileNumber] = useState('')
  let [email, setEmail] = useState('')
  let [name, setName] = useState('')
  let [referCode, setReferCode] = useState('')
  let [isCreatingAccount, setIsCreatingAccount] = useState(false)
  let [buttonText, setButtonText] = useState('Create Account')

  useEffect(() => {
    DeviceInfo.getDeviceName().then(name => { setDeviceName(name) });
  }, [])

  function createAccount() {
    // Check if all fields are filled except refer code
    if (!name || name.length < 3)
      return Alert.alert('Warning!', 'Please enter your name (min 3 characters)')
    if (!email)
      return Alert.alert('Warning!', 'Please enter your email')
    if (!mobileNumber)
      return Alert.alert('Warning!', 'Please enter your mobile number')
    if (mobileNumber.length != 10)
      return Alert.alert('Warning!', 'Please enter a valid mobile number')

    setIsCreatingAccount(true)
    setButtonText('Creating Account...')
    // Create account
    // Crate a form data
    let formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', mobileNumber)
    formData.append('device_name', deviceName)
    formData.append('refer_code', referCode)

    fetch(API_URL.register, {
      method: 'POST',
      body: formData
    }).then(res => res.json()).then(res => {
      console.log(res)
      setIsCreatingAccount(false)
      if (res.status == true || res.status == 'true') {
        // Navigate to Verify OTP screen
        navigation.replace('OTP', {
          phone: mobileNumber,
          signUp: true
        })
      } else {
        Alert.alert('Error', res.message)
        setIsCreatingAccount(false)
        setButtonText('Create Account')
      }
    }).catch(err => {
      console.log(err)
      setIsCreatingAccount(false)
      setButtonText('Create Account')
      Alert.alert('Network Error', 'Something went wrong. Please Check your internet connection and try again.')
    })
  }



  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.topContainer}>
          <Image source={images.sign_up} style={[styles.topImage, { height: 200 }]} />
          <Text style={styles.title}>Sign Up to Win Karo</Text>
          <Text style={styles.description}>Sign Up to Win Karo to watch and win</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Name</Text>
          <View style={styles.singleInputContainer}>
            <Image source={icons.profile} style={styles.inputImage} />
            <TextInput
              placeholderTextColor={colors.textLighter}
              style={styles.input}
              placeholder="eg. John Doe"
              keyboardType="default"
              onChangeText={(text) => setName(text)}
            />
          </View>

          {/* <Text style={styles.label}>Your Username</Text>
          <View style={styles.singleInputContainer}>
            <Image source={icons.at} style={[styles.inputImage, { width: 23, height: 23 }]} />
            <TextInput
              placeholderTextColor={colors.textLighter}

              style={styles.input}
              placeholder="eg. johnDoe"
              keyboardType="default"
            />
          </View> */}

          <Text style={styles.label}>Your Email</Text>
          <View style={styles.singleInputContainer}>
            <Image source={icons.message} style={[styles.inputImage]} />
            <TextInput
              placeholderTextColor={colors.textLighter}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholder="eg. johnDoe@gmail.com"
              keyboardType="email-address"
            />
          </View>

          <Text style={styles.label}>Your Mobile Number</Text>
          <View style={styles.singleInputContainer}>
            <Image source={icons.mobile_solid} style={[styles.inputImage, { width: 20, height: 20 }]} />
            <TextInput
              placeholderTextColor={colors.textLighter}
              maxLength={10}
              style={styles.input}
              placeholder="eg. 987654321"
              keyboardType="phone-pad"
              onChangeText={(text) => setMobileNumber(text)}
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
          <Text style={styles.label}>Refer Code <Text style={{ color: '#aaa' }}>(optional)</Text></Text>
          <View style={styles.singleInputContainer}>
            <Image source={icons.export} style={[styles.inputImage, { width: 20, height: 20 }]} />
            <TextInput
              placeholderTextColor={colors.textLighter}
              onChangeText={(text) => setReferCode(text)}
              style={styles.input}
              placeholder="eg. FD5K24"
              keyboardType="default"
            />
          </View>


          <View style={{ marginTop: 20 }}>
            <ButtonFull title={buttonText} cb={createAccount} disabled={isCreatingAccount} />
          </View>

          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.textLight }}>Already have an account </Text>
            <TouchableOpacity onPress={() => navigation.replace('LogIn')}>
              <Text style={{ color: colors.accent }}>Log In</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.textLight }}>By Signing up in you accept out </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
              <Text style={{ color: colors.accent }}>terms and conditions</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}

export default SignUp