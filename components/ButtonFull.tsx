import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import buttons from '../styles/buttons'

const ButtonFull = ({ title, cb }: any) => {
    return (
        <TouchableOpacity style={buttons.full} onPress={cb} activeOpacity={0.8}>
            <Text style={{ textAlign: 'center', fontSize: 15, color: 'white' }}>{title || 'Sample Button'}</Text>
        </TouchableOpacity>
    )
}

export default ButtonFull

const styles = StyleSheet.create({})