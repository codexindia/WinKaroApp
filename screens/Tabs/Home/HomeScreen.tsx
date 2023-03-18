import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
	Image, SafeAreaView, ScrollView, StatusBar, StyleSheet,
	Text, TouchableOpacity, View
} from 'react-native';
import icons from '../../../assets/icons/icons';
import { colors } from '../../../styles/colors';
import { UserData } from '../../types';
import Slider from './Slider';



const HomeScreen = ({ navigation }: any) => {
	const [name, setName] = useState('')

	setTimeout(async () => {
		const userData = await AsyncStorage.getItem('userData')
		let data: UserData = JSON.parse(userData as string)
		setName(data.name.split(' ')[0])
	}, 0);


	return (
		<SafeAreaView>
			<StatusBar barStyle="dark-content" backgroundColor="white" />
			<View style={styles.top}>
				<TouchableOpacity activeOpacity={0.8}
					onPress={() => navigation.navigate('Profile')}
				>
					<View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 15 }}>
						<Image source={icons.user_icon} style={styles.topImage} />
						<Text style={{ fontSize: 20, color: colors.text, fontWeight: 'bold' }}>{name}</Text>
					</View>
				</TouchableOpacity>
				<View style={[styles.flexRow, { gap: 20 }]}>
					<TouchableOpacity activeOpacity={0.7}
						onPress={() => navigation.navigate('Wallet')}
					>
						<View style={[styles.flexRow, {
							backgroundColor: colors.inputBg,
							paddingHorizontal: 10,
							paddingVertical: 5,
							borderRadius: 50
						}]}>
							<Image source={icons.coin_dollar} style={[styles.topImage, { width: 20, height: 20 }]} />
							<Text style={{
								fontSize: 16,
								color: colors.text,
							}}>1200</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.8}
						onPress={() => navigation.navigate('Notifications')}
					>
						<View>
							<Image source={icons.notification_icon} style={[styles.topImage, { width: 20, height: 20, opacity: 0.9 }]} />
							<View style={styles.dot}></View>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<ScrollView style={{ backgroundColor: 'white', width: '100%' }}>
				<Slider />
			</ScrollView>
		</SafeAreaView>
	)
}


export default HomeScreen;

const styles = StyleSheet.create({
	mainBody: {
		flex: 1,
		width: '100%',
		paddingHorizontal: 20,
		paddingVertical: 10,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 100,
		gap: 20,
		// backgroundColor: 'red',
	},
	main: {
		// flex: 1,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',

	},
	top: {
		// flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 10,
		paddingBottom: 12,
		width: '100%',
		// borderBottomWidth: 1,
		// borderBottomColor: '#f5f5f5',
		justifyContent: 'space-between',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: 'white'
	},
	topImage: {
		height: 40,
		width: 40,
		resizeMode: 'contain'
	},
	flexRow: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 10
	},
	dot: {
		height: 8,
		width: 8,
		borderRadius: 50,
		backgroundColor: colors.accent,
		position: 'absolute',
		marginLeft: 17,
		marginTop: -4
	}
})

// const 