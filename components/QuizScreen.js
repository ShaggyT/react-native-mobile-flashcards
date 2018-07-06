import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native'
import { ButtonGroup } from 'react-native-elements'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { whiteBackground, lightGreen, red, gray, blackStatusBar, placeholderGray  } from '../utils/colors'
import {
  quizResult,
  clearLocalNotification,
  setLocalNotification,
  progressFunc
} from '../utils/helpers'
import FlipButton from './FlipButton'
import * as Progress from 'react-native-progress'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

class QuizScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: `${title} Quiz `
    }
  }

  state = {
    show: 'question',
    questionNumber: 0,
    score: 0,
    repeat: false,
    bounceValue: new Animated.Value(1),
    useNativeDriver: true,
    image: '',
  }


  componentDidMount() {
    const { bounceValue } = this.state
    Animated.sequence([
      Animated.timing(bounceValue, {duration: 1000, toValue: 1.04}),
      Animated.spring(bounceValue, {toValue: 1, friction: 4})
    ]).start()
  }

  flipCard = () => {
    const { show } = this.state
    this.setState((state) => {
      return {
        ...state,
        show: 'question' ? 'answer' : 'question',
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
      const scorePercent = (((state.score + currentScore)/(state.questionNumber + 1))*100)
      return {
        ...state,
        questionNumber: state.questionNumber + 1,
        score: state.score + currentScore,
        repeat: scorePercent <= 50
        ? true
        : false,
        image: scorePercent <= 50
        ? require('../assets/images/sad.jpg')
        : require('../assets/images/happy.jpg'),
        title: scorePercent <= 50
        ? "Keep Practicing"
        : "Good Job"
      }
    })
  }

  resetQuiz = () => {
    this.setState({
      show: 'question',
      questionNumber: 0,
      score: 0,
      repeat: false,
      useNativeDriver: true,
      image: '',
    })
  }

  returnToDeck = () => {
    this.props.navigation.goBack();
  }

  render() {
    const { deck } = this.props
    const { show, questionNumber, score, bounceValue, repeat, image, title } = this.state
    const cardCount = deck.questions.length

    return (
      <View style={{flex:1}}>

      { ( questionNumber === cardCount) ?
        (
          <Animated.View
            style={[styles.MainContainer, {transform: [{scale: bounceValue}]} ]}>
            <Card
              style={styles.card}
              title={title}
              image={image}
              imageStyle={{height:300, width:344}}>
              <Animated.Text style={[{marginBottom: 10, textAlign: 'center', color:'#000'}, {transform: [{scale: bounceValue}]}]}>
              {`You scored: ${quizResult(score, questionNumber)}`}
              </Animated.Text>
              <Button
                onPress={this.resetQuiz}
                icon={<Icon name='code' color='#ffffff' />}
                backgroundColor={lightGreen}
                buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                title='Reset Quiz' />
              <Button
                onPress={this.returnToDeck}
                icon={<Icon name='code' color='#ffffff' />}
                backgroundColor={lightGreen}
                buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Deck' />
            </Card>
          </Animated.View>
        )
      : (
        <View style={styles.container}>
          <View style={styles.item}>
          <View style={styles.progressBar}>
            <Text style={styles.progress}>{`${(questionNumber) + 1 }/${cardCount}`}</Text>
            <Progress.Bar
              progress={progressFunc (questionNumber, cardCount)} width={200}
              color={lightGreen}
            />
          </View>
          { ( show === 'question') ?
              <View style={styles.item}>
                <Text style={{marginBottom: 10, fontSize: 20, color: '#fff'}}>{deck.questions[questionNumber].question}</Text>
                <FlipButton style={styles.flipButton} onPress={this.flipCard}>
                    Answer
                </FlipButton>
                <Text style={{color:'#fff', marginBottom: 10}}>cardView: {show}</Text>
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
               <Text>cardView: {show}</Text>
             </View>

          }
        </View>
        </View>
      )}
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: placeholderGray,
    // alignItems: 'center',
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
    color: '#fff'
  },
  progressBar: {
    marginBottom: 80,
  },
  MainContainer:{
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: ( Platform.OS === 'ios' ) ? 10 : 0,
    backgroundColor: placeholderGray,
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
  justifyContent: 'center',
  // marginTop: 150,
  shadowRadius: 3,
  shadowOpacity: 0.8,
  shadowColor: 'rgba(0, 0, 0, 0.24)',
  shadowOffset: {
    width: 0,
    height: 3
    },
  },
})

function mapStateToProps (state, { navigation }) {
 // comes form Deck - when we navigate to Quiz, passing title
  const { title } = navigation.state.params
  return {
    deck: state[title]
  }
}

export default connect(mapStateToProps)(QuizScreen)
