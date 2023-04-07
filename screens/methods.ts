import AsyncStorage from "@react-native-async-storage/async-storage"

export function getDefaultHeader(token: any) {
   const headers: any = {
      'secret': 'hellothisisocdexindia'
   }
   if (token) {
      headers.Authorization = 'Bearer ' + token
      headers['Content-Type'] = 'application/json'
      headers.Accept = 'application/json'
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json',
   }
   return headers
}

export async function storeUserData(res: any) {
   const userData = {
      name: res.data.name,
      email: res.data.email,
      phone: res.data.phone,
      refer_code: res.data.refer_code,
      balance: res.data.balance,
      unread_alert: res.unread_alert,
   }
   await AsyncStorage.setItem('userData', JSON.stringify(userData))
   console.log('User data is stored in AsyncStorage')
}