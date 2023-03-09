import { StyleSheet, Text, View, Animated, TouchableOpacity, Easing, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import icons from '../assets/icons/icons';

const Loading = () => {

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#fff',
			}}
		>
			<View
				style={{
					borderRadius: 100,
					borderWidth: 1,
					borderColor: '#f5f5f5',
				}}>

				<View
					style={{
						width: 70,
						aspectRatio: 1,
						borderRadius: 100,
						borderBottomColor: "#999",
						borderBottomWidth: 2,
					}}
				>
					<Image source={icons.loading} style={{ width: 70, height: 70, borderRadius: 100 }} />

				</View>
			</View>
		</View>
	)
};

export default Loading;