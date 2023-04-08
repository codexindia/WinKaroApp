import {
  Alert, BackHandler,
  Animated, Dimensions, Easing, Image, Modal,
  ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View
} from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { fonts } from '../../styles/fonts'
import { colors } from '../../styles/colors'
import images from '../../assets/images/images'
import { Touchable } from 'react-native'
import ButtonFull from '../../components/ButtonFull'
import icons from '../../assets/icons/icons'
import Video from 'react-native-video'
import buttons from '../../styles/buttons'
import { Linking } from 'react-native'
import RecordScreen, { RecordingStartResponse } from 'react-native-record-screen';
import { RecordingResult } from 'react-native-record-screen'
import CustomModal from '../../components/CustomModal'
import { getDefaultHeader } from '../methods'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from '../../appData'
import Loading from '../../components/Loading'
import { Clipboard } from 'react-native'


const { height, width } = Dimensions.get('window')
/*[{
  "resource": "/workspaces/win-karo/screens/Tasks/YouTubeTask.tsx",
  "owner": "typescript",
  "code": "7016",
  "severity": 8,
  "message": "Could not find a declaration file for module 'react-native-video-player'. '/workspaces/win-karo/node_modules/react-native-video-player/index.js' implicitly has an 'any' type.\n  Try `npm i --save-dev @types/react-native-video-player` if it exists or add a new declaration (.d.ts) file containing `declare module 'react-native-video-player';`",
  "source": "ts",
  "startLineNumber": 9,
  "startColumn": 25,
  "endLineNumber": 9,
  "endColumn": 52
}]*/

function GoBtn({ url }: { url: string }) {
  return <TouchableOpacity style={[buttons.full, { backgroundColor: 'limegreen', width: width / 3 - 25 }]} activeOpacity={0.8}
    onPress={() => {
      console.log('Go')
      Linking.openURL(url)
    }}
  >
    <Text style={[{ textAlign: 'center', fontSize: 15, color: 'white', fontFamily: fonts.medium },]}>Go</Text>
  </TouchableOpacity>
}


