import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { blackStatusBar, lightGray, placeholderGray } from '../utils/colors'
import { addDeck } from '../actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { saveDeckTitle } from '../utils/api'
import TextButton from './TextButton'
import AlertButton from './AlertButton'
import { Header } from 'react-native-elements'
import PropTypes from 'prop-types'

class AddDeckScreen extends Component {
  static propTypes = {
     navigation: PropTypes.object.isRequired
   }

  state = {
    title: '',
  }

  createDeck = () => {
    const  { title, showAlert }  = this.state

    // update redux: saving specific deck into redux store
    if (title !== '') {
      this.props.addDeck({
        [title]: {
          title: title,
          questions: []
        }
      })
    }
    //  clearing the state
    this.setState({
      title: '',
    })

    // Navigate to home
    this.toHome()

    // save to DB
    if (title !== '') {
      saveDeckTitle ({
        [title]: {
          title: title,
          questions: []
        }
      })
    }
  }

  toHome = () => {
  // go from where we are back to where we previously were
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeckScreen'}))
  }


  render() {
    const { title } = this.state
    return (
      <View style={styles.container}>
        <Header
           centerComponent={{
             text: 'Mobile Flashcard',
             style: { color: '#fff' } }}
           backgroundColor={ blackStatusBar }
         />
        <KeyboardAvoidingView
          behavior='padding'
          style={styles.item}>
          <Text style={styles.inputLabel}>
            Title of your Deck
          </Text>
          <TextInput
            value={title}
            style={styles.title}
            onChangeText={(title) => this.setState({title})}
            placeholder="Deck Title ..."
            placeholderTextColor={placeholderGray}
          />
          {title.length !== 0 ?
            <TextButton
              style={{padding: 10 }}
              onPress={this.createDeck}>
              Create Deck
            </TextButton>
          :
          <AlertButton />
          }
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: placeholderGray,
  },
  title: {
    width: 300,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: placeholderGray,
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
    color: '#fff',
    marginTop: 50,
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
  marginTop: 160,
  justifyContent: 'center',
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
    addDeck: (deck) => dispatch(addDeck(deck)),
  }
}

export default connect(null, mapDispatchToProps)(AddDeckScreen)
