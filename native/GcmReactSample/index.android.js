/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  DeviceEventEmitter,
  StyleSheet,
  Text,
  View,
} = React;
var DeyuToast = require('./DeyuGcm');
var Login = require('./login');
var DeviceInfo = require('react-native-device-info');
var url = 'http://104.155.238.153:3000/'

var GcmReactSample = React.createClass({
  getInitialState: function() {
    return {
      reg: false,
    };
  },
  render: function() {
    if(!this.state.reg){
      return <Login/>;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu + this.state.userId;
        </Text>
      </View>
    );
  },
  // isDeviceReg
  componentDidMount: function() {
    DeviceEventEmitter.addListener('registration_complete', function(e: Event) {
      console.log("DeviceEventEmitter" + e.deyu);
    });
    this.checkRegState();
    // DeyuToast.regGcm();
  },
  checkRegState:function(){
    fetch(url + 'isDeviceReg?'+'deviceId=' + DeviceInfo.getUniqueID())
      .then((response) => response.json())
      .then((responseData) => {
        console.log("isDeviceReg responseData " + responseData);
        if(responseData.isReg){
          this.setState({userId:responseData.userId});
          return;
        }
        this.setState({reg:responseData.isReg});
      })
      .done();
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GcmReactSample', () => GcmReactSample);
