import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { Header } from 'react-native-elements'
import { blackStatusBar } from '../utils/colors'


class DeckList extends Component {

  render() {
    return (
      <View >
        <Header
           centerComponent={{ text: 'Mobile Flashcard', style: { color: '#fff' } }}
           backgroundColor={ blackStatusBar }
         />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Deck')}>
          <Text style={styles.container}>Deck List</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
})

export default DeckList
