import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native'
import { blackStatusBar, whiteHeader, lightGreen } from './utils/colors'
import { Constants } from 'expo'

//  custome statusbar
function AppStatusBar({backgroundColor, ...props}) {
    return(
      <View style={{backgroundColor, height: Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    )
}

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
        <AppStatusBar
          backgroundColor={ blackStatusBar }
          barStyle="light-content"
        />
      </View>
    )
  }
}
