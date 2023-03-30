import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import icons from '../../assets/icons/icons'
import { colors } from '../../styles/colors'
import { fonts } from '../../styles/fonts'

const WithdrawHistory = ({ data }: any) => {
  return (
    <View style={{
      gap : 10
    }}>
      {
        data.map((item: any, index: number) => {
          return <View style={{
            display: 'flex', flexDirection: 'row',
            alignItems: 'center', justifyContent: 'space-between',
            borderBottomColor: '#eee', borderWidth: 1, padding : 20,
            borderColor: '#00000000', backgroundColor : colors.inputBg, borderRadius : 20,
          }} key={index}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <View>
                <Image source={icons.coins} style={{
                  height: 40, aspectRatio: 1, resizeMode: 'contain',
                }} />
              </View>
              <View>
                <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                  <Text style={{ fontSize: 20, color: colors.text, fontFamily: fonts.semiBold }}>₹ {item.amount}</Text>
                  <Text
                    style={{
                      textTransform: 'capitalize', fontFamily: fonts.medium,
                      color: getStatusColor(item.status)
                    }}
                  >{item.status}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                  <Text style={{ color: colors.gray, fontSize: 13, fontFamily: fonts.regular }}>to {item.to}</Text>
                  <Text style={{ fontSize: 12, color: colors.gray, opacity: 0.8, fontFamily: fonts.regular }}>{item.ref || ''}</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={{ color: colors.gray, fontSize: 13, textAlign: 'right', fontFamily: fonts.regular }}>{item.date}</Text>
            </View>
          </View>
        })
      }
    </View>
  )
}


function getStatusColor(color: string) {
  if (color === 'pending')
    return 'orange'
  else if (color === 'success')
    return 'limegreen'
  else if (color === 'failed')
    return 'red'
}

export default WithdrawHistory

const styles = StyleSheet.create({

})