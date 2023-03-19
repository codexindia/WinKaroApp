// Different types of buttons styles will be here

import { StyleSheet } from 'react-native'
import { colors } from './colors'

export const buttons = StyleSheet.create({
    full: {
        backgroundColor: colors.accent,
        padding: 20,
        color: '#fff',
        borderRadius: 14,
        alignSelf: 'stretch',
        textAlign: 'center',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    button: {
        backgroundColor: colors.text,
        padding: 17,
        borderRadius: 14,
        margin: 10,
        width: 150,
        alignItems: 'center',
        color: '#fff',
        textAlign: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontFamily : 'Rubik-SemiBold'
    },
})

export default buttons