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
            <Text style={{color: gray}}>{cardsCounts} cards</Text>
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

  _keyExtractor = (item, index) => item.id

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
        <FlatList
          data={[{title: 'Jon Snow', cardsCounts: 4 },{title: 'Arya Stark', cardsCounts: 2 }, {title:'Tyrian Lanicter', cardsCounts: 1 }, {title: 'Ned Stark', cardsCounts: 5 }]}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
        >
        </FlatList>
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
  }
})


function mapStateToProps (decks) {
  return {
    decks
  }
}

function mapDispatchToProps (dispatch) {
  return {
    receiveDecks: (decks) => dispatch(receiveDecks(decks)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
