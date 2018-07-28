import  React  from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { lightGreen } from '../utils/colors'

export default function ToggleButton ({onPress, children, style={}}) {
  return(
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.toggleBtn, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  toggleBtn: {
    textAlign: 'center',
    color: lightGreen,
    fontSize: 20,
  }
})
