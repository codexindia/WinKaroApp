import {
   Dimensions, StatusBar, StyleSheet, ScrollView,
   Text, View, Image, TouchableOpacity, Alert
} from 'react-native'
import React, { useEffect } from 'react'
import { fonts } from '../../styles/fonts'
import Video from 'react-native-video'
import { colors } from '../../styles/colors'
import ButtonFull from '../../components/ButtonFull'
import icons from '../../assets/icons/icons'
import AsyncStorage from '@react-native-async-storage/async-storage'


const video_url: any = {
   'youtube': "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
   'instagram': "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
   'yt_shorts': "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
}

function steps(taskType: string) {
   switch (taskType) {
      case 'youtube': return <>
         <Text style={styles.stepsStyle}>1. Start mobile screen recording.</Text>
         <Text style={styles.stepsStyle}>2. Copy search title & paste it on youtube.</Text>
         <Text style={styles.stepsStyle}>3. Search for the video of the same thumbnail, now play video.</Text>
         <Text style={styles.stepsStyle}>4. Do Like, comment and take both screenshots.</Text>
         <Text style={styles.stepsStyle}>5. After complete watching video stop the screen recording and send it us to verify.</Text>
         <Text style={styles.stepsStyle}>6. Click on Submit button & send these the recorded video.</Text>
      </>
      case 'instagram': return <>
         <Text style={styles.stepsStyle}>1. Start mobile screen recording.</Text>
         <Text style={styles.stepsStyle}>2. Copy search title & paste it on instagram.</Text>
         <Text style={styles.stepsStyle}>3. Search for the video of the same thumbnail, now play video.</Text>
         <Text style={styles.stepsStyle}>4. Do Like, comment and take both screenshots.</Text>
         <Text style={styles.stepsStyle}>5. After complete watching video stop the screen recording and send it us to verify.</Text>
         <Text style={styles.stepsStyle}>6. Click on Submit button & send these the recorded video.</Text>
      </>
      case 'yt_shorts': return <>
         <Text style={styles.stepsStyle}>1. Start mobile screen recording.</Text>
         <Text style={styles.stepsStyle}>2. Copy search title & paste it on youtube.</Text>
         <Text style={styles.stepsStyle}>3. Search for the video of the same thumbnail, now play video.</Text>
         <Text style={styles.stepsStyle}>4. Do Like, comment and take both screenshots.</Text>
         <Text style={styles.stepsStyle}>5. After complete watching video stop the screen recording and send it us to verify.</Text>
         <Text style={styles.stepsStyle}>6. Click on Submit button & send these the recorded video.</Text>
      </>
   }
}


function CheckBox({ checked, onClick = () => { } }: { checked: boolean, onClick?: Function }) {
   return <TouchableOpacity activeOpacity={0.9} onPress={() => {
      onClick()
   }}>
      <View style={{
         width: 23, height: 23, borderRadius: 5, borderWidth: 1, backgroundColor: checked ? colors.accent : '#c5c5c5',
         borderColor: checked ? colors.accent : '#c5c5c5', display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
         <View>
            <Image source={icons.check} style={{
               width: 11, height: 11, resizeMode: 'contain', tintColor: 'white'
            }} />
         </View>
      </View>
   </TouchableOpacity>
}


const TaskTutorial = ({ route, navigation }: any) => {
   const { isFromHome } = route.params
   const taskType: string = route.params.taskType
   console.log(taskType)

   const { width, height } = Dimensions.get('window')
   const [dontShowAgainChecked, setDontShowAgainChecked] = React.useState(false)

   useEffect(() => {
      AsyncStorage.getItem('dontShowTaskTutorial').then((value) => {
         setDontShowAgainChecked(value === 'true')
      })
   }, [])


   return (
      <ScrollView style={{
         height: height, width: '100%', display: 'flex',
         // justifyContent: 'space-between',
         // alignItems: 'center',
         backgroundColor: 'white',
      }}>
         <StatusBar backgroundColor="white" barStyle="dark-content" />
         <View>
            <Text style={{
               fontSize: 20, fontFamily: fonts.semiBold, color: colors.text, textAlign: 'center', marginTop: 20
            }}>Get Money Steps Tutorial</Text>
            <Video
               controls={true}
               paused={true}
               source={{ uri: video_url[taskType] }}
               style={{
                  // width: width - 40, height: (width - 40) * 9 / 16, marginLeft: 'auto', marginRight: 'auto',
                  width: width, height: (width) * 9 / 16, marginLeft: 'auto', marginRight: 'auto',
                  marginTop: 20,
                  //  borderRadius: 20,
                  backgroundColor: 'black'
               }}
            />
         </View>
         <TaskRules taskType={taskType} />
         <View style={{
            padding: 20, width: '100%', gap: 10, paddingBottom: 15
         }}>
            <View>
               <View style={{
                  flexDirection: 'row', alignItems: 'center', gap: 15, marginBottom: 10
               }}>
                  <CheckBox checked={dontShowAgainChecked} onClick={() => { setDontShowAgainChecked(!dontShowAgainChecked) }} />
                  <TouchableOpacity activeOpacity={0.8} onPress={() => { setDontShowAgainChecked(!dontShowAgainChecked) }}>
                     <Text style={{
                        fontSize: 16.5, fontFamily: fonts.regular, color: colors.text, textAlign: 'center'
                     }}>
                        Don't show this tutorial again
                     </Text>
                  </TouchableOpacity>  
               </View>
            </View>

            <ButtonFull title="View Available Tasks" onPress={() => {
               AsyncStorage.setItem('dontShowTaskTutorial', dontShowAgainChecked.toString()).then(() => {
                  if (isFromHome)
                     navigation.replace('YouTubeTask', {
                        taskType: taskType, isFromHome: false
                     })
                  else navigation.goBack()
               })
            }} />

         </View>
      </ScrollView>
   )
}


function TaskRules({ taskType }: { taskType: string }) {
   return <View style={{ padding: 20, gap: 5 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 5, marginBottom: 10 }}>
         <Text style={{ fontSize: 25, fontFamily: fonts.medium, color: colors.text }}> Get Money Steps </Text>
         {/* <WatchTutorial /> */}
      </View>
      <View style={{
         backgroundColor: '#f5f5f5', padding: 20, borderRadius: 10, borderWidth: 0.5, borderColor: '#c5c5c5'
      }}>
         {
            steps(taskType)
         }
      </View>
      {/* <Text style={styles.stepsStyle}>7. Video's Screen Recording b. Like Screenshot c. Comment Screenshot d. Valid Paytm Number</Text> */}
   </View>
}


export default TaskTutorial

const styles = StyleSheet.create({
   stepsStyle: {
      fontSize: 16, fontFamily: fonts.regular, color: colors.text, paddingLeft: 10, marginTop: 10
   }
})