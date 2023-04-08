import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Alert, Image, Linking, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import icons from '../../../assets/icons/icons'
import { colors } from '../../../styles/colors'
import { fonts } from '../../../styles/fonts'
import { UserData } from '../../types'
import CustomModal from '../../../components/CustomModal'
import { launchImageLibrary } from 'react-native-image-picker'






const Profile = ({ navigation }: any) => {
  const options = [
    {
      title: 'Withdraw',
      icon: icons.cash,
      onPress: () => { navigation.navigate('Withdraw') }
    },
    {
      title: 'Promotion',
      icon: icons.promotion,
      onPress: () => { navigation.navigate('Promotions') }
    },
    {
      title: 'Refer & Earn',
      icon: icons.refer_ic,
      onPress: () => { navigation.navigate('ReferEarn') }
    },
    {
      title: 'Privacy policy',
      icon: icons.policy,
      onPress: () => { navigation.navigate('PrivacyPolicy') }
    },
    {
      title: 'Term & condition',
      icon: icons.terms_and_conditions,
      onPress: () => { navigation.navigate('Terms') }
    },
    {
      title: 'Rate us',
      icon: icons.favorite,
      onPress: () => { Linking.openURL('https://play.google.com/store/apps/details?id=com.earnmoneyapp') }
    },
    {
      title: 'About us',
      icon: icons.information_desk,
      onPress: () => { navigation.navigate('About') }
    },
    {
      title: 'Log out',
      icon: icons.logout,
      onPress: () => {
        setModalAlert([{
          title: "Log Out", description: "Are you sure you want to log out?", type: "success", active: true,
          buttons: [
            { text: "No" },
            {
              text: "Yes", positive: true, onPress: async () => {
                // await AsyncStorage.removeItem('token')
                // await AsyncStorage.removeItem('isLoggedIn')
                // Clear all data from AsyncStorage
                await AsyncStorage.clear()
                navigation.replace('LogIn')
              },
            },
          ]
        }])
      }
    },
  ]

  const [modalAlert, setModalAlert] = useState<any>([])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [balance, setBalance] = useState('')
  const [isUploading, setIsUploading] = useState(false)


  useEffect(() => {
    setTimeout(async () => {
      const userData = await AsyncStorage.getItem('userData')
      let data: UserData = JSON.parse(userData as string)
      setName(data.name)
      setEmail(data.email)
      setPhone(data.phone)
      setBalance(data.balance)
    }, 0);
  }, [])

  return (
    <SafeAreaView style={{
      backgroundColor: 'white', flex: 1,
    }}>
      <ScrollView>
        <CustomModal modals={modalAlert} updater={setModalAlert} />
        <View style={[styles.flexRow, { justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 20, gap: 10, paddingTop: 20, }]}>
          <View style={[styles.flexRow, { gap: 15 }]}>
            <View>
              <Image source={icons.user_icon} style={{
                height: 70,
                width: 70,
              }} />
            </View>
            <View>
              <Text style={[styles.fullName]}>{name}</Text>
              {/* <Text style={[styles.userName]}>@userName</Text> */}
            </View>
          </View>
          <TouchableOpacity onPress={() => {
            navigation.navigate('EditProfile', {
              ppLink: 'https://images.unsplash.com/photo-1604311795833-25e1d5c128c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8OSUzQTE2fGVufDB8fDB8fA%3D%3D&w=1000&q=80',
              name: name
            })
          }} activeOpacity={0.8}>
            {/* <Text style={
              { textAlign: 'center', color: colors.accent, fontFamily: fonts.medium, backgroundColor: colors.accentLight, padding: 8, borderRadius: 10, paddingHorizontal: 17, fontSize: 13 }}>
              {"Change Pic"}
            </Text> */}
            <View className='p-3 rounded-full' style={{ backgroundColor: colors.accentLight }}>

              <Image source={icons.pencil} style={{ height: 15, aspectRatio: 1, resizeMode: 'contain', tintColor: colors.accent }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.detailsContainer]}>
          <View style={[styles.details]}>
            <Image source={icons.mobile_solid} style={styles.detailsImage} />
            <Text style={[styles.detailsText]}>+91 {phone}</Text>
          </View>
          <View style={[styles.details]}>
            <Image source={icons.at} style={styles.detailsImage} />
            <Text style={[styles.detailsText]}>{email}</Text>
          </View>
        </View>

        <View style={[styles.flexRow, styles.balanceContainer]}>
          <View style={[styles.balanceBox]}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Wallet')}>
              <View style={[styles.flexRow, { gap: 7 }]}>
                <Image source={icons.coins} style={styles.balanceImage} />
                <Text style={[styles.balance]}>{balance}</Text>
              </View>
              <Text style={[styles.balanceType]}>Wallet</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.balanceBox]}>
            <View style={[styles.flexRow, { gap: 7 }]}>
              <Image source={icons.task_list} style={styles.balanceImage} />
              <Text style={[styles.balance]}>56</Text>
            </View>
            <Text style={[styles.balanceType]}>Tasks</Text>
          </View>
        </View>
        <View>
          <View style={{ marginTop: 0, gap: 1, paddingBottom: 20 }}>
            {
              options.map((item, index) => {
                return (
                  <TouchableOpacity key={index} activeOpacity={0.6} onPress={item.onPress}>
                    <View style={[styles.flexRow, { justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 30, }]}>
                      <View style={[styles.flexRow, { gap: 20, }]}>
                        <Image source={item.icon} style={{ width: 30, height: 32, resizeMode: 'contain', }} />
                        <Text style={[{ fontSize: 15, color: colors.text, fontFamily: fonts.medium }]}>{item.title}</Text>
                      </View>
                      <Image source={icons.back} style={{ width: 17, height: 17, tintColor: '#aaa', }} />
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

export default Profile


const styles = StyleSheet.create({
  balanceContainer: {
    padding: 20,
    paddingTop: 10,
    width: '100%',
    gap: 15,
  },
  balanceType: {
    fontSize: 16,
    color: colors.text,
    opacity: 0.7,
    marginTop: 5,
    fontFamily: fonts.regular
  },
  balance: {
    fontSize: 23,
    fontFamily: fonts.semiBold,
    color: colors.text,
  },
  balanceBox: {
    backgroundColor: colors.accentLight,
    padding: 20,
    paddingVertical: 20,
    flex: 1,
    // gap: 5,
    borderRadius: 20,
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    // backgroundColor: colors.inputBg,
    padding: 15,
    paddingHorizontal: 25,
    gap: 15,
    marginTop: 10,
  },
  balanceImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
  },
  detailsImage: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
    tintColor: colors.gray,
  },
  detailsText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: fonts.medium
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  fullName: {
    fontSize: 19,
    fontFamily: fonts.bold,
    color: colors.text,
  },
  userName: {
    fontSize: 16,
    color: colors.gray,
  }
})