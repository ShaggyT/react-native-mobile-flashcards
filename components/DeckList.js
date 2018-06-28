import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { Header, Card } from 'react-native-elements'
import { blackStatusBar, lightGreen, gray, black } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
import { cardsCount } from '../utils/helpers'

function Deck({ title, cardsCounts }) {
  return(
    <TouchableOpacity
      key={title}
      onPress={() => {
        this.props.navigation.navigate('Deck', { title: title })
      }}
    >
      <View>
        <Card style={{fontSize: 20 }} title={title}>
          <View style={styles.deckItem}>
            <Text style={{color: gray}}>{cardsCount(cardsCounts)}</Text>
            <MaterialCommunityIcons
              style={{justifyContent: 'center', alignItems: 'center'}}
              name='cards'
              size={20}
              style={{marginRight: 10, marginBottom:-20}}
              color={lightGreen }
            />
          </View>
        </Card>
      </View>
    </TouchableOpacity>
  )
}


class DeckList extends Component {
  componentDidMount() {
    this.props.receiveDecks()
  }


  renderItem = ({ item }) => {
    return <Deck {...item} />
  }

  render() {
    return (
      <View>
        <Header
           centerComponent={{ text: 'Mobile Flashcard', style: { color: '#fff' } }}
           backgroundColor={ blackStatusBar }
         />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Deck')}>
          <Text style={styles.container}>Deck List</Text>
        </TouchableOpacity>
        {this.props.decks && Object.keys(this.props.decks).length ?
          <FlatList
            data={this.props.decks}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => item.title}
          >
          </FlatList>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
