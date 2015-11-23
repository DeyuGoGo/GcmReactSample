'use strict';

var React = require('react-native');
var {
  AppRegistry,
  DeviceEventEmitter,
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  View,
} = React;

var url = '104.155.238.153:3000/'
var Login = React.createClass({
  checkUserId: function( userid ) {
    fetch(REQUEST_URL2,{
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userid,
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
      })
      .done();
  },
  onRegsuccess: function(){
  },
  _onPressButton: function(){
    checkUserId(this.state.userid);
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
        請註冊
        </Text>
        <TextInput
         placeholder="Enter Id"
         style={styles.inputText}
         onChangeText={(text) => this.setState({userid:text})}
         value={this.state.userid}/>
         <TouchableNativeFeedback
        onPress={this._onPressButton}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={{width: 150, height: 100, backgroundColor: 'red'}}>
        <Text style={{margin: 30}}>Button</Text>
      </View>
    </TouchableNativeFeedback>
      </View>
    );
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
  inputText: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    flex: 1,
    fontSize: 13,
  },
});
module.exports = Login;