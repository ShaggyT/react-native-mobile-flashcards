import React from 'react'
import {
  StyleSheet,
  View,
  Platform,
} from 'react-native'
import { blackStatusBar, whiteHeader, lightGreen } from '../utils/colors'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'
import AddDeckScreen from './AddDeckScreen'
import DeckListScreen from './DeckListScreen'
import DeckScreen from './DeckScreen'
import AddCardScreen from './AddCardScreen'
import QuizScreen from './QuizScreen'

const Tabs = createBottomTabNavigator({
  DeckListScreen: {
    screen: DeckListScreen,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='md-list-box' size={28} color={tintColor} />
    },
  },
  AddDeckScreen: {
    screen: AddDeckScreen,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name='add-box' size={28} color={tintColor} />
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
  HomeScreen: {
    screen: Tabs,
    headerMode: 'none',
    header: null,
    navigationOptions: {
        header: null,
    }
  },
  DeckScreen: {
    screen: DeckScreen,
    navigationOptions: {
      headerTintColor: whiteHeader,
      headerStyle: {
        backgroundColor: blackStatusBar,
      }
    }
  },
  AddCardScreen: {
    screen: AddCardScreen,
    navigationOptions: {
      headerTintColor: whiteHeader,
      headerStyle: {
        backgroundColor: blackStatusBar,
      }
    }
  },
  QuizScreen: {
    screen: QuizScreen,
    navigationOptions: {
      headerTintColor: whiteHeader,
      headerStyle: {
        backgroundColor: blackStatusBar,
      }
    }
  }
},
)

export default class Navigation extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
        <MainNavigator />
      </View>
    )
  }
}
