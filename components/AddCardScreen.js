import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform, 
} from 'react-native'
import { blackStatusBar, gray, placeholderGray } from '../utils/colors'
import { addCard  } from '../actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { addCardToDeck } from '../utils/api'
import TextButton from './TextButton'
import AlertButton from './AlertButton'

class AddCardScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card'
    }
  }
  state = {
    question: '',
    answer: ''
  }

  createCard = () => {
    const  { question , answer }  = this.state
    const { title } = this.props.navigation.state.params
    const card = {
      question: question,
      answer: answer
    }

    // update redux: saving specific card into redux store
    this.props.addCard(title, card)

    // clear the state
    this.setState({
      question: '',
      answer: ''
    })

    // Navigate to Deck
    this.props.navigation.goBack()

    // save to DB
    addCardToDeck (title,card)
  }

  render() {
    const { question, answer } = this.state
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior='padding'
          style={styles.item}>
          <Text style={styles.text}>
            Write your Question
          </Text>
          <TextInput
            value={question}
            style={styles.textInputField}
            onChangeText={(question) => this.setState({question})}
            placeholder="Question..."
            placeholderTextColor={placeholderGray}
          />
          <Text style={styles.text}>
            Write your Answer
          </Text>
          <TextInput
            value={answer}
            style={styles.textInputField}
            onChangeText={(answer) => this.setState({answer})}
            placeholder="Answer..."
            placeholderTextColor={placeholderGray}
          />
          {question.length !== 0 && answer.length !== 0
            ?
            <TextButton
              style={{padding: 10 }}
              onPress={this.createCard}>
              Create Card
            </TextButton>
          :
          <AlertButton />
          }
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: placeholderGray,
  },

  textInputField: {
    width: 300,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: gray,
    margin: 50,
    marginTop: 20,
    color: '#fff',
    borderRadius: Platform.OS === 'ios' ? 4 : 1,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  text: {
    fontSize: 16,
    color: '#fff'
  },
  item: {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: blackStatusBar,
  padding: 20,
  borderRadius: Platform.OS === 'ios' ? 16 : 2,
  padding: 20,
  marginLeft: 10,
  marginRight: 10,
  justifyContent: 'center',
  marginTop: 145,
  shadowRadius: 3,
  shadowOpacity: 0.8,
  shadowColor: 'rgba(0, 0, 0, 0.24)',
  shadowOffset: {
    width: 0,
    height: 3
    },
  },
})


function mapDispatchToProps (dispatch) {
  return {
    addCard: (title, card) => dispatch(addCard(title, card)),
  }
}

export default connect(null, mapDispatchToProps)(AddCardScreen)
