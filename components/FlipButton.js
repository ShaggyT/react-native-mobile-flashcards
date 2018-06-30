import  React  from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { lightGreen } from '../utils/colors'

export default function FlipButton ({onPress, children, style={}}) {
  return(
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.flip, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  flip: {
    textAlign: 'center',
    color: lightGreen,
    fontSize: 20,
  }
})
