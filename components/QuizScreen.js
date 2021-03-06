import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Platform,
} from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { lightGreen, red, blackStatusBar, placeholderGray } from '../utils/colors'
import {
  quizResult,
  clearLocalNotification,
  setLocalNotification,
  progressFunc,
} from '../utils/helpers'
import ToggleButton from './ToggleButton'
import * as Progress from 'react-native-progress'
import { Card, Button, Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

class QuizScreen extends Component {
  static propTypes = {
    deck: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: `${title} Quiz `
    }
  }

  state = {
    show: 'question',
    questionNumber: 0,
    quizScore: 0,
    repeat: false,
    bounceValue: new Animated.Value(1),
    image: '',
  }

  componentDidMount() {
    const { bounceValue, opacity } = this.state
    Animated.sequence([
      Animated.timing(bounceValue, {duration: 1000, toValue: 1.04}),
      Animated.spring(bounceValue, {toValue: 1, friction: 4}),
    ]).start()
  }

  toggleCard = () => {
    const { show } = this.state
    this.setState((state) => {
      return {
        ...state,
        show: show === 'question' ? 'answer' : 'question',
      }
    })
  }


  changeScore = (currentScore) => {
    const { deck } = this.props
    const { bounceValue } = this.state
    //Clear Notifications if quiz complete
     if (this.state.questionNumber === deck.questions.length) {
       clearLocalNotifications()
         .then(setLocalNotification())
     }

     if (this.state.questionNumber === deck.questions.length) {
       Animated.sequence([
         Animated.timing(bounceValue, {duration: 1000, toValue: 1.04}),
         Animated.spring(bounceValue, {toValue: 1, friction: 4})
       ]).start()
     }

    this.setState((state) => {
      const scorePercent = (((state.quizScore + currentScore)/(state.questionNumber + 1))*100)
      return {
        ...state,
        questionNumber: state.questionNumber + 1,
        quizScore: state.quizScore + currentScore,
        repeat: scorePercent <= 50
        ? true
        : false,
        image: scorePercent <= 50
        ? require('../assets/images/repeat.gif')
        : require('../assets/images/good.gif'),
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
      quizScore: 0,
      repeat: false,
      image: '',
      bounceValue: new Animated.Value(1),
    })
  }

  returnToDeck = () => {
    this.props.navigation.goBack();
  }

  render() {
    const { deck } = this.props
    const { show, questionNumber, quizScore, bounceValue, repeat, image, title } = this.state
    const cardCount = deck.questions.length

    return (
      <View style={{flex:1}}>

      { ( questionNumber === cardCount) ?
        (
          <Animated.View
            style={[styles.MainContainer, {transform: [{scale: bounceValue}]} ]}>
            <Card
              title={title}
              image={image}
              imageStyle={Platform.OS === 'ios' ? styles.iosImage : styles.AndroidImage}>
              <Animated.Text style={[{marginBottom: 10, textAlign: 'center', color:'#000'}, {transform: [{scale: bounceValue}]}]}>
                {`You scored: ${quizResult(quizScore, questionNumber)}`}
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
                <Text style={{marginBottom: 10, fontSize: 20, color: '#fff'}}>{deck.questions[questionNumber].questionInput}</Text>
                <ToggleButton style={styles.ToggleButton} onPress={this.toggleCard}>
                    Answer
                </ToggleButton>
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
             <View style={[styles.item,{marginTop: 0}]}>
               <Text style={{marginBottom: 10, fontSize: 20,  color: '#fff'}}> {deck.questions[questionNumber].answerInput}</Text>
               <ToggleButton style={styles.ToggleButton} onPress={this.toggleCard}>
                   Question
               </ToggleButton>
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
    justifyContent: 'center',
  },
  ToggleButton: {
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
    marginBottom: 20,
  },
  MainContainer:{
    flex: 1,
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
  shadowRadius: 3,
  shadowOpacity: 0.8,
  shadowColor: 'rgba(0, 0, 0, 0.24)',
  shadowOffset: {
    width: 0,
    height: 3
    },
  },
  iosImage: {
    height:400,
    width:343
  },
  AndroidImage: {
    height:280,
    width:343
  },
})

function mapStateToProps (state, { navigation }) {
 // comes form Deck - when we navigate to Quiz, passing title
  const { title } = navigation.state.params
  return {
    deck: state[title] || {}
  }
}

export default connect(mapStateToProps)(QuizScreen)
