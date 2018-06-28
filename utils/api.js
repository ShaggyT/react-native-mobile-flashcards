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


// saveDeckTitle: take in a single title argument and add it to the decks.


// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
