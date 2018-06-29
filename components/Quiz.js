import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { ButtonGroup } from 'react-native-elements'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { whiteBackground,gray } from '../utils/colors'
import { quizResult } from '../utils/helpers'

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: `${title} Quiz `
    }
  }

  state = {
    cardView: 'question',
    cardNumber: 0,
    score: 0,
  }


  flipCard = () => {
    const { cardView } = this.state
    this.setState((state) => {
      return {
        ...state,
        cardView: 'question' ? 'answer' : 'question'
      }
    })
  }

  changeScore = (currentScore) => {
    this.setState((state) => {
      return {
        ...state,
        cardNumber: state.cardNumber + 1,
        score: state.score + currentScore,
      }
    })
  }

  render() {
    const { deck } = this.props
    const { cardView, cardNumber, score } = this.state
    const cardCount = deck.questions.length

    return (
      <View style={{flex:1}}>
      { ( cardNumber === cardCount) ?
        (
          <View style={styles.container}>
            <Text>{quizResult(score, cardNumber)}</Text>
          </View>
        )
      : (
        <View style={styles.container}>
          { ( cardView === 'question') ?
              <View style={styles.container}>
                <Text style={{marginBottom: 10, fontSize: 20}}>{deck.questions[cardNumber].question}</Text>
                <TouchableOpacity
                  onPress={this.flipCard}
                  style={styles.viewButton}
                >
                  <Text style={{color: gray,
                  fontSize: 18}}>
                    Answer
                  </Text>
                </TouchableOpacity>
                <TextButton
                  style={{padding: 10}}
                  onPress={() => this.changeScore(1)}
                >
                  Correct
                </TextButton>
                <TextButton
                  style={{padding: 10}}
                  onPress={() => this.changeScore(0)}
                  >
                  Incorrect
                </TextButton>
              </View>
           :
             <View style={styles.container}>
               <Text style={{marginBottom: 10, fontSize: 20}}>{deck.questions[cardNumber].answer}</Text>
               <TouchableOpacity
                 onPress={this.flipCard}
                 style={styles.viewButton}
               >
                 <Text style={{color: gray,
                 fontSize: 18}}>
                   Question
                 </Text>
               </TouchableOpacity>
             </View>
          }
        </View>
      )}
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:50
  },
})


function mapStateToProps (state, { navigation }) {
 // comes form Deck - when we navigate to Quiz, passing title
  const { title } = navigation.state.params
  return {
    deck: state[title]
  }
}

export default connect(mapStateToProps)(Quiz)
