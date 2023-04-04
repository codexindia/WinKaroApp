import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
	Image, SafeAreaView, ScrollView, StatusBar, StyleSheet,
	Text, TouchableOpacity, View
} from 'react-native';
import icons from '../../../assets/icons/icons';
import { colors } from '../../../styles/colors';
import { fonts } from '../../../styles/fonts';
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
		<SafeAreaView style={{ paddingBottom: 50, backgroundColor: 'white', flex: 1 }}>
			<StatusBar barStyle="dark-content" backgroundColor="white" />
			<View style={styles.top}>
				<TouchableOpacity activeOpacity={0.8}
					onPress={() => navigation.navigate('Profile')}
				>
					<View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 15 }}>
						<Image source={icons.user_icon} style={styles.topImage} />
						<Text style={{ fontSize: 19, color: colors.text, fontFamily: fonts.semiBold }}>{name}</Text>
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
								fontSize: 15, fontFamily: fonts.medium,
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
				<Tasks navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	)
}

function Tasks({ navigation }: any) {

	useEffect(() => {

	}, [])


	const tasks = [
		{
			name: 'Youtube Tasks',
			icons: icons.youtube,
			callback: () => {
				AsyncStorage.getItem('dontShowYoutubeTaskTutorial').then((data) => {
					if (data === 'true') {
						navigation.navigate('YouTubeTask')
					} else {
						navigation.navigate('YouTubeTaskTutorial')
					}
				})
			}
		},
		{
			name: 'Yt Short Tasks',
			icons: icons.youtube_shorts,
			callback: () => console.log('Yt Short')
		},
		{
			name: 'Instagram Tasks',
			icons: icons.insta,
			callback: () => console.log('Instagram')
		},
		{
			name: 'App install Tasks',
			icons: icons.download,
			callback: () => console.log('App'),
			background: '#fff'
		},
		{
			name: 'Watch and Earn',
			icons: icons.watch_and_earn,
			callback: () => console.log('App')
		},
		{
			name: 'Spin and \nEarn',
			icons: icons.spin_and_earn,
			callback: () => navigation.navigate('Spin')
		},
	]
	return (
		<View>
			<Text style={{ paddingLeft: 25, paddingBottom: 10, fontSize: 18, fontFamily: fonts.bold, color: colors.text }}>Explore tasks</Text>
			<View style={taskStyles.container}>
				{
					tasks.map((task, index) => {
						return (
							<View key={index} style={{ width: '30%' }}>
								<TouchableOpacity activeOpacity={0.5} onPress={task.callback}>
									<View style={taskStyles.task}>
										<Image source={task.icons} style={[taskStyles.image, { backgroundColor: task.background ? task.background : '#fff' }]} />
										<Text style={taskStyles.taskName}>{task.name}</Text>
									</View>
								</TouchableOpacity>
							</View>
						)
					})
				}
			</View>
		</View>
	)
}

export default HomeScreen;

const taskStyles = StyleSheet.create({
	container: {
		width: '100%',
		paddingHorizontal: 20,
		backgroundColor: 'white',
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'space-between',
		// alignItems: 'center',
	},
	task: {
		backgroundColor: '#f5f5f5',
		marginTop: 15,
		borderRadius: 20,
		padding: 15,
		// backgroundColor: 'red',
	},
	image: {
		// tintColor: 'red',
		width: 70,
		height: 70,
		marginLeft: 'auto',
		marginRight: 'auto',
		resizeMode: 'contain',
		borderRadius: 15,
		backgroundColor: 'white',
	},
	taskName: {
		textAlign: 'center',
		marginTop: 10, fontFamily: fonts.medium,
		color: colors.text,
		fontSize: 13
	}
})

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
		borderBottomWidth: 1,
		borderBottomColor: '#f5f5f5',
		justifyContent: 'space-between',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: 'white',
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