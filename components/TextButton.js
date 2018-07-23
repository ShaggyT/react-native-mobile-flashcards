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
    padding: 15,
    borderRadius: 5,
    height: 50,
    marginLeft: 30,
    marginRight: 30,
    width: 200,
    marginBottom: 30,
  },
  AndroidSubmitBtn: {
    backgroundColor: lightGreen,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    borderRadius: 4,
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
