import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
} from 'react-native'
import { blackStatusBar, whiteHeader, lightGreen } from './utils/colors'
import { Constants } from 'expo'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'
import AddDeck from './components/AddDeck'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

//  custome statusbar
function AppStatusBar({backgroundColor, ...props}) {
    return(
      <View style={{backgroundColor, height: Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    )
}

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-list-box' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
  }, {
  //  get rid of any headers that we will eventually have in our app
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? lightGreen : whiteHeader,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? blackStatusBar : whiteHeader,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator(
  {
  Home: {
    screen: Tabs,
    headerMode: 'none',
    header: null,
    navigationOptions: {
        header: null,
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: whiteHeader,
      headerStyle: {
        backgroundColor: blackStatusBar,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: whiteHeader,
      headerStyle: {
        backgroundColor: blackStatusBar,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: whiteHeader,
      headerStyle: {
        backgroundColor: blackStatusBar,
      }
    }
  }
},
)

export default class App extends React.Component {
  render() {
    const store = createStore(reducer)
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <AppStatusBar
            backgroundColor={ blackStatusBar }
            barStyle="light-content"
          />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
