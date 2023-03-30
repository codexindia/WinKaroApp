import { Animated, Dimensions, Easing, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fonts } from '../../styles/fonts'
import { colors } from '../../styles/colors'
import images from '../../assets/images/images'
import { Touchable } from 'react-native'
import ButtonFull from '../../components/ButtonFull'
import icons from '../../assets/icons/icons'

export default function YouTubeTask() {
  const { height, width } = Dimensions.get('window')
  const [bottomSwipeIcon] = useState(new Animated.Value(0))
  const [topSwipeIcon] = useState(new Animated.Value(10))
  const [modalVisible, setModalVisible] = useState(true)

  let titles = ['Task 1', 'Task 2', 'Task 3', 'Task 4',]
  let taskLen = titles.length

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bottomSwipeIcon, { toValue: 10, duration: 500, useNativeDriver: false, easing: Easing.linear }),
        Animated.timing(bottomSwipeIcon, { toValue: 0, duration: 500, useNativeDriver: false, easing: Easing.linear })
      ])
    ).start()
  }, [])


  return (
    <View style={{
      backgroundColor: 'white', flex: 1
    }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={{
          flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.15  )',
        }}>
          <View style={{
            backgroundColor: 'white', padding: 25, borderRadius: 25, gap: 30,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}>
            <Image source={icons.swipe_up_finger} />
            <Text style={{
              fontSize: 20, fontFamily: fonts.regular, color: colors.text, textAlign: 'center'
            }}>Swipe Up To View Next Task</Text>
            <ButtonFull title='Ok, Got it' cb={() => {
              setModalVisible(false)
            }} />
          </View>
        </View>


      </Modal >
      <ScrollView
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        {
          titles.map((title, index) => {
            return <View style={{
              height: height, width: '100%',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }} key={index}>
              <View>
                <View style={{
                  backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', padding: 10, paddingBottom: 0
                }}>
                  <Text style={{ fontSize: 20, fontFamily: fonts.semiBold, color: colors.text, textAlign: 'center' }}>TouTube {title}</Text>
                </View>
                <View>
                  {/*16 : 9 Video Thumbnail*/}
                  <Image source={images.gaming} style={{
                    width: width - 40, height: (width - 40) * 9 / 16,
                    alignSelf: 'center', marginTop: 20, borderRadius: 25,
                  }}
                  ></Image>
                  <View style={{
                    flexDirection: 'row', width: width - 50, alignItems: 'center',
                    justifyContent: 'space-between', marginTop: 15, gap: 10
                  }}>
                    <View style={{}}>
                      <Text style={{
                        fontSize: 16, fontFamily: fonts.medium, color: colors.text, width: width - 100,
                      }}>
                        The Gaming Strategy That Will Make You a Better Player | The Art of Gaming
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <Image source={icons.copy} style={{
                        width: 23, height: 23, alignSelf: 'center', resizeMode: 'contain',
                      }} />
                    </TouchableOpacity>
                  </View>
                  <Text style={{ color: colors.text, fontFamily: fonts.regular, marginTop: 10 }}>Publisher : <Text style={{ fontFamily: fonts.medium, color: colors.accent }}>SamplePublisher</Text></Text>
                </View>
              </View>

              <TaskAmount />


              <TaskRules />

              <View style={{ width: '100%' }}>

                <View style={{ paddingHorizontal: 20, marginTop: 10, width: '100%', gap: 15 }}>
                  <ButtonFull title="Start Recording" onPress={() => { }} />
                  <TouchableOpacity activeOpacity={0.8}>
                    <View style={{
                      flexDirection: 'row', alignItems: 'center', gap: 20,
                      backgroundColor: '#fafafa', borderRadius: 15,
                      borderWidth: 0.5, borderColor: '#dadada'
                    }}>
                      <View style={{ padding: 12, borderRightWidth: 0.5, borderColor: '#dadada', }}>
                        <Image source={icons.video} style={{
                          width: 30, height: 30, alignSelf: 'center', resizeMode: 'contain',
                        }} />
                      </View>
                      <View>
                        <Text style={{
                          fontSize: 14, fontFamily: fonts.medium, color: colors.gray,
                        }}>Select the recorded video</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <SwipeUp bottomSwipeIcon={bottomSwipeIcon} topSwipeIcon={topSwipeIcon} isVisible={index == taskLen - 1 ? false : true} />
              </View>
            </View>
          })}
      </ScrollView>
    </View >
  )
}
function TaskAmount() {
  return <View style={{
    width: '100%', flexDirection: 'row', justifyContent: 'flex-start',
    paddingHorizontal: 20, gap: 30,
    //  position: 'absolute', top: 70
  }}>
    <View style={{
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10,
      backgroundColor: '#fff', padding: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10
    }}>
      <Image source={icons.coins} style={{
        width: 30, height: 30, alignSelf: 'center', resizeMode: 'contain',
      }} />
      <Text style={{
        fontSize: 20, fontFamily: fonts.medium, color: colors.text, textAlign: 'center',
      }}>2000</Text>
    </View>
    <View style={{
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10,
      backgroundColor: '#fff', padding: 10, paddingHorizontal: 10, paddingLeft: 7, borderTopLeftRadius: 10, borderBottomLeftRadius: 10
    }}>
      <Image source={icons.countdown} style={{
        width: 25, height: 25, alignSelf: 'center', resizeMode: 'contain',
      }} />
      <Text style={{
        fontSize: 20, fontFamily: fonts.medium, color: colors.text, textAlign: 'center',
      }}>10:15:22</Text>
    </View>



  </View>
}
function TaskRules() {
  return <View style={{ padding: 20, gap: 5 }}>
    <View style={{
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 5,
    }}>
      <Text style={{ fontSize: 18, fontFamily: fonts.medium, color: colors.text }}> Get Money Steps </Text>
      <WatchTutorial />
    </View>
    <Text style={styles.stepsStyle}>1. Start mobile screen recording.</Text>
    <Text style={styles.stepsStyle}>2. Copy search title & paste it on youtube.</Text>
    <Text style={styles.stepsStyle}>3. Search for the video of the same thumbnail, now play video.</Text>
    <Text style={styles.stepsStyle}>4. Do Like, comment and take both screenshots.</Text>
    <Text style={styles.stepsStyle}>5. After complete watching video stop the screen recording and send it us to verify.</Text>
    <Text style={styles.stepsStyle}>6. Click on Submit button & send these the recorded video.</Text>
    {/* <Text style={styles.stepsStyle}>7. Video's Screen Recording b. Like Screenshot c. Comment Screenshot d. Valid Paytm Number</Text> */}
  </View>
}

