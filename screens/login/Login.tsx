import {
  SafeAreaView,
  StyleSheet, ScrollView,
  Text, View, Image,
  StatusBar, TextInput,
  TouchableOpacity
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
// import { StatusBar } from 'react-native/Libraries/Components/StatusBar/StatusBar'

const Login = ({ navigation }: any) => {
  const [password, setPassword] = useState('');
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
              placeholderTextColor={colors.textLighter}
              style={styles.input}
              placeholder="eg. 9876543210"
              keyboardType="phone-pad"
              maxLength={6}
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
            <ButtonFull title='Send OTP' cb={handleLogin} />
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
            <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
              <Text style={{ color: colors.accent }}>terms and conditions</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  )

  function handleLogin() {
    // Alert.alert('Login', 'Login button pressed')
    navigation.navigate('OTP')

  }
}

export default Login

