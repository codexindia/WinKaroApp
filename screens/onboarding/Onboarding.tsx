import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useRef } from 'react'
import { Animated, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import buttons from '../../styles/buttons'
import { colors } from '../../styles/colors'
import txt from '../../styles/text'
import data from './onboardingData'
import Paginator from './Paginator'

const Onboarding = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const slidesRef = useRef<any>(null)
  const [buttonText, setButtonText] = React.useState('Next')


  async function scrollTo() {
    console.log(currentIndex)
    if (currentIndex < data.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 })
      if (currentIndex === data.length - 2) {
        setButtonText('Get Started')
      }
      setCurrentIndex(currentIndex + 1)
    } else {
      // setButtonText('Get Started')
      // Go to login screen
      navigation.replace('LogIn')
      await AsyncStorage.setItem('onboarding', 'true')
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <FlatList
        data={data} renderItem={({ item }) => <BoardingItem item={item} key={item.key} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(key: any) => key.key}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } }, }], { useNativeDriver: false })}
        scrollEventThrottle={32}
        ref={slidesRef}
      />
      <Paginator data={data} scrollX={scrollX} setIndex={setCurrentIndex} />

      <View style={styles.bottom}>
        {
          <TouchableOpacity style={styles.touchable} onPress={scrollTo} activeOpacity={0.8}>
            <Text style={buttons.full}>{buttonText}</Text>
          </TouchableOpacity>
        }
        <Text style={styles.bottomText}>
          Read <Text style={txt.color}>Terms and Conditions</Text> before using the app.
        </Text>
      </View>
    </SafeAreaView>
  )
}

function BoardingItem({ item }: { item: any }) {
  const { width } = useWindowDimensions()

  return (
    <View style={[{ width, }, styles.boardingItem,]}>
      <Text></Text>
      <Image source={item.image} style={styles.image} />
      <View style={{ flex: 0.3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )
}


export default Onboarding

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
  },
  container: {
    flex: 3,
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    flex: 0.4,
    resizeMode: 'contain',
  },
  boardingItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: colors.text,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 20,
    // color: 'g',
  },
  bottom: {

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  }, bottomText: {
    marginTop: 5
  }
})