function WatchTutorial() {
  return <TouchableOpacity activeOpacity={0.7}>
    <View style={{
      flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10,
      backgroundColor: '#ff000011', padding: 10,
      borderRadius: 15, paddingHorizontal: 15
    }}>
      <Image source={icons.youtube_icon} style={{
        width: 20, height: 20, alignSelf: 'center', resizeMode: 'contain',
      }}></Image>
      <Text style={{
        color: 'red', fontFamily: fonts.medium, fontSize: 14,
      }}>Watch Tutorial</Text>
    </View>
  </TouchableOpacity>
}

function SwipeUp({ bottomSwipeIcon, topSwipeIcon, isVisible }: any) {
  return <View style={{
    opacity: isVisible ? 1 : 0,
    flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: isVisible ? 50 : 20,
  }}>
    <Animated.View style={{ marginBottom: bottomSwipeIcon, marginTop: topSwipeIcon, gap: 2 }}>
      <Image source={icons.back} style={{
        width: 20, height: 20, alignSelf: 'center',
        transform: [{ rotate: '-90deg' }], tintColor: colors.gray,
      }}></Image>
      <Text style={{ color: colors.gray, fontFamily: fonts.medium, fontSize: 12 }}>Next Task</Text>
    </Animated.View>
  </View>
}

const styles = StyleSheet.create({
  stepsStyle: {
    fontSize: 14, fontFamily: fonts.regular, color: colors.text, paddingLeft: 10
  }
})
