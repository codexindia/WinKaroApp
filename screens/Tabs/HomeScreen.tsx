import React from 'react';
import {
    StatusBar, StyleSheet,
    Text, View,
    Image,
} from 'react-native';
import icons from '../../assets/icons/icons';


const HomeScreen = () => {
    return (
        <View style={styles.main}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View>
                <Image source={icons.profile} />

            </View>
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
        backgroundColor: 'white'
    }
})