export default function YouTubeTask({ navigation }: any) {
  const [bottomSwipeIcon] = useState(new Animated.Value(0))
  const [topSwipeIcon] = useState(new Animated.Value(10))
  const [modalVisible, setModalVisible] = useState(false)
  const [recordingIndex, setRecordingIndex] = useState(-1)
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [modals, setModals] = useState<any>([])
  const [progress, setProgress] = useState(33)
  const [uploadingIndex, setUploadingIndex] = useState(0)
  const [currentRecordingTaskId, setCurrentRecordingTaskId] = useState(-1)
  const [tasks, setTasks] = useState<any>(null)

  function cancelUpload() {
    console.log('Cancel upload')
    setModals([{
      title: "Are you sure?",
      description: "Are you sure you want to cancel this upload? This will stop your recording to complete the task.",
      buttons: [
        { text: "No" },
        {
          text: "Yes", positive: true, onPress: () => {
            setModals([])
            navigation.goBack()
          },
        },
      ]
    }])
  }

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




  async function getTasks() {
    const headers = getDefaultHeader(await AsyncStorage.getItem('token'))
    const res = await fetch(API_URL.get_yt_task, { method: 'POST', headers: headers })
    const data = await res.json()
    console.log(data.data)
    console.log(data.data)
    data.data.shift()
    setTasks(data.data)
  }
  useEffect(() => {
    getTasks()
  }, [])

  useEffect(() => {
    const backAction = () => {
      if (recordingIndex === -1)
        return false;
      setModals([{
        title: "Are you sure?",
        description: "Are you sure you want to go back? This will stop your recording to complete the task and you have to start again.",
        type: "success", active: true,
        buttons: [
          { text: "No" },
          {
            text: "Yes", positive: true, onPress: () => {
              cancelRecording()
              navigation.goBack()
            },
          },
        ]
      }])
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [recordingIndex])

  function startRecording(index: number, id: number) {
    RecordScreen.startRecording({ mic: false }).then(res => {
      if (res === RecordingResult.PermissionError) {
        console.log("Permission Error")
        Alert.alert('Permission Error', 'Please allow the permission to record screen')
      } else {
        // Everything is ok
        setCurrentRecordingTaskId(id)
        console.log(id)
        console.log("Start Recording");
        console.log(res);
        setRecordingIndex(index)
      }
    }).catch(err => {
      console.log(err);
    })
  }

  function stopRecording() {
    RecordScreen.stopRecording().then(res => {
      const URL = res.result.outputURL
      setIsUploading(true)
      setUploadingIndex(recordingIndex)
      setRecordingIndex(-1)


      // const xhr = new XMLHttpRequest();
      // const formData = new FormData();
      // formData.append('task_id', currentRecordingTaskId)

      // xhr.open('POST', API_URL.upload_task);
      // xhr.addEventListener('load', () => {
      //   console.log(xhr.responseText);
      //   setIsUploading(false)
      //   // setProgress(33)
      //   setToggleCheckBox(false)
      //   getTasks()
      // })

    }).catch(err => {
      console.log(err);
    })



    setTimeout(async () => {
      const headers = getDefaultHeader(await AsyncStorage.getItem('token'))
      const formData = new FormData();
      const res = await fetch(API_URL.get_yt_task, { method: 'POST', body: formData, headers: headers })
      const data = await res.json()
      console.log(data.data)

    }, 0);



  }
  function cancelRecording() {
    RecordScreen.stopRecording().then(res => {
      RecordScreen.clean().then(data => {
        console.log(data)
      })
      setRecordingIndex(-1)
    }).catch(err => {
      console.log(err);
    })
  }
  function WatchHelp() {
    return <View style={{ padding: 20, gap: 5, backgroundColor: '#fafafa', borderColor: '#e5e5e5', borderWidth: 0.5, borderRadius: 20, width: width - 40, alignSelf: 'center', marginBottom: 20 }}>
      <Text style={{ fontSize: 16, fontFamily: fonts.medium, color: colors.text, }}>
        Don't Know how to complete this process?
      </Text>
      <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text, }}>
        Click on the button bellow to learn how to complete this task. Don't worry we will explain everything in detail.
      </Text>
      <View>
        <WatchTutorial navigation={navigation} />
      </View>
    </View>
  }

  if (tasks === null)
    return <Loading />


  return (
    <View style={{
      backgroundColor: 'white', flex: 1
    }}>
      <CustomModal modals={modals} updater={setModals} />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={{
          flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.15)',
        }}>
          <View style={{
            backgroundColor: 'white', padding: 25, borderRadius: 25, gap: 30,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}>
            <Image source={icons.swipe_up_finger} />
            <Text style={{
              fontSize: 20, fontFamily: fonts.regular, color: colors.text, textAlign: 'center'
            }}>Swipe Up To View Next Task</Text>
            <ButtonFull title='Ok, Got it' onPress={() => {
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

          tasks.map((task: any, index: number) => {
            return <Task task={task} index={index} key={index} />
          })}
      </ScrollView>
    </View >
  )

  function Task({ task, index }: { task: any, index: number }) {
    const task_name = task.data.task_name
    const title = task.data.title
    const reward_coin = task.data.reward_coin
    const thumbnail_image = task.data.thumbnail_image
    const publisher = task.data.publisher
    const action_url = task.data.action_url
    const ends_at = task.data.expire_at
    const id = task.data.id
    const [s, ss] = useState(task.status)
    const [status, setStatus] = useMemo(() => [s, ss], [s])
    const now = new Date()
    const end = new Date(ends_at)
    // const isExpired = now > end
    const isExpired = false

    return <View style={{ height: height, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }} key={index}>
      <View>
        <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', padding: 10, paddingBottom: 0 }}>
          <Text style={{ fontSize: 20, fontFamily: fonts.semiBold, color: colors.text, textAlign: 'center' }}>
            {task_name}
          </Text>
        </View>
        <View>
          {/*16 : 9 Video Thumbnail*/}
          <Image source={{ uri: thumbnail_image }} style={{ width: width - 40, height: (width - 40) * 9 / 16, alignSelf: 'center', marginTop: 20, borderRadius: 25, }}></Image>
          <View style={{ flexDirection: 'row', width: width - 50, alignItems: 'center', justifyContent: 'space-between', marginTop: 15, gap: 10 }}>
            <View style={{ padding: 10, paddingTop: 0, paddingBottom: 0, width: width - 100 }}>
              <Text style={{ fontSize: 16, fontFamily: fonts.medium, color: colors.text, }}>
                {title}
              </Text>
              <Text style={{ color: colors.text, fontFamily: fonts.regular, marginTop: 10 }}>Publisher : <Text style={{ fontFamily: fonts.medium, color: colors.accent }}>
                {publisher}
              </Text></Text>
            </View>
            <View style={{ backgroundColor: '#f5f5f5', borderColor: '#e5e5e5', borderWidth: 0.5, borderRadius: 10, padding: 10, }}>
              <TouchableOpacity onPress={() => copyToClipboard(title)}>
                <Image source={icons.copy} style={{ width: 23, height: 23, alignSelf: 'center', resizeMode: 'contain', }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <TaskAmount coins={reward_coin} endTime={ends_at} />
      <WatchHelp />
      <View style={{ width: '100%' }}>

        {s === 'rejected' ? <TaskRejectedUI reason={task.remarks} retry={setStatus} /> : null}
        <View style={{ paddingHorizontal: 20, marginTop: 10, width: '100%', gap: 15 }}>
          {
            s === 'complete' || s === 'processing' ? <TaskStatusUI status={s} /> :
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                {
                  isExpired ? null :
                    isUploading ?
                      uploadingIndex === index ?
                        <Uploading progress={progress} cancel={cancelUpload} />
                        : <TouchableOpacity style={[buttons.full, { width: width - 40, backgroundColor: 'grey' }]} activeOpacity={0.8} disabled>
                          <Image source={icons.record} style={{ width: 20, height: 20, alignSelf: 'center', resizeMode: 'contain', tintColor: 'white' }} />
                          <Text style={[{ textAlign: 'center', fontSize: 15, color: 'white', fontFamily: fonts.medium },]}>Uploading another task</Text>
                        </TouchableOpacity>
                      :
                      recordingIndex === index ?
                        <>
                          <TouchableOpacity style={[buttons.full, { width: width * 2 / 3 - 25, backgroundColor: 'red' }]} activeOpacity={0.8} onPress={() => stopRecording()}>
                            <Image source={icons.record} style={{ width: 20, height: 20, alignSelf: 'center', resizeMode: 'contain', tintColor: 'white' }} />
                            <Text style={[{ textAlign: 'center', fontSize: 15, color: 'white', fontFamily: fonts.medium },]}>Stop and Complete</Text>
                          </TouchableOpacity>
                          <GoBtn url={action_url} />
                        </>
                        :
                        <>
                          {
                            recordingIndex === -1 ?
                              <>
                                <TouchableOpacity style={[buttons.full, { width: width - 40 }]} activeOpacity={0.8} onPress={() => startRecording(index, id)}                          >
                                  <Image source={icons.record} style={{ width: 20, height: 20, alignSelf: 'center', resizeMode: 'contain', tintColor: 'white' }} />
                                  <Text style={[{ textAlign: 'center', fontSize: 15, color: 'white', fontFamily: fonts.medium },]}>{
                                    s === 'rejected' ? 'Retry Task' : 'Start Recording'
                                  }</Text>
                                </TouchableOpacity>
                              </>
                              :
                              <TouchableOpacity style={[buttons.full, { width: width - 40, backgroundColor: 'grey' }]} activeOpacity={0.8} disabled>
                                <Image source={icons.record} style={{ width: 20, height: 20, alignSelf: 'center', resizeMode: 'contain', tintColor: 'white' }} />
                                <Text style={[{ textAlign: 'center', fontSize: 15, color: 'white', fontFamily: fonts.medium },]}>Recording another task</Text>
                              </TouchableOpacity>
                          }
                        </>
                }
              </View>
          }
        </View>
        <SwipeUp bottomSwipeIcon={bottomSwipeIcon} topSwipeIcon={topSwipeIcon} isVisible={index == taskLen - 1 ? false : true} />
      </View>
    </View>

  }



  function copyToClipboard(text: string) {
    Clipboard.setString(text);
  }
}
function TaskAmount({ coins, endTime }: { coins: number, endTime: string }) {
  const [countdown, setCountdown] = useState<any>('')
  const now = new Date()
  const end = new Date(endTime)
  // Make a countdown timer
  useEffect(() => {
    function countdownTimer() {
      const now = new Date()
      const end = new Date(endTime)
      // Increment the time +24 hours
      // const diff = end.getTime() - now.getTime() 
      const diff = end.getTime() - now.getTime() + 24 * 60 * 60 * 1000
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setCountdown(hours + ':' + minutes + ':' + seconds)
    }

    // if (now.getTime() < end.getTime()) {
    if (true) {
      const interval = setInterval(() => {
        countdownTimer()
      }, 1000)
      return () => clearInterval(interval)
    } else {
      setCountdown(<Text style={{ color: 'red' }}>Expired</Text>)
    }
  }, [])


  return <View style={{ width: '100%', paddingHorizontal: 20, gap: 15, }}>
    <View style={{ backgroundColor: '#fafafa', borderRadius: 15, borderWidth: 0.5, borderColor: '#e5e5e5', flexDirection: 'row', justifyContent: 'space-between', }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 15, padding: 10, paddingHorizontal: 20 }}>
        <Image source={icons.coins} style={{ width: 30, height: 30, alignSelf: 'center', resizeMode: 'contain', }} />
        <Text style={{ fontSize: 20, fontFamily: fonts.medium, color: colors.text, textAlign: 'center', }}>
          {coins}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 15, padding: 10, paddingHorizontal: 20, }}>
        <Image source={icons.countdown} style={{ width: 25, height: 25, alignSelf: 'center', resizeMode: 'contain', }} />
        <Text style={{ fontSize: 20, fontFamily: fonts.medium, color: colors.text, textAlign: 'center', }}>
          {countdown}
        </Text>
      </View>
    </View>
  </View>
}

