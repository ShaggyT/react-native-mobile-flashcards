import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native'
import { blackStatusBar, lightGreen, whiteHeader, whiteBackground, gray } from '../utils/colors'
import { addDeck } from '../actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { saveDeckTitle } from '../utils/api'

function SubmitBtn ({onPress}) {
  return(
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}

class AddDeckScreen extends Component {
  state = {
    title: '',
  }


  submit = () => {
    const  { title }  = this.state

    // update redux: saving specific deck into redux store
    this.props.addDeck({
      [title]: {
        title: title,
        questions: []
      }
    })

    // if (title.length === 0 ) {
    //   Alert.alert('The title field can be empty!')
    //   return
    // }

    //  clearing the state
    this.setState({
      title: ''
    })

    // Navigate to home
    this.toHome()

    // save to DB
    saveDeckTitle (title)
  }

  toHome = () => {
  // go from where we are back to where we previously were
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeckScreen'}))
  }

  render() {
    const { title } = this.state
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.text}>
          What is the title of your new deck?
        </Text>
        <TextInput
          value={title}
          style={styles.title}
          onChangeText={(title) => this.setState({title})}
          placeholder="Deck Title"
        />
        <SubmitBtn
          onPress={this.submit}
        />
      </KeyboardAvoidingView>
    )
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

  title: {
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


function mapDispatchToProps (dispatch) {
  return {
    addDeck: (deck) => dispatch(addDeck(deck)),
  }
}


export default connect(null, mapDispatchToProps)(AddDeckScreen)
