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

class DeckListScreen extends Component {
  state = {
    ready: false,
  }
  componentDidMount() {
    this.props.receiveDecks()
    getDecks().then((decks) => receiveDecks(decks)).then(() => this.setState(() => ({ready: true})))
  }

  renderDeck = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.title}
        onPress={() => {
          this.props.navigation.navigate('DeckScreen', { title: item.title })
        }}
      >
        <View>
          <Card
            title={item.title}>
            {item.cardsCounts > 0 ?
              <View style={styles.deckItem}>
                <Text style={{color: gray}}>{cardsCount(item.cardsCounts)}</Text>
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

    if (!ready) {
      return (<AppLoading/>)
    }
    return (
      <View style={styles.container}>
        <Header
           centerComponent={{ text: 'Mobile Flashcard', style: { color: '#fff' } }}
           backgroundColor={ blackStatusBar }
         />
        {this.props.decks && Object.keys(this.props.decks).length ?
          <FlatList
            style={{flex:1}}
            data={this.props.decks}
            extraData={this.state}
            renderItem={this.renderDeck}
            keyExtractor={(item, index) => item.title}
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

function mapStateToProps(decks) {
  return {
    decks: Object.keys(decks).map(deck => ({
      title: decks[deck].title,
      cardsCounts: decks[deck].questions.length
    }))
  }
}

function mapDispatchToProps (dispatch) {
  return {
    receiveDecks: (decks) => dispatch(receiveDecks(decks)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckListScreen)
