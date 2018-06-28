import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from './api'

export const initialDeckState = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function setInitialDecks () {
  AsyncStorage.getItem(DECKS_STORAGE_KEY).then(res => {
    if (!res) {
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(initialDeckState));
    }
  })
}
