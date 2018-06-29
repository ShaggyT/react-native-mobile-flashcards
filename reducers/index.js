import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD
} from '../actions/types'
import { initialDeckState } from '../utils/_decks'


function decks (state = initialDeckState, action) {
  const { decks, deck, card, title } = action
  switch (action.type) {
     case RECEIVE_DECKS :
      return {
        ...state,
        ...decks,
      }
      case ADD_DECK :
        return {
          ...state,
          ...deck,
      }
      // case ADD_CARD :
      //   return {
      //     ...state,
      //     [action.title]: {
      //       title: action.title,
      //       questions: [...state[action.title].questions, action.card]
      //     }
      //   }
      case ADD_CARD:
      return {
        ...state,
        [title]: {
          ...state[title],
          questions: [...state[title].questions, card]
        }
      };

    default:
      return state
  }
}

export default decks
