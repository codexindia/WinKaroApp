import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Loading from '../../components/Loading'
import { colors } from '../../styles/colors'
import images from '../../assets/images/images'
import icons from '../../assets/icons/icons'
import input from '../../styles/input'
import ButtonFull from '../../components/ButtonFull'
import WithdrawHistory from './WithdrawHistory'
const data = [
  {
    name: 'Paytm Wallet',
    key: 'wallet',
  },
  {
    name: 'UPI ID',
    key: 'upi',
  },
]

function Radio({ data, updater, selectedValue }: any) {
  return (
    <View style={{
      flexDirection: 'row',
      gap: 20
    }}>
      {
        data.map((item: any, index: any) => {
          return (
            <TouchableOpacity activeOpacity={0.7} key={index}
              onPress={() => {
                updater(item.key)
              }}>
              <View key={index} style={{
                display: 'flex',
                gap: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <View style={[{
                  height: 21,
                  width: 21,
                  display: 'flex',
                  borderRadius: 20,
                  borderWidth: 1.5,
                  borderColor: '#000',
                  justifyContent: 'center',
                  alignItems: 'center',
                },]}>
                  {
                    selectedValue === item.key ?
                      <View style={{
                        height: 14,
                        width: 14,
                        borderRadius: 15,
                        backgroundColor: '#000',
                      }} />
                      : null
                  }
                </View>
                <Text style={{ color: colors.text, fontSize: 16, fontWeight: '500' }}
                >{item.name}</Text>
              </View>
            </TouchableOpacity>
          )
        })
      }</View>
  )
}

function inINR(amount: number) {
  // coins / 1000 but 2 digit after decimal
  return (amount / 1000).toFixed(2)
}

const Wallet = () => {
  const [selectedValue, setSelectedValue] = React.useState("wallet");
  const [balance, setBalance] = React.useState(157000);
  const [accTypePlaceholder, setAccTypePlaceholder] = useState('Paytm Wallet')

  return (
    <ScrollView style={{
      paddingHorizontal: 20, paddingBottom: 100, paddingTop: 0, width: '100%', backgroundColor: 'white',
    }}>
      {/* <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, marginTop : 20, marginBottom : 20 }}>Wallet and Withdraw</Text> */}
      <Text style={{ color: colors.text, fontSize: 16, marginTop: 10 }}>Your Balance</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 5 }}>
        <Image source={icons.coins} style={{ width: 30, aspectRatio: 1, }} />
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: colors.text }}>{balance} (₹ {inINR(balance)})</Text>
      </View>
      <View style={{ width: '100%' }}>
        <View style={{ width: '100%', }}>
          <Image source={images.wallet} style={{
            width: '100%', height: 250,
            resizeMode: 'contain',
            marginLeft: 'auto', marginRight: 'auto'
          }} />
        </View>
        <Text style={{ marginTop: 20, color: colors.text, fontSize: 14 }}><Text style={{ fontWeight: 'bold', }}>Note : </Text>The UPI or Paytm wallet of your first withdraw will be bounded to this account. You would not be able to bind another UPI to this account.</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={[styles.label]}>Select Account Type</Text>
        <Radio data={data} updater={setSelectedValue} selectedValue={selectedValue} />
        <View style={{ marginTop: 15, gap: 15 }}>
          {/* <Text style={[styles.label]}>Enter account information</Text> */}
          <View style={input.singleInputContainer}>
            <Image source={icons.at} style={[input.inputImage, { width: 23, height: 23 }]} />
            <TextInput
              // value={phoneNumber}
              // onChangeText={(text) => setPhoneNumber(text)}
              placeholderTextColor={colors.textLighter}
              style={input.textInput}
              placeholder="Your Paytm Wallet Number"
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
          {/* <Text style={[styles.label]}>Enter Amount</Text> */}
          <View style={input.singleInputContainer}>
            <Image source={icons.mobile_solid} style={[input.inputImage, { width: 23, height: 23 }]} />
            <TextInput
              // value={phoneNumber}
              // onChangeText={(text) => setPhoneNumber(text)}
              placeholderTextColor={colors.textLighter}
              style={input.textInput}
              placeholder="Amount to withdraw"
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
          <ButtonFull title='Withdraw' />
        </View>
      </View>


      <View style={{ marginTop: 50, marginBottom : 50 }}>
        <View style={{
          width: '100%',
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 20, color: colors.text, marginBottom : 10, fontWeight:'bold'
          }}>Withdraw History</Text>
          {/* <TouchableOpacity>
            <Text style={{ color: colors.accent, fontWeight: 'bold' }}>View All</Text>
          </TouchableOpacity> */}
        </View>

        <WithdrawHistory data={[
          { amount: 73, status: 'pending', to: '987654321@oksbi', date: '12 Jan 2023\n1:30 PM', ref : '98FT65GF4758' },
          { amount: 50, status: 'success', to: '987654321@oksbi', date: '12 Jan 2023\n1:30 PM', ref : '98YPO8ME4595'},
          { amount: 17, status: 'failed', to: '987654321@oksbi', date: '12 Jan 2023\n1:30 PM', ref : '9Y8SD4H26F5G' }
        ]} />

      </View>
    </ScrollView>
  )
}

export default Wallet

const styles = StyleSheet.create({
  label: {
    color: colors.gray,
    marginBottom: 10,
    marginTop: 10
  }
})