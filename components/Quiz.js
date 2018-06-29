import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { ButtonGroup } from 'react-native-elements'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { whiteBackground,gray } from '../utils/colors'

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: `${title} Quiz `
    }
  }

  render() {
    const { deck } = this.props
    return (
      <View style={styles.container}>
        <Text style={{marginBottom: 10, fontSize: 20}}>{deck.questions[0].question}</Text>
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.showAnswerText}>
            Answer
          </Text>
        </TouchableOpacity>
        <TextButton
          style={{padding: 10}} >
          Correct
        </TextButton>
        <TextButton
          style={{padding: 10}}>
          Incorrect
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showAnswerText: {
    color: gray,
    fontSize: 18
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:50
  },
})


function mapStateToProps (state, { navigation }) {
 // comes form Deck - when we navigate to Deck, passing title
  const { title } = navigation.state.params
  return {
    deck: state[title]
  }
}

export default connect(mapStateToProps)(Quiz)
