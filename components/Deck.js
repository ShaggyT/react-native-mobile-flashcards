import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


class Deck extends Component {
  //  adding static property to dynamically set navigation options
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Deck'
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Deck</Text>
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

export default Deck
