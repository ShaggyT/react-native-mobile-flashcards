import React , { Component }  from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts'
import TextButton from './TextButton'
import { red } from '../utils/colors'

export default class AlertButton extends Component {

  constructor(props) {
    super(props);
    this.state = { showAlert: false };
  };

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  render() {
    const {showAlert} = this.state;

    return (
      <View>
        <TextButton
          onPress={() => {this.showAlert()}}>
          Submit
        </TextButton>
        <AwesomeAlert
          style={{flex:1}}
          show={showAlert}
          showProgress={false}
          title="💥"
          message="Input field can't be blank!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="Cancel"
          confirmText="Cancel"
          confirmButtonColor={red}
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },
  text: {
    color: '#fff',
    fontSize: 15
  }
});