function WatchTutorial({ navigation }: any) {
  return <TouchableOpacity activeOpacity={0.7} onPress={() => {
    navigation.navigate('TaskTutorial', { isFromHome: false })
  }}>
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 10, }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, backgroundColor: colors.accentLight, padding: 15, borderRadius: 15, width: 'auto', paddingHorizontal: 20 }}>
        <Image source={icons.video} style={{
          width: 22, height: 22, alignSelf: 'center', resizeMode: 'contain',
        }}></Image>
        <Text style={{
          color: colors.accent, fontFamily: fonts.medium, fontSize: 14,
        }}>Watch Tutorial</Text>
      </View>
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


function Uploading({ progress, cancel }: { progress: number, cancel: Function }) {
  return <View>
    <Text style={{ fontSize: 14, fontFamily: fonts.medium, color: colors.text }}>Uploading {progress}%</Text>
    <View style={{
      width: width - 40, height: 5, backgroundColor: '#e5e5e5', borderRadius: 5, marginTop: 10,
    }}>
      <View style={{
        width: progress + '%', height: 5, backgroundColor: colors.accent, borderRadius: 5,
      }}>
      </View>
    </View>

    <ButtonFull styles={{
      width: width - 40, backgroundColor: 'red', marginTop: 20,
    }}
      title={"Cancel Uploading"} onPress={() => {
        cancel()
      }} />

  </View>
}


function getTaskStatus(status: string) {
  if (status === 'complete')
    return 'Task Completed Successfully'
  else if (status === 'processing')
    return 'Uploaded, Task Processing'
}

function getTaskStatusColor(status: string) {
  if (status === 'complete')
    return 'limegreen'
  else if (status === 'processing')
    return 'orange'
}


function TaskStatusUI({ status }: { status: string }) {
  return <View>
    <Text style={{
      fontSize: 20, fontFamily: fonts.medium,
      color: getTaskStatusColor(status),
      textAlign: 'center',
    }}>{getTaskStatus(status)}</Text>
  </View>
}

function TaskRejectedUI({ reason, retry }: { reason: string, retry: Function }) {
  return <View style={{ gap: 5, paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
    <Text style={{ fontSize: 14, fontFamily: fonts.medium, color: 'red' }}>This task was rejected once.</Text>
    <TouchableOpacity onPress={() => Alert.alert('Reason for Rejection', reason)}>
      <Text style={{ fontSize: 14, fontFamily: fonts.medium, color: colors.accent }}>See Why?</Text>
    </TouchableOpacity>
    <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.text, }}>But you can retry again by clicking the 'Start Recording' button bellow</Text>
  </View>
}