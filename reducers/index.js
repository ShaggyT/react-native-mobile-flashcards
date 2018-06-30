import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD
} from '../actions/types'
import { initialDeckState } from '../utils/_decks'


function decks (state = initialDeckState, action) {
  switch (action.type) {
     case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
      case ADD_DECK :
        return {
          ...state,
          ...action.deck,
      }
      case ADD_CARD :
        return {
          ...state,
          [action.title]: {
            title: action.title,
            questions: [...state[action.title].questions, action.card]
          }
        }
    default:
      return state
  }
}

export default decks
