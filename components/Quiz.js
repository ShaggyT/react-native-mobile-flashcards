import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


class Quiz extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Add Deck</Text>
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

export default Quiz
