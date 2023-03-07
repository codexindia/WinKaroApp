import {
  StyleSheet, Text, View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,

} from 'react-native'
import React from 'react'
import images from '../../assets/images/images'
import icons from '../../assets/icons/icons'
import { colors } from '../../styles/colors'
import vars from '../../styles/var'




const Profile = ({ navigation }: any) => {
  const options = [
    {
      title: 'Withdraw',
      icon: icons.cash,
      onPress: () => { }
    },
    {
      title: 'Promotion',
      icon: icons.promotion,
      onPress: () => { }
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
      onPress: () => {navigation.navigate('Terms')}
    },
    {
      title: 'Rate us',
      icon: icons.favorite,
      onPress: () => { }
    },
    {
      title: 'About us',
      icon: icons.information_desk,
      onPress: () => { }
    },
    {
      title: 'Log out',
      icon: icons.logout,
      onPress: () => { }
    },
  ]
  return (
    <SafeAreaView style={{
      backgroundColor: 'white', flex: 1,
    }}>
      <ScrollView>


        <View style={[styles.flexRow, { paddingVertical: 10, paddingHorizontal: 20, gap: 20, paddingTop: 20, }]}>
          <View >
            <Image source={icons.user_icon} style={{
              height: 70,
              width: 70,
            }} />
          </View>
          <View>
            <Text style={[styles.fullName]}>User Name</Text>
            <Text style={[styles.userName]}>@userName</Text>
          </View>
        </View>
        <View style={[styles.detailsContainer]}>
          <View style={[styles.details]}>
            <Image source={icons.mobile_solid} style={styles.detailsImage} />
            <Text style={[styles.detailsText]}>+91 987654321</Text>
          </View>
          <View style={[styles.details]}>
            <Image source={icons.at} style={styles.detailsImage} />
            <Text style={[styles.detailsText]}>abcdefgh@gmail.com</Text>
          </View>
        </View>


        <View style={[styles.flexRow, styles.balanceContainer]}>
          <View style={[styles.balanceBox]}>
            <View style={[styles.flexRow, { gap: 7 }]}>
              <Image source={icons.coins} style={styles.balanceImage} />
              <Text style={[styles.balance]}>2456</Text>
            </View>
            <Text style={[styles.balanceType]}>Wallet</Text>
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


          <View style={{ marginTop: 0, gap: 1, paddingBottom: 50 }}>
            {
              options.map((item, index) => {
                return (
                  <TouchableOpacity key={index} activeOpacity={0.6} onPress={item.onPress}>
                    <View style={[styles.flexRow, {
                      justifyContent: 'space-between',
                      paddingVertical: 10,
                      paddingHorizontal: 30,
                      // backgroundColor: colors.inputBg,
                    }]}>
                      <View style={[styles.flexRow, {
                        gap: 20,
                      }]}>
                        <Image source={item.icon} style={{
                          width: 30,
                          height: 32,
                          resizeMode: 'contain',
                        }} />
                        <Text style={[{
                          fontSize: 16,
                          color: colors.text,
                          fontWeight: '500',
                        }]}>{item.title}</Text>
                      </View>
                      <Image source={icons.back} style={{
                        width: 17,
                        height: 17,
                        tintColor: '#aaa',
                      }} />
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
  },
  balance: {
    fontSize: 25,
    fontWeight: 'bold',
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
    fontSize: 16,
    color: colors.text,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  userName: {
    fontSize: 16,
    color: colors.gray,
  }
})