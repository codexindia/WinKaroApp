import React from 'react'
import { Image, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
const Tab = createBottomTabNavigator();
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Tabs/HomeScreen';
import Profile from './Tabs/Profile';
import ReferEarn from './Tabs/ReferEarn';
import Offer from './Tabs/Offer';
import icons from '../assets/icons/icons';
import { colors } from '../styles/colors';

const tabIcons: any = {
	'Home': {
		icon: icons.home,
		// style: {}
	},
	'Profile': {
		icon: icons.profile3,
	},
	'Refer & Earn': {
		icon: icons.refer,
	},
	'Offer': {
		icon: icons.offer,
	},
}


function CustomTabBar({ state, descriptors, navigation }: any) {
	return (
		<View style={styles.container}>
			{state.routes.map((route: any, index: any) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
							? options.title
							: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				return (
					<TouchableOpacity
						key={route.key}
						onPress={onPress}
						onLongPress={onLongPress}
						style={styles.tabItem}
						activeOpacity={0.9}
					>
						<View style={[styles.item, { opacity: isFocused ? 1 : 0.6 }]}>
							<Image source={tabIcons[label].icon} style={{ height: 22, width: 22, resizeMode: 'contain' }} />
							<Text style={{ fontSize: 13 }}>{label}</Text>
						</View>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}
const Home = () => {
	return (
		<Tab.Navigator tabBar={CustomTabBar}>
			<Tab.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
			<Tab.Screen name="Offer" component={Offer} />
			<Tab.Screen name="ReferEarn" component={ReferEarn} options={{ title: 'Refer & Earn', }} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	)
}


const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderTopColor: '#eee',
		paddingVertical: 5,

		// paddingHorizontal : 20,
	},
	tabItem: {
		flex: 1,
		alignItems: 'center',
		paddingVertical: 10,
		paddingBottom: 5,
		display: 'flex',
		justifyContent: 'center',
	},
	item: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 2
	}
});

export default Home
