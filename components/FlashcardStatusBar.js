import React from 'react'
import {
  View,
  StatusBar,
} from 'react-native'
import { Constants } from 'expo'

//  custom status bar
export default function FlashcardStatusBar({backgroundColor, ...props}) {
    return(
      <View style={{backgroundColor, height: Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    )
}
