import  React  from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native'
import {  lightGreen, whiteHeader } from '../utils/colors'

export default function TextButton ({onPress, children, style={}}) {
   // if style is undefined set it as an empty object
  return(
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: lightGreen,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    width: 200,
    marginBottom: 10,
  },
  AndroidSubmitBtn: {
    backgroundColor: lightGreen,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: whiteHeader,
    fontSize: 18,
    textAlign: 'center',
  },
})
