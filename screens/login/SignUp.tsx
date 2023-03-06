import {
  SafeAreaView,
  StyleSheet, ScrollView,
  Text, View, Image,
  StatusBar, TextInput,
  TouchableOpacity
} from 'react-native'
import React, {
  useState
} from 'react'

// import { TextInput } from 'react-native/Libraries/Components/TextInput/TextInput'
import icons from '../../assets/icons/icons'
import images from '../../assets/images/images'
import { colors } from '../../styles/colors'
import ButtonFull from '../../components/ButtonFull'
import { Alert } from 'react-native'
import buttons from '../../styles/buttons'
import styles from './styles'

const SignUp = ({ navigation }: any) => {

  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.topContainer}>
          <Image source={images.sign_up} style={[styles.topImage, {height : 200}]} />
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
            />
          </View>

          <Text style={styles.label}>Your Username</Text>
          <View style={styles.singleInputContainer}>
            <Image source={icons.at} style={[styles.inputImage, { width: 23, height: 23 }]} />
            <TextInput
              placeholderTextColor={colors.textLighter}

              style={styles.input}
              placeholder="eg. johnDoe"
              keyboardType="default"
            />
          </View>

          <Text style={styles.label}>Your Email</Text>
          <View style={styles.singleInputContainer}>
            <Image source={icons.message} style={[styles.inputImage]} />
            <TextInput
              placeholderTextColor={colors.textLighter}

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

              style={styles.input}
              placeholder="eg. FD5K24"
              keyboardType="default"
            />
          </View>


          <View style={{ marginTop: 20 }}>
            <ButtonFull title='Create Account' cb={() => { }} />
          </View>

          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color : colors.textLight}}>Already have an account </Text>
            <TouchableOpacity onPress={() => navigation.replace('LogIn')}>
              <Text style={{ color: colors.accent }}>Log In</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <View>
              <TouchableOpacity onPress={() => navigation.replace('LogIn')} activeOpacity={0.8}>
                <Text style={buttons.button}>Log In?</Text>
              </TouchableOpacity>
            </View>
          </View> */}
                    <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.textLight }}>By Signing up in you accept out </Text>
            <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
              <Text style={{ color: colors.accent }}>terms and conditions</Text>
            </TouchableOpacity>
          </View>


        </View>

      </ScrollView>
    </SafeAreaView >
  )
}

export default SignUp

// const styles = StyleSheet.create({
//   topContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     // alignItems: 'center',
//     padding: 20,
//     gap: 5,
//     width: '100%'
//   },
//   topImage: {
//     height: 250,
//     width: '80%',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     resizeMode: 'contain',
//     flex: 0.5,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: colors.text,
//     fontFamily: 'Rubik'
//   },
//   description: {
//     fontSize: 15,
//     color: colors.textLight

//   },
//   main: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   inputContainer: {
//     padding: 20,
//     width: '100%',
//     gap: 5,
//   },
//   singleInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: colors.inputBg,
//     paddingLeft: 10,
//     borderRadius: 10,
//     width: 'auto',
//   },
//   inputImage: {
//     width: 17,
//     height: 17,
//     resizeMode: 'contain', flex: 0.1, opacity: 0.5
//   },
//   input: {
//     backgroundColor: colors.inputBg,
//     borderRadius: 10,
//     padding: 15,
//     width: 'auto',
//     flex: 0.9
//   },
//   label: {
//     color: colors.textLight,
//     fontSize: 15,
//     // fontWeight: 'bold',
//     marginTop: 7
//   },
// })