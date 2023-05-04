import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { colors } from '../../styles/colors'
import { fonts } from '../../styles/fonts'
import images from '../../assets/images/images'
import icons from '../../assets/icons/icons'


const offersData = [
  {
    id: 1,
    title: 'Claim 1000  Coins after completing 10 YouTube valid tasks continuously without any one task gap.',
    claimed: true,
  }, {
    id: 2,
    title: 'Join a Telegram Channel to claim 100 coins.',
    claimed: true,
  },
  {
    id: 3,
    // title: 'Subscribe on YouTube ( Claim 100 coins )',
    title: 'Claim 100 coins after subscribing to a YouTube channel.',
    claimed: true,
  },
  {
    id: 4,
    title: 'Install an app and complete a task to claim 200 coins.',
    claimed: true,
  }
]



const Offer = ({ navigation }: any) => {
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

            offersData.map((item: any, index: number) => {
              return <View className='flex-row bg-[#eeeeee] p-4 rounded-2xl justify-between' key={index}>
                <Text className='text-[#000] w-[75%]' style={{ fontFamily: fonts.medium, }}>{item.title}</Text>
                <TouchableOpacity activeOpacity={1}>
                  <View className='p-3 px-5 w-20% rounded-xl' style={{ backgroundColor: colors.accent, opacity: item.claimed ? 0.7 : 1 }}>
                    <Text className='text-white'>{item.claimed ? 'Claimed' : 'Claim'}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            })}
        </View>
      </View>



    </ScrollView>
  )
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