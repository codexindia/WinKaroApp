import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { getDefaultHeader } from './methods'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from '../appData'
import images from '../assets/images/images'
import { fonts } from '../styles/fonts'
import { colors } from '../styles/colors'

const Notifications = () => {
  const [notifications, setNotifications] = React.useState<any>(null)
  async function fetchNotifications() {
    const headers = getDefaultHeader(await AsyncStorage.getItem('token'))
    const res = await fetch(API_URL.get_notification, { method: 'POST', headers })
    const data = await res.json()

    console.log(data)
    if (data.status === 'true' || data.status === true) {
      setNotifications(data.data)
    }
    else {
      setNotifications([])
    }
  }
  useEffect(() => {
    // fetch notifications
    fetchNotifications()
  }, [])


  if (notifications == null)
    return <Loading />
  if (notifications.length === 0) {
    return <View className='flex-1 bg-white justify-center items-center gap-10' >
      <Image source={images.bell} style={{ width: '100%', height: 150, alignSelf: 'center', marginTop: 20, resizeMode: 'contain' }} />
      <Text style={{ fontFamily: fonts.medium, color: colors.gray }}>No Notifications</Text>
    </View>
  }


  return (
    <View>
      <Text>Notifications</Text>
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({})