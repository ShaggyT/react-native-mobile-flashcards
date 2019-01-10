import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { Header, Card } from 'react-native-elements'
import { blackStatusBar, lightGreen, gray, placeholderGray } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
import { cardsCount } from '../utils/helpers'
import { AppLoading } from 'expo'
import { getDecks } from '../utils/api'
import PropTypes from 'prop-types'


class SplashScreen extends Component {
  // static propTypes = {
  //   header: null,
  //  }
   componentWillMount() {
     setTimeout(()=> {
       this.props.navigation.navigate('HomeScreen')
     }, 1000)
   }

  render() {

    return (
      <View style={styles.container}>
        <Text>Splash Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: placeholderGray,
  },
})



export default SplashScreen
