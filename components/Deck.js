import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { gray  } from '../utils/colors'
import TextButton from './TextButton'

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
        <View>
          <Text style={styles.header}>
            Hello
          </Text>
          <Text style={styles.subHeader}>
            3 Cards
          </Text>
        </View>
        <TextButton style={{padding: 10}} onPress={() => this.props.navigation.navigate('AddCard')}>
          Add Card
        </TextButton>
        <TextButton style={{padding: 10}} onPress={() => this.props.navigation.navigate('Quiz')}>
          Start Quiz
        </TextButton>
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
  header: {
    fontSize: 30,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
    color: gray,
    marginBottom: 50,
  },
})

export default Deck
