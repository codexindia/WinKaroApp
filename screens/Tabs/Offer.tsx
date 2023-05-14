import {
  StyleSheet, Text, View, Image,
  TextInput,
  TouchableOpacity, Linking, Modal, Dimensions, Alert
} from 'react-native'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { colors } from '../../styles/colors'
import { fonts } from '../../styles/fonts'
import images from '../../assets/images/images'
import icons from '../../assets/icons/icons'
import ButtonFull from '../../components/ButtonFull'
import Loading from '../../components/Loading'
import { API, API_URL } from '../../appData'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getDefaultHeader } from '../methods'
import { useIsFocused } from '@react-navigation/native'

type OfferData = {
  id: number,
  title: string,
  claimed: boolean,
  action?: () => void,
  name: string,
  status?: string,
  link?: {
    link: string,
    linkIcon: any,
    linkText: string,
  }
}

const { width, height } = Dimensions.get('window')


const Offer = ({ navigation }: any) => {

  const [uerNameModal, setUserNameModal] = React.useState(false)
  const [pleaseWaitModal, setPleaseWaitModal] = React.useState({ visible: false, text: "" })
  const [congratulationModal, setCongratulationModal] = React.useState({ visible: false, coins: 0, text: '' })
  const focused = useIsFocused()

  const offersData: OfferData[] = [
    {
      id: 1,
      title: 'Claim 1000 Coins after completing 10 YouTube valid tasks continuously without any one task gap.',
      claimed: true,
      name: 'yt_task_milestone',
      status: 'claim'
    },
    {
      id: 2,
      title: 'Join a Telegram Channel to claim 100 coins.',
      claimed: false,
      name: 'telegram_task',
      action: () => {
        setUserNameModal(true)
      },
      status: 'claim',
      link: {
        link: 'https://www.youtube.com/watch?v=7X3L1dXf9KQ',
        linkIcon: icons.telegram,
        linkText: 'Join Telegram Channel'
      }
    },
    // {
    //   id: 3,
    //   // title: 'Subscribe on YouTube ( Claim 100 coins )',
    //   title: 'Claim 100 coins after subscribing to a YouTube channel.',
    //   claimed: true,
    // },
    {
      id: 4,
      title: 'Install an app and complete a task to claim 200 coins.',
      claimed: true,
      name: 'app_install_task',
      status: 'claim',
    }
  ]

  const [loadTaskData, setLoadTaskData] = React.useState(false)
  const [offersStatus, setOffersStatus] = React.useState(offersData)

  async function getOfferStatus() {
    const token = await AsyncStorage.getItem('token')
    const headers = getDefaultHeader(token)

    try {
      const response = await fetch(API_URL.offer_status, {
        method: 'POST',
        headers: headers,
      })
      const data = await response.json()
      console.log(data)

      // Set offers status
      if (data.status === 'true' || data.status === true) {
        const status = data.data
        const offersStatus = [...offersData]
        status.forEach((item: any) => {
          const index = offersStatus.findIndex((offer) => offer.name === item.name)
          if (index !== -1) {
            offersStatus[index].status = item.status
          }
        })
        setOffersStatus(offersStatus)
        setLoadTaskData(true)
      }
    } catch (err) {
      Alert.alert('There is some error while fetching offers status. Please check your internet connection. And try again later.')
    }
  }

  useEffect(() => {
    if (focused) {
      setLoadTaskData(false)
      getOfferStatus()
    }
  }, [focused])



  const claimTelegramOffer = () => {
    setUserNameModal(false)
    setPleaseWaitModal({
      visible: true,
      text: "We are verifying your username"
    })


    offersData[1].claimed = true
    setTimeout(() => {
      setPleaseWaitModal({ visible: false, text: "" })
      setCongratulationModal({
        visible: true,
        coins: 100,
        text: 'You have successfully claimed 100 coins.'
      })
    }, 1000);
  }



  return (
    <ScrollView style={{
      backgroundColor: 'white',
    }}>
      <View>
        <View style={styles.top}>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 15, paddingVertical: 5 }}>
            <Text style={{ fontSize: 20, color: colors.text, fontFamily: fonts.bold }}>Offers</Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%' }}>
          <Image source={images.offers} style={{
            width: '100%',
            padding: 20,
            height: 250,
            resizeMode: 'contain'
          }} />
        </View>
      </View>

      <Modal animationType="fade" transparent={true} visible={uerNameModal}>
        <View className='flex-1 bg-[#00000033] justify-center items-center'>
          <View className='w-[90%] bg-white p-7 rounded-2xl'>
            <Text className='text-center text-[#000] text-lg' style={{ fontFamily: fonts.medium }}>
              Enter your telegram username
            </Text>
            <View className='justify-between items-center mt-7'>
              <TextInput
                placeholder='Enter your telegram username'
                style={{
                  borderWidth: 1,
                  fontFamily: fonts.medium,
                }}
                className='w-[100%] p-3 rounded-xl border-[#ccc] pl-4 text-base'
              />
              <View className='w-[100%] mt-4'>
                <ButtonFull title="Claim" onPress={claimTelegramOffer} />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/*Please Wait Modal */}
      <Modal animationType="fade" transparent={true} visible={pleaseWaitModal.visible}>
        <View className='flex-1 bg-[#00000033] justify-center items-center'>
          <View className='w-[90%] bg-white p-7 rounded-2xl'>
            <Text className='text-center text-[#000] text-lg' style={{ fontFamily: fonts.medium }}>
              Please Wait
            </Text>
            <View className='mt-5'>
              <Image source={icons.loading}
                style={{ resizeMode: 'contain', }}
                className='w-20 h-20 rounded-full opacity-70 mx-auto'
              />
            </View>
            <Text className='text-center text-[#000] text-lg mt-5' style={{ fontFamily: fonts.medium }}>
              {pleaseWaitModal.text}
            </Text>
          </View>
        </View>
      </Modal>

      {/*Congratulation Modal */}
      <Modal animationType="fade" transparent={true} visible={congratulationModal.visible}>
        <View className='flex-1 bg-[#00000044] justify-center items-center'>
          <View className='bg-white rounded-2xl overflow-hidden' style={{ width: width * 0.85 }}>
            <Image source={images.congrats}
              style={{ resizeMode: 'contain', width: '100%', height: 561 / 1000 * width * 0.85 }}
              className=' mx-auto'
            />
            <View className='flex-row justify-center items-center mt-5'>
              <View className='bg-[#00000010] flex-row justify-center items-center rounded-xl p-3 px-4'>
                <Image source={icons.coin}
                  style={{ resizeMode: 'contain', width: 30, height: 30, }}
                />
                <Text className='text-center text-[#000] text-3xl ml-3' style={{ fontFamily: fonts.bold }}>
                  {congratulationModal.coins || 100}
                </Text>
              </View>
            </View>

            <View className='p-10'>
              <Text className='text-center text-[#000] text-base mb-5' style={{ fontFamily: fonts.medium }}>
                {congratulationModal.text}
              </Text>
              <ButtonFull title="Ok" onPress={() => {
                setCongratulationModal({
                  visible: false,
                  coins: 0,
                  text: 'You have successfully claimed 100 coins.'
                })
              }} />
            </View>
          </View>
        </View>
      </Modal>


      <View style={{ marginTop: 30 }}>
        {/* <Text style={{ fontSize: 18, fontFamily: fonts.semiBold, textAlign: 'center', color: colors.text }}>Offers to Claim</Text> */}
        {/* <View style={{ padding: 20, gap: 10 }}> */}
        {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 15, backgroundColor: colors.accent, padding: 15, borderRadius: 20, }}>
            <View><Image source={icons.offer} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: "white" }}></Image></View>
            <View><Text style={{ fontSize: 16, fontFamily: fonts.regular, color: 'white', marginRight: 35 }}>
              <Text>
                Claim 1000  Coins after completing 10 YouTube valid tasks continuously without any one task gap.
              </Text>
            </Text>
              <TouchableOpacity>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 10, marginTop: 10 }}>
                  <Image source={icons.youtube_icon} style={{ width: 20, aspectRatio: 1, resizeMode: 'contain', }} />
                  <Text style={{ fontSize: 15, fontFamily: fonts.semiBold, color: 'white' }}>Demo Video</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View> */}

        {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 15, backgroundColor: colors.accent, padding: 15, borderRadius: 20, }}>
            <View><Image source={icons.offer} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: "white" }}></Image></View>
            <View><Text style={{ fontSize: 16, fontFamily: fonts.regular, color: 'white', marginRight: 35 }}>
              Join a Telegram Channel to claim 100 coins.
            </Text>
            </View>
          </View> */}

        {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 15, backgroundColor: colors.accent, padding: 15, borderRadius: 20, }}> */}
        {/* <View><Image source={icons.offer} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: "white" }}></Image></View> */}
        {/* <View><Text style={{ fontSize: 16, fontFamily: fonts.regular, color: 'white', marginRight: 35 }}> */}
        {/* Install task ( 200 coins ) YouTube png ( clickable ) ( demo video yt link  )  claim button ( link redirect ) Text submit button . */}
        {/* Install an app and complete a task to claim 200 coins. */}
        {/* </Text> */}
        {/* </View> */}
        {/* </View> */}

        {/* </View> */}

        {/* <Text style={{ fontSize: 18, fontFamily: fonts.semiBold, textAlign: 'center', color: colors.text }}>Completed Tasks</Text> */}


        <View className='p-5 gap-3'>
          {/* <View className='flex-row bg-[#eeeeee] p-4 rounded-2xl justify-between'>
            <Text className='text-[#000] w-[75%]' style={{
              fontFamily: fonts.medium,
            }}>Claim 1000  Coins after completing 10 YouTube valid tasks continuously without any one task gap.</Text>
            <TouchableOpacity activeOpacity={1}>
              <View className='p-3 px-5 w-20% rounded-xl opacity-70' style={{
                backgroundColor: colors.accent,
              }}>
                <Text className='text-white'>Claimed</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View> */}
          {
            loadTaskData ?
              offersStatus.map((item: OfferData, index: number) => {
                const isActiveBtnClaim = isActiveClaimButton(item.status!)
                console.log(isActiveBtnClaim)

                return <View className='bg-[#eeeeee] p-4 rounded-2xl ' key={index}>
                  <View className='flex-row justify-between'>
                    <Text className='text-[#000] w-[70%]' style={{ fontFamily: fonts.medium, }}>{item.title}</Text>
                    <TouchableOpacity activeOpacity={!isActiveBtnClaim ? 1 : 0.7} onPress={item.action} disabled={!isActiveBtnClaim}>
                      <View className='p-3 px-4 rounded-xl' style={{ backgroundColor: colors.accent, opacity: !isActiveBtnClaim ? 0.7 : 1 }}>
                        <Text className='text-white'>{
                          getTaskStatusButtonText(item.status!)
                        }</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {
                    item.link &&
                    <View className=''>
                      <TouchableOpacity onPress={() => { Linking.openURL(item.link?.link as string) }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 10, marginTop: 5 }}>
                          <Image source={item.link.linkIcon} style={{ width: 20, aspectRatio: 1, resizeMode: 'contain', }} />
                          <Text style={{ fontSize: 15, fontFamily: fonts.semiBold, color: colors.accent }}>{item.link.linkText}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  }
                </View>
              }) :
              <View className='pt-20'>
                <Loading />
                <Text className='text-center text-[#000] text-lg mt-5'>
                  Loading...
                </Text>
              </View>
          }
        </View>
      </View>
    </ScrollView>
  )
}

function getTaskStatusButtonText(status: string) {
  if (status === 'complete') return 'Claimed'
  if (status === 'processing') return 'Processing'
  if (status === 'reject') return 'Rejected'
  if (status === 'claim') return 'Claim'
}

function isActiveClaimButton(status: string) {
  if (status === 'claim') return true
  if (status === 'complete') return false
  if (status === 'processing') return false
  if (status === 'reject') return false
  return true
}


export default Offer

const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
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
})