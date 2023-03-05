import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';


const HomeScreen = () => {
    return (
        <View style={styles.main}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <Text>Home Screen</Text>
        </View>
    )
}


export default HomeScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        // backgroundColor: 'white'
    }
})