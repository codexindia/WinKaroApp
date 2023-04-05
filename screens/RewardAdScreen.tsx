import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import Loading from '../components/Loading';

const adUnitId = TestIds.REWARDED;


const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const RewardAdScreen = ({ route, navigation }: any) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const earnedCoins = route.params.earnedCoins

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setIsLoaded(true);
    });
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', earnedCoins);
        Alert.alert("Congratulations", "You have earned " + earnedCoins + " for watching the ad.")
        navigation.pop(2)
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
    if (isLoaded) {
      rewarded.show();
    }
  }, [isLoaded])

  if (!isLoaded) {
    return (
      <Loading />
    );
  }

  return (
    // <View style={{
    //   flex: 1, justifyContent: 'center', alignItems: 'center'
    // }}>
    //   <Text style={{
    //     fontSize: 20, fontWeight: 'bold'
    //   }}>RewardAd</Text>
    //   <TouchableOpacity onPress={() => rewarded.show()} ><Text>show</Text></TouchableOpacity>
    // </View>
    <View>
      <Text>Loading Ad...</Text>
      <Loading />
    </View>

  )
}

export default RewardAdScreen

const styles = StyleSheet.create({})