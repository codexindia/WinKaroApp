import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import Loading from '../components/Loading';
import { fonts } from '../styles/fonts';
import { colors } from '../styles/colors';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ButtonFull from '../components/ButtonFull';
import images from '../assets/images/images';
const adUnitId = TestIds.REWARDED;


const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const RewardAdScreen = ({ route, navigation }: any) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const earnedCoins = route.params.earnedCoins
  const [claimingText, setClaimingText] = useState('Claiming Coins...')
  const [isClaimed, setIsClaimed] = useState(false)

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setIsLoaded(true);
    });
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', earnedCoins);
        Alert.alert("Congratulations", "You have earned " + earnedCoins + " for watching the ad.")
        setIsWatched(true);
        claimCoins(earnedCoins)
        // navigation.goBack()
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };

  }, [])

  useEffect(() => {
    changeNavigationBarColor('#ffffff', true);
  }, [])

  useEffect(() => {
    if (isLoaded) {
      rewarded.show();
    }
  }, [isLoaded])


  function claimCoins(earnedCoins: number) {
    setTimeout(() => {
      console.log('claim coins')
      // navigation.goBack()
      setClaimingText(earnedCoins + ' Coins Claimed!')
      setIsClaimed(true)
    }, 5000);
  }

  if (!isLoaded) {
    return (
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff',
      }}>
        <Loading />
        <Text>Loading Ad...</Text>
      </View>
    );
  }
  if (isWatched) {
    return (
      <View style={{
        flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff',
        padding: 20, gap: 10, width: '100%'
      }}>
        <View></View>
        <View style={{ width: '100%' }}>
          <Image source={images.coins} style={{
            width: '100%', height: 250, resizeMode: 'contain',
          }} />
        </View>
        <Text style={{
          fontSize: 18, fontFamily: fonts.medium, color: colors.text,
          textAlign: 'center', width: '80%',
        }}>{claimingText}</Text>


        <ButtonFull title="Go Back" cb={() => navigation.goBack()} styles={{
          opacity: isClaimed ? 1 : 0.5,
        }} disabled={
          !isClaimed ? true : false
        } />
      </View >
    )
  }

  return (
    <View style={{
      flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff',
    }}>
      <Text style={{
        fontSize: 18, fontFamily: fonts.medium, color: colors.text, textAlign: 'center',
        width: '80%',
      }}>You Did not watch the ad completely. Please go back and start again</Text>
    </View >
  )
}

export default RewardAdScreen

const styles = StyleSheet.create({})