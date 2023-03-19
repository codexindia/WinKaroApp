import {
	StyleSheet, Text, View,
	ScrollView, useWindowDimensions, Image, TouchableOpacity,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import { colors } from '../../../styles/colors';
import images from '../../../assets/images/images';
import { Touchable } from 'react-native';

const scrollImages = [
	'https://source.unsplash.com/random/500x300',
	'https://source.unsplash.com/random/500x300',
	'https://source.unsplash.com/random/500x300',
];


const Slider = () => {
	const dimensions = useWindowDimensions()
	const width = dimensions.width - 30
	const height = (width - 30) * 0.6
	const [activeSlideIndex, setActiveSlideIndex] = useState(0)
	const scrollSlider = useRef<ScrollView>(null)

	useEffect(() => {
		
	}), []

	return (
		<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, paddingBottom: 50 }}>
			<ScrollView
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={scrollingImages}
				scrollEventThrottle={100}
				style={{ width: dimensions.width, height, }}
				bounces={false}
				ref={scrollSlider}
				onTouchStart={scrollToCurrentIndex}
			>
				{
					scrollImages.map((image, index) => {
						return <TouchableOpacity key={index} activeOpacity={0.95}>
							<Image source={images.banner} style={[styles.bannerImage, { width: width, height, marginHorizontal: 15, backgroundColor: colors.inputBg }]} />
						</TouchableOpacity>
					})
				}
			</ScrollView>
			<View style={{ flexDirection: 'row', marginTop: 10, gap: 8 }}>
				{
					scrollImages.map((image, index) => {
						return <Dot key={index} active={index === activeSlideIndex} />
					})
				}
			</View>
		</View>
	)

	function scrollingImages({ nativeEvent }: any) {
		const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
		setActiveSlideIndex(slide)

	}
	function scrollToCurrentIndex() {

	}
	function autoScroll() {
		let offset = 0;

	}
}

function Dot({ active }: any) {
	return <View style={{
		// backgroundColor: active ? 'black' : 'gray',
		backgroundColor: 'black',
		opacity: active ? 0.5 : 0.2,
		height: 7.5, borderRadius: 10,
		aspectRatio: active ? 1.7 : 1,
	}}></View>
}



export default Slider

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: 'white',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	bannerImage: {
		resizeMode: 'contain',
		borderRadius: 20
	}
})