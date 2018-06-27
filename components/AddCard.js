import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card'
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Add Card</Text>
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

export default AddCard
