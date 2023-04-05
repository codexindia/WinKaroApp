import { StyleSheet, Text, View, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import changeNavigationBarColor from 'react-native-navigation-bar-color'

const DailyLimit = ({ navigation, route }: any) => {
   const [modals, setModals] = useState<any>([])
   const [checkedDailyLimit, setCheckedDailyLimit] = useState(false)
   const earnedCoins = route.params.earnedCoins
   const checkFor = route.params.checkFor || 'watch'
   // Disable Back Button
   useEffect(() => {
      const backAction = () => { return true; };
      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => backHandler.remove();
   }, []);


   useEffect(() => {
      // Change Navigation Bar Color
      changeNavigationBarColor('#ffffff', true);
      // Check daily limit
      setTimeout(() => {
         setCheckedDailyLimit(true)
         navigation.replace('RewardAd', { earnedCoins: earnedCoins, from: checkFor })
      }, 1000);
   }, [])

   return (
      <View style={{
         flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff',
      }}>
         <Loading />
         <Text>Checking Daily Limit</Text>
      </View>
   )
}

export default DailyLimit

const styles = StyleSheet.create({})