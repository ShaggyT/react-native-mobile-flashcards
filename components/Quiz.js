import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Start Quiz'
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Start Quiz</Text>
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
