import {
  StyleSheet, Text, View,
  SafeAreaView, StatusBar,
  ScrollView, Image, TextInput,
  Alert, TouchableOpacity
} from 'react-native'
import React, { useEffect } from 'react'
import images from '../../assets/images/images'
import { colors } from '../../styles/colors'
import ButtonFull from '../../components/ButtonFull'
import buttons from '../../styles/buttons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const OTP = ({ route, navigation }: any) => {
  const { phoneNumber } = route.params


  const [otp, setOtp] = React.useState<number>()
  const [isValidOtp, setIsValidOtp] = React.useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
  const [buttonText, setButtonText] = React.useState<string>('Verify OTP')

  useEffect(() => {
    setIsValidOtp(otp?.toString().length === 6 ? true : false)
  }, [otp])


  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={{ padding: 20 }}>
        <View style={styles.top} >
          <Image source={images.two_step_verify} style={styles.topImage} />
        </View>
        <Text style={styles.title}>OTP Verification</Text>
        <TextInput
          style={styles.otpInput}
          placeholderTextColor={colors.textLighter}
          placeholder="Enter OTP"
          keyboardType="number-pad"
          value={otp?.toString() || ''}
          onChangeText={handelOtpInput}
          maxLength={6}
        // autoFocus={true}
        />

        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: colors.textLight }}>OTP sent to {phoneNumber}.</Text>
          <TouchableOpacity onPress={() => { navigation.replace('LogIn') }}><Text style={{ color: colors.accent }}> Edit Number?</Text></TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer} >
          <TouchableOpacity
            style={[buttons.full,
            { opacity: isValidOtp ? 1 : 0.5, }]}
            onPress={handelOtpSubmit} activeOpacity={0.8}
            disabled={isValidOtp && !isSubmitting ? false : true}
          >
            <Text style={{ textAlign: 'center', fontSize: 15, color: 'white' }}>{buttonText}</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.textLight }}>Didn't receive OTP?</Text>
            <TouchableOpacity onPress={() => { }}><Text style={{ color: colors.accent }}> Resend OTP</Text></TouchableOpacity>
          </View>
        </View>

        {/* <Text style={{ textAlign: 'center', color: colors.text, marginTop: 20 }}>
          By continuing, you agree to our <Text style={{ color: colors.accent }}>Terms of Service</Text> and <Text style={{ color: colors.accent }}>Privacy Policy</Text>
        </Text> */}
      </ScrollView>
    </SafeAreaView>
  )
  function handelOtpSubmit() {
    // Alert
    // Alert.alert(otp?.toString() || 'No OTP')
    // Submit
    submit()
  }
  function handelOtpInput(text: string) {
    text ? setOtp(parseInt(text)) : setOtp(undefined)
    // If OTP length is 6 then submit
    if (text.length === 6) {
      submit()
    }
  }

  function submit() {
    setButtonText('Verifying...')
    setIsSubmitting(true)
    setTimeout(async () => {
      // Reset the button text and isSubmitting
      setButtonText('Verify OTP')
      setIsSubmitting(false)
      // Alert.alert('Wrong OTP', 'Please enter correct OTP')
      // set isLoggedIn to true
      await AsyncStorage.setItem('isLoggedIn', 'true')
      navigation.replace('Home')
    }, 2000);
    // Alert.alert('Submitting OTP')
  }
}



export default OTP

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    // padding: 20,
  },
  top: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topImage: {
    height: 300,
    // maxHeight: 300,
    // minHeight: 100,
    width: '100%', resizeMode: 'contain',
    // marginTop: 10
    // backgroundColor : 'red'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginTop: 30,
  }
  ,
  otpInput: {
    backgroundColor: colors.inputBg,
    color: colors.text,
    padding: 15,
    textAlign: 'center',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    borderRadius: 14,
    fontSize: 18,
  },
  buttonsContainer: {
    display: 'flex',
    gap: 20,
    marginTop: 50,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})