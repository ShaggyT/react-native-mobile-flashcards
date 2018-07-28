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
import PropTypes from 'prop-types'

class AddCardScreen extends Component {
  static propTypes = {
     navigation: PropTypes.object.isRequired
   }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card'
    }
  }
  state = {
    questionInput: '',
    answerInput: ''
  }

  createCard = () => {
    const  { questionInput , answerInput }  = this.state
    const { title } = this.props.navigation.state.params

    // update redux: saving specific card into redux store
    if (questionInput !== '' && answerInput !== '') {
      this.props.addCard(title, { questionInput , answerInput })
    }
    // clear the state
    this.setState({
      questionInput: '',
      answerInput: ''
    })

    // Navigate to Deck
    this.props.navigation.goBack()

    // save to DB
    if (questionInput !== '' && answerInput !== '') {
      addCardToDeck (title,{ questionInput , answerInput })
    }
  }

  render() {
    const { questionInput, answerInput } = this.state
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior='padding'
          style={styles.item}>
          <Text style={styles.inputLabel}>
            Write your Question
          </Text>
          <TextInput
            value={questionInput}
            style={styles.textInputField}
            onChangeText={(questionInput) => this.setState({questionInput})}
            placeholder="Question..."
            placeholderTextColor={placeholderGray}
          />
          <Text style={styles.inputLabel}>
            Write your Answer
          </Text>
          <TextInput
            value={answerInput}
            style={styles.textInputField}
            onChangeText={(answerInput) => this.setState({answerInput})}
            placeholder="Answer..."
            placeholderTextColor={placeholderGray}
          />
          {questionInput.length !== 0 && answerInput.length !== 0
            ?
            <TextButton
              style={{padding: 15 }}
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
  inputLabel: {
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
    addCard: (title, { questionInput , answerInput }) => dispatch(addCard(title, { questionInput , answerInput })),
  }
}

export default connect(null, mapDispatchToProps)(AddCardScreen)
