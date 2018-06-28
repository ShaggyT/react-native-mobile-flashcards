import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { Header, Card } from 'react-native-elements'
import { blackStatusBar, lightGreen, gray, black } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

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
        <Deck title='Jon Snow' cardsCounts={4}/>
        <Deck title='Arya Stark' cardsCounts={2}/>
        <Deck title='Tyrian Lanicter' cardsCounts={1}/>
        <Deck title='Ned Stark' cardsCounts={5}/>
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

export default DeckList
