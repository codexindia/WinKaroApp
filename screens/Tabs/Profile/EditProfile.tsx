import {
   TextInput, BackHandler,
   StyleSheet, Text, Image,
   View, ScrollView, TouchableOpacity
} from 'react-native'
import React from 'react'
import icons from '../../../assets/icons/icons'
import { colors } from '../../../styles/colors'
import styles from '../../login/styles'
import ButtonFull from '../../../components/ButtonFull'
import CustomModal from '../../../components/CustomModal'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import images from '../../../assets/images/images'
import { fonts } from '../../../styles/fonts'

const EditProfile = ({ route, navigation }: any) => {
   const [ppLink, setPpLink] = React.useState(null)
   const [name, setName] = React.useState(route.params.name || '')
   const [isUploading, setIsUploading] = React.useState(false)
   const [isImageSelected, setIsImageSelected] = React.useState(false)
   const [modals, setModals] = React.useState<any>([])
   // Disable back button
   React.useEffect(() => {
      const backAction = () => {
         // navigation.goBack()
         setModals([{
            title: "Are you sure?", description: "Are you sure you want to cancel edit profile?", active: true,
            buttons: [{ text: "No" },
            { text: "Yes", positive: true, onPress: async () => { navigation.goBack() }, },]
         }])
         return true
      }
      const backHandler = BackHandler.addEventListener(
         "hardwareBackPress",
         backAction
      )
      return () => backHandler.remove()
   }, [])


   async function selectPic() {
      console.log('selectPic')
      try {
         const res = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1, })
         if (res.didCancel || res.errorMessage) return
         setIsImageSelected(true)
         const uri: string = res?.assets[0]?.uri as string
      } catch (e) {
         console.log(e)
      }
   }


   return (
      <View className='flex-1 bg-white justify-between'>
         <CustomModal modals={modals} updater={setModals} />
         <View>
            <TouchableOpacity className='ml-auto mr-auto pb-10' activeOpacity={0.8} onPress={() => { selectPic() }}>
               <Image source={ppLink ? { uri: ppLink } : icons.user_icon}
                  style={{ width: 150, height: 150, borderRadius: 500, resizeMode: 'contain' }}
               />
               <View className='bg-white p-3 rounded-full' style={{
                  position: 'absolute', left: 100, top: 100, zIndex: 10, shadowColor: 'black', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 5, elevation: 5
               }}>
                  <Image source={icons.pencil} style={{
                     width: 20, height: 20, tintColor: colors.accent,
                  }} />
               </View>
            </TouchableOpacity>
            <Text style={{ color: colors.text, fontSize: 20, textAlign: 'center', fontFamily: fonts.semiBold }}>
               Profile Picture
            </Text>
         </View>

         <View className='p-5'>
            <Text style={styles.label} className='mb-3'>Your Name</Text>
            <View style={styles.singleInputContainer}>

               <Image source={icons.mobile_solid} style={[styles.inputImage, { width: 23, height: 23 }]} />
               <TextInput
                  value={name}
                  onChangeText={(text) => setName(text)}
                  placeholderTextColor={colors.textLighter}
                  style={styles.input}
                  placeholder="eg. Jhon Doe"
               />
            </View>
         </View>

         <View></View>
         <View className='p-5'>
            {/* <Text style={{
               fontFamily: fonts.regular, color: colors.textLighter, backgroundColor: '#fafafa', padding: 20,
               borderRadius: 20, borderWidth: 0.5, borderColor: '#e5e5e5'
            }}>
               By using the name and profile picture you provide, you agree to our Terms and Conditions and Privacy Policy. You also agree to receive product-related emails from us.
            </Text> */}
         </View>

         <View className='p-5'>
            <ButtonFull title='Save' onPress={() => { }} />
         </View>
      </View>
   )
}

export default EditProfile
