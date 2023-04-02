import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Spin() {
  const spinArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <View style={{
      flex: 1, backgroundColor: 'white',
    }}>
      {
        spinArr.map((item, index) => {
          return (
            <View key={index} style={styles.box} />
          )
        })
      }
    </View >
  )
}

const styles = StyleSheet.create({
  box: {
    width: 100, height: 100,
    backgroundColor: 'red',
  }
})