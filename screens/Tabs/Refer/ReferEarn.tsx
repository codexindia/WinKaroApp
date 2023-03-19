import {
  StyleSheet, Text, View
  , SafeAreaView, ScrollView, Image,
  TouchableOpacity, BackHandler,
  Clipboard, Share
} from 'react-native'
import React from 'react'
import { colors } from '../../../styles/colors'
import icons from '../../../assets/icons/icons'
import images from '../../../assets/images/images'
import { useWindowDimensions } from 'react-native'
import ButtonFull from '../../../components/ButtonFull'
import { Alert } from 'react-native'
import vars from '../../../styles/var'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserData } from '../../types'
import { playStoreLink } from '../../../appData'
import { fonts } from '../../../styles/fonts'


const ReferEarn = ({ navigation }: any) => {
  const { width } = useWindowDimensions()
  const [copiedText, setCopiedText] = React.useState('Copy')
  const [referCode, setReferCode] = React.useState('')

  React.useEffect(() => {
    setTimeout(async () => {
      const data: UserData = JSON.parse(await AsyncStorage.getItem('userData') as string)
      setReferCode(data.refer_code)
    }, 0);
  }, [])

  return (
    <View style={{ height: '100%', backgroundColor: 'lime' }}>
      <View style={styles.top}>
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 15, paddingVertical: 5 }}>
          <Text style={{ fontSize: 20, color: colors.text, fontFamily: fonts.bold }}>Refer and Earn</Text>
        </View>
        <View style={[styles.flexRow, { gap: 20 }]}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('ReferHistory') }}>
            <View>
              <Image source={icons.time_circle} style={[styles.topImage, { width: 20, height: 20, opacity: 0.9 }]} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>

        <View>
          <View style={[styles.flexRow]}>
            <Image source={images.refer} style={[styles.illustration, { height: width * 0.5, }]} />
          </View>
          <View style={styles.counters}>
            <View style={styles.counter}>
              <Text style={styles.counterValue}>200</Text>
              <Text style={styles.counterName}>Earned Coins</Text>
            </View>
            <View style={styles.counter}>
              <Text style={styles.counterValue}>16</Text>
              <Text style={styles.counterName}>Total Referred</Text>
            </View>
            <View style={styles.counter}>
              <Text style={styles.counterValue}>9</Text>
              <Text style={styles.counterName}>Pending</Text>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ color: colors.text, fontSize: 16, fontFamily: fonts.semiBold, textAlign: 'center' }}>Get	200 coins per refer when your friend completes 10 YouTube task continuously.</Text>
        </View>


        <View style={{ width: '100%' }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => { copyToClipboard(referCode) }}>
            <View style={styles.clickToCopy}>
              <Text style={{ color: colors.accent, fontSize: 16, fontFamily: fonts.medium, }}>Refer code : {referCode}</Text>
              <Text style={{ color: colors.accent, fontSize: 16, fontFamily: fonts.medium }}>{copiedText}</Text>
            </View>
          </TouchableOpacity>
          <ButtonFull title="Refer a Friend" cb={() => {
            shareText(
              `Check out Win Karo App on the Google Play Store using this link: ${playStoreLink}. Use my referral code ${referCode} for a special bonus when you sign up. Enjoy!`
            )
          }} />
        </View>

      </View>
    </View>
  )

  function copyToClipboard(text: string) {
    setCopiedText('Copied')
    setTimeout(() => {
      setCopiedText('Copy')
    }, 10000);
    Clipboard.setString(text);
  }
}

export default ReferEarn

const styles = StyleSheet.create({
  counters: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  counter: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingVertical: 20,
    backgroundColor: colors.accentLight,
    borderRadius: vars.borderRadius,
  },
  counterValue: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.text,
  },
  counterName: {
    fontSize: 13,
    color: colors.text,
    opacity: 0.8,
    fontFamily: fonts.regular,
  },
  clickToCopy: {
    width: '100%', marginBottom: 10,
    backgroundColor: colors.accentLight,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    paddingHorizontal: 20,
    borderRadius: vars.borderRadius,
  },
  illustration: {
    width: '100%',
    resizeMode: 'contain'
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  top: {
    // flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 12,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  topImage: {
    height: 40,
    width: 40,
    resizeMode: 'contain'
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
})



async function shareText(text: string) {
  try {
    const result = await Share.share({
      message:
        text,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {// shared with activity type of result.activityType
      } else {// shared
      }
    }
    else if (result.action === Share.dismissedAction) {// dismissed
    }
  } catch (error: any) {
    Alert.alert('Error!', error.message);
  }
};