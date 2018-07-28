import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { Header, Card } from 'react-native-elements'
import { blackStatusBar, lightGreen, gray, placeholderGray } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
import { cardsCount } from '../utils/helpers'
import { AppLoading } from 'expo'
import { getDecks } from '../utils/api'
import PropTypes from 'prop-types'


class DeckListScreen extends Component {
  static propTypes = {
     navigation: PropTypes.object.isRequired,
     decks: PropTypes.array.isRequired,
   }

  state = {
    ready: false,
  }

  componentDidMount() {
    this.props.receiveDecks()
    getDecks().then((decks) => receiveDecks(decks)).then(() => this.setState(() => ({ready: true})))
  }

  renderDeck = ({ item }) => {
    const deck = item
    const { title, cardsCounts } = deck
    return (
      <TouchableOpacity
        key={title}
        onPress={() => {
          this.props.navigation.navigate('DeckScreen', { title: title })
        }}
      >
        <View>
          <Card
            title={title}>
            {cardsCounts > 0 ?
              <View style={styles.deckItem}>
                <Text style={{color: gray}}>{cardsCount(cardsCounts)}</Text>
                <MaterialCommunityIcons
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center'}}
                  name='cards'
                  size={20}
                  style={{
                    marginRight: 10, marginBottom:-20}}
                  color={lightGreen }
                />
              </View>
              :
              <View>
                <Text style={[styles.subHeader,{color: gray}]}>The deck is Empty!</Text>
              </View>
            }
          </Card>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { ready } = this.state
    const { decks } = this.props

    if (!ready) {
      return (<AppLoading/>)
    }

    return (
      <View style={styles.container}>
        <Header
           centerComponent={{ text: 'Mobile Flashcard', style: { color: '#fff' } }}
           backgroundColor={ blackStatusBar }
         />

        {decks && Object.keys(decks).length > 0 ?
          <FlatList
            style={{flex:1}}
            data={decks}
            renderItem={this.renderDeck}
            keyExtractor={(deck, index) => deck.title}
          />
          :
          <View>
            <Text style={styles.text}>
              No decks found
            </Text>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: placeholderGray,
  },
  deckItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    fontSize: 15,
  },
  subHeader: {
    textAlign: 'center',
    marginTop: 5,
    color: gray,
  },
})

const mapStateToProps = (state) => ({
    decks: Object.keys(state).reduce((decks, deck) => {
        decks.push({
            title: state[deck].title,
            cardsCounts: state[deck].questions.length,
            deck
        });
        return decks
    }, []).sort().reverse()
});

function mapDispatchToProps (dispatch) {
  return {
    receiveDecks: (decks) => dispatch(receiveDecks(decks)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckListScreen)
