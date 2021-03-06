import React, { Component } from 'react'
import { View, Dimensions, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import PropTypes from 'prop-types'

const backImage = require('./../../assets/ios_back.png')

const { height, width } = Dimensions.get('window')
const totalSize = (num) => (Math.sqrt(height * height + width * width) * num) / 100

export default class NavigationBar extends Component {
	render() {
		return (
			<View style={styles.navBar}>
				<Text style={styles.title}>{this.props.chatTitle}</Text>
				<TouchableOpacity style={styles.back} onPress={this.props.closeChat}>
					<Image key={Math.random()} source={backImage} style={styles.backIcon} resizeMode="stretch" />
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	navBar: {
		height: Platform.OS === 'ios' ? height / 11 : height / 12,
		backgroundColor: '#fff',
		borderBottomColor: '#fff',
		borderBottomWidth: 1,
		flexDirection: 'row',
		paddingTop: Platform.OS === 'ios' ? height / 25 : height / 40,
	},
	back: {
		flexDirection: 'row',
		marginLeft: width / 40,
	},
	backIcon: {
		height: height / 30,
		width: height / 60,
	},
	backText: {
		color: '#007fff',
		fontSize: totalSize(2),
		paddingLeft: width / 40,
	},
	title: {
		color: '#FFAB50',
		// fontSize: totalSize(2.1),
		fontWeight: '500',
		position: 'absolute',
		width,
		textAlign: 'center',
		backgroundColor: 'transparent',
		// textTransform: 'uppercase',
		fontFamily: 'Circular Std',
		fontSize: 18,
		paddingTop: Platform.OS === 'ios' ? height / 25 : height / 40,
	},
})

NavigationBar.propTypes = {
	closeChat: PropTypes.func.isRequired,
	chatTitle: PropTypes.string.isRequired,
}
