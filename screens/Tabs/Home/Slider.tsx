import {
	StyleSheet, Text, View,
	ScrollView, useWindowDimensions, Image,
} from 'react-native'
import React, { useRef } from 'react'
import { FlatList } from 'react-native'
import { colors } from '../../../styles/colors';

const images = [
	'https://source.unsplash.com/random/500x300',
	'https://source.unsplash.com/random/500x300',
	'https://source.unsplash.com/random/500x300',
];

const Slider = () => {
	const [currentIndex, setCurrentIndex] = React.useState(0)
	const { width } = useWindowDimensions()
	const scrollViewRef = useRef();

	const height = width * 0.6
	// const handleIndexChange = (event: any) => {
	// 	const offsetX = event.nativeEvent.contentOffset.x;
	// 	const index = Math.round(offsetX / width);
	// 	setCurrentIndex(index);
	// };
	return (
		// <View style={{ flex: 1 }}>
		// 	<ScrollView
		// 		// ref={scrollViewRef}
		// 		horizontal={true}
		// 		pagingEnabled={true}
		// 		showsHorizontalScrollIndicator={false}
		// 	// onMomentumScrollEnd={handleIndexChange}
		// 	>
		// 		{images.map((image, index) => (

		// 			<View key={index}>
		// 				<Image
		// 					key={index}
		// 					source={{ uri: image }}
		// 					style={{ width, height }}
		// 					resizeMode="cover"
		// 				/>
		// 				<Text>Hii</Text>
		// 			</View>
		// 		))}
		// 	</ScrollView>
		// </View>

		<View style={{
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			height: height,
			padding: 20,
		}}>
			<View style={{
				backgroundColor: colors.inputBg,
				flex: 1,
				width: '100%',
				height: height,
				borderRadius : 25,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',

			}}>
				<Text>Image Slider</Text>
			</View>
		</View>
	)
}

export default Slider

const styles = StyleSheet.create({})