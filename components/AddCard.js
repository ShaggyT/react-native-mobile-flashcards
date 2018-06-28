import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { blackStatusBar, lightGreen, whiteHeader, whiteBackground, gray } from '../utils/colors'
import { submitEntry } from '../utils/api'
import { addDeck } from '../actions'
import { connect } from 'react-redux'

function SubmitBtn ({onPress}) {
  return(
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card'
    }
  }
  state = {

    question: '',
    answer: ''
  }

  submit = () => {
        const  { question , answer }  = this.state

        // update redux
        //  saving specific deck into redux store

        // clear the state
        this.setState({
          question: '',
          answer: ''
        })

        // Navigate to home

        // save to DB

    }
  render() {
    const { question, answer } = this.state
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <Text style={styles.text}>
            Write your Question ...
          </Text>
          <TextInput
            value={question}
            style={styles.input}
            onTextChange={(question) => this.setState({question})}
            placeholder="Question..."
          />
          <Text style={styles.text}>
            Write your Answer...
          </Text>
          <TextInput
            value={answer}
            style={styles.input}
            onTextChange={(answer) => this.setState({answer})}
            placeholder="Answer..."
          />
          <SubmitBtn
            onPress={this.submit}
          />
        </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blackStatusBar,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteBackground,
    padding: 20,
  },

  input: {
    width: 300,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: gray,
    margin: 50,
    marginTop: 20,
    color: blackStatusBar,
    borderRadius: Platform.OS === 'ios' ? 4 : 1,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  img: {
    width: 100,
    height: 100,
    margin: 50,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: lightGreen,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    width: 200,
  },
  AndroidSubmitBtn: {
    backgroundColor: lightGreen,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: whiteHeader,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  text: {
    fontSize: 16,
  },
})

export default connect()(AddCard)
