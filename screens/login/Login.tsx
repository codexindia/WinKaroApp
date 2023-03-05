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


          <Text style={styles.label}>Your Username</Text>
          <View style={styles.singleInputContainer}>
            <Image source={icons.at} style={[styles.inputImage, { width: 23, height: 23 }]} />
            <TextInput
              style={styles.input}
              placeholder="eg. johnDoe"
              keyboardType="default"
            />
          </View>

          <Text style={styles.label}>Your Password</Text>
          <View style={styles.singleInputContainer}>
            <Image source={icons.lock_solid} style={[styles.inputImage,]} />
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>



          <View style={{ marginTop: 20 }}>
            <ButtonFull title='Log In' cb={() => { navigation.replace('Home') }} />
          </View>

          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
            <Text>Don't an account? </Text>
          </View>

          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <View>
              <TouchableOpacity onPress={() => navigation.replace('SignUp')} activeOpacity={0.9}>
                <Text style={buttons.button}>Sign Up?</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  topContainer: {
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    gap: 5,
    width: '100%'
  },
  topImage: {
    height: 300,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'contain',
    flex: 0.5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'Rubik'
  },
  description: {
    fontSize: 15,
    color: colors.textLight

  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    padding: 20,
    width: '100%',
    gap: 5,
  },
  singleInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.inputBg,
    paddingLeft: 10,
    borderRadius: 10,
    width: 'auto',
  },
  inputImage: {
    width: 17,
    height: 17,
    resizeMode: 'contain', flex: 0.1, opacity: 0.5
  },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    padding: 15,
    width: 'auto',
    flex: 0.9
  },
  label: {
    color: colors.textLight,
    fontSize: 15,
    // fontWeight: 'bold',
    marginTop: 7
  },
})