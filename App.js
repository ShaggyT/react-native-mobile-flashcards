import React from 'react'
import {
  View,
  StatusBar,
} from 'react-native'
import { blackStatusBar } from './utils/colors'
import { Constants } from 'expo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers'
import Navigation from './components/Navigation'

//  custome statusbar
function AppStatusBar({backgroundColor, ...props}) {
    return(
      <View style={{backgroundColor, height: Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    )
}

export default class App extends React.Component {
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
