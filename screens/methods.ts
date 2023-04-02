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