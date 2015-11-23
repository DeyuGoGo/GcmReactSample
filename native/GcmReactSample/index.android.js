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
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  },
  componentDidMount: function() {
    DeviceEventEmitter.addListener('registration_complete', function(e: Event) {
      console.log("DeviceEventEmitter" + e.deyu);
    });
    // DeyuToast.regGcm();
  },
  checkRegState:function(){

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
