import  React  from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { red } from '../utils/colors'

export default function ResetButton ({onPress, children, style={}}) {
  return(
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    fontSize: 15,
  }
})
