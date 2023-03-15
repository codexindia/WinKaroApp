import { StyleSheet, Text, View, Modal, Alert, TouchableOpacity } from 'react-native'
import React from 'react'

const Promotion = () => {
  const [modalVisible, setModalVisible] = React.useState(false)
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <TouchableOpacity onPress={() => {
        setModalVisible(true)
        // Alert.alert('Modal has been closed')
      }}>
        <Text>Promotion</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
          <View style={{
            backgroundColor: 'white',
            width: '80%',
            height: '50%',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <TouchableOpacity onPress={()=>{setModalVisible(false)}}>
              <Text>Close modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Promotion

const styles = StyleSheet.create({})