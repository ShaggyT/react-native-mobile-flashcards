import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import { blackStatusBar } from './utils/colors'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers'
import Navigation from './components/Navigation'
import AppStatusBar from './components/AppStatusBar'

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    const store = createStore(reducer)
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <AppStatusBar
            backgroundColor={ blackStatusBar }
            barStyle="light-content"
          />
          <Navigation />
        </View>
      </Provider>
    )
  }
}
