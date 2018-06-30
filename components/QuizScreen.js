import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { ButtonGroup } from 'react-native-elements'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { whiteBackground } from '../utils/colors'
import {
  quizResult,
  clearLocalNotification,
  setLocalNotification,
} from '../utils/helpers'
import  ResetButton from './ResetButton'
import FlipButton from './FlipButton'
import * as Progress from 'react-native-progress'
import { lightGreen, red, gray } from '../utils/colors'

class QuizScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: `${title} Quiz `
    }
  }

  state = {
    cardView: 'question',
    questionNumber: 0,
    score: 0,
  }


  flipCard = () => {
    const { cardView } = this.state
    this.setState((state) => {
      return {
        ...state,
        cardView: 'question' ? 'answer' : 'question',
      }
    })
  }


  changeScore = (currentScore) => {
    //Clear Notifications if quiz complete
     if (this.state.questionNumber === this.props.deck.questions.length) {
       clearLocalNotifications()
         .then(setLocalNotification())
     }
    this.setState((state) => {
      return {
        ...state,
        questionNumber: state.questionNumber + 1,
        score: state.score + currentScore,
      }
    })
  }

  resetQuiz = () => {
    this.setState({
      cardView: 'question',
      questionNumber: 0,
      score: 0,
    })
  }

  returnToDeck = () => {
    this.props.navigation.goBack();
  }

  render() {
    const { deck } = this.props
    const { cardView, questionNumber, score, bounceValue  } = this.state
    const cardCount = deck.questions.length

    return (
      <View style={{flex:1}}>

      { ( questionNumber === cardCount) ?
        (
          <View style={styles.container}>
            <Text style={{marginBottom: 20}}>{quizResult(score, questionNumber)}</Text>
            <ResetButton style={{padding: 5 ,color: red}} onPress={this.resetQuiz}>
                Reset Quiz
            </ResetButton>
            <ResetButton style={{padding: 5, color: gray}} onPress={this.returnToDeck}>
                Go Back to Deck
            </ResetButton>
          </View>
        )
      : (
        <View style={styles.container}>
          <View>
            <Text style={styles.progress}>{`${(questionNumber) + 1 }/${cardCount}`}</Text>
            <Progress.Bar progress={((questionNumber) + 1)/ cardCount} width={200} color={lightGreen} />
          </View>
          { ( cardView === 'question') ?
              <View style={styles.container}>
                <Text style={{marginBottom: 10, fontSize: 20}}>{deck.questions[questionNumber].question}</Text>
                <FlipButton style={styles.flipButton} onPress={this.flipCard}>
                    Answer
                </FlipButton>
                <Text>cardView: {cardView}</Text>
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
               <Text style={{marginBottom: 10, fontSize: 20}}>{deck.questions[questionNumber].answer}</Text>
               <FlipButton style={styles.flipButton} onPress={this.flipCard}>
                   Question
               </FlipButton>
               <Text>cardView: {cardView}</Text>
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
  flipButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    padding: 10
  },
  progress: {
    textAlign: 'center',
    marginBottom:20,
    marginTop: 20,
  }
})


function mapStateToProps (state, { navigation }) {
 // comes form Deck - when we navigate to Quiz, passing title
  const { title } = navigation.state.params
  return {
    deck: state[title]
  }
}

export default connect(mapStateToProps)(QuizScreen)
