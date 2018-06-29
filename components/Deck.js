import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { gray  } from '../utils/colors'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { cardsCount } from '../utils/helpers'

class Deck extends Component {
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
        <View>
          <Text style={styles.header}>
            {deck.title}
          </Text>
          {deck.questions.length > 0 ?
            <View>
              <Text style={styles.subHeader}>
                {cardsCount(cardsCounts)}
              </Text>
              <TextButton style={{padding: 10}} onPress={() => this.props.navigation.navigate('AddCard', { title: deck.title })}>
                Add Card
              </TextButton>
              <TextButton style={{padding: 10}} onPress={() => this.props.navigation.navigate('Quiz', { title: deck.title })}>
                Start Quiz
              </TextButton>
            </View>
            :
            <View>
              <Text style={styles.subHeader}>
                {deck.title} deck is Empty!
              </Text>
              <TextButton style={{padding: 10}} onPress={() => this.props.navigation.navigate('AddCard')}>
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


function mapStateToProps (state, { navigation }) {
 // comes form DeckList - when we navigate to Deck, passing title
  const { title } = navigation.state.params
  return {
    deck: state[title]
  }
}


export default connect(mapStateToProps)(Deck)
