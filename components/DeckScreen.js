import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native'
import { gray, placeholderGray, blackStatusBar  } from '../utils/colors'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { cardsCount } from '../utils/helpers'


class DeckScreen extends Component {
  //  adding static property to dynamically set navigation options
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: title
    }
  }
  render() {
    const { deck } = this.props
    const cardsCounts = deck.questions.length
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.header}>
            {deck.title}
          </Text>
          {deck.questions.length > 0 ?
            <View>
              <Text style={styles.subHeader}>
                {cardsCount(cardsCounts)}
              </Text>
              <TextButton style={{padding: 10 }} onPress={() => this.props.navigation.navigate('AddCardScreen', { title: deck.title })}>
                Add Card
              </TextButton>
              <TextButton style={{padding: 10}} onPress={() => this.props.navigation.navigate('QuizScreen', { title: deck.title })}>
                Start Quiz
              </TextButton>
            </View>
            :
            <View>
              <Text style={styles.subHeader}>
                {deck.title} deck is Empty!
              </Text>
              <TextButton style={{padding: 10}} onPress={() => this.props.navigation.navigate('AddCardScreen', { title: deck.title })}>
                Add Card
              </TextButton>
            </View>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: placeholderGray,
  },
  header: {
    marginTop: 40,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  subHeader: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    color: gray,
    marginBottom: 40,
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
  marginTop: 150,
  justifyContent: 'center',
  shadowRadius: 3,
  shadowOpacity: 0.8,
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowOffset: {
    width: 0,
    height: 3
    },
  },
})


function mapStateToProps (state, { navigation }) {
 // comes form DeckList - when we navigate to Deck, passing title
  const { title } = navigation.state.params
  return {
    deck: state[title]
  }
}


export default connect(mapStateToProps)(DeckScreen)
