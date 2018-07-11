import { AsyncStorage } from 'react-native'
import { initialDeckState } from './_decks'

//  DECKS_STORAGE_KEY: Where we persist data inside AsyncStorage
export const DECKS_STORAGE_KEY = 'MobileFlashcards:decks'

// getDecks: return all of the decks along with their titles, questions, and answers.

export const getDecks  = () =>
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((res) => {
        return JSON.parse(res)
    })


// getDeck: take in a single id argument and return the deck associated with that id.

export function getDeck (id) {
  return getDecks().then((decks) => {
    return decks[id]
  })
}

// saveDeckTitle: take in a single title argument and add it to the decks.

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))
}

// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.

export function addCardToDeck(title, card) {
  getDecks().then((decks) => {
    if (decks[title] && decks[title].questions) {
      decks[title].questions.push(card)
    }
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  })
}
