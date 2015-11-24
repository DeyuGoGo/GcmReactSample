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
  TextInput,
  TouchableNativeFeedback,
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
           {this.state.userId} Welcome !
        </Text>
        <TextInput
         placeholder="傳給"
         style={styles.inputText}
         onChangeText={(text) => this.setState({to:text})}
         value={this.state.to}/>
         <TextInput
         placeholder="訊息"
         style={styles.inputText}
         onChangeText={(text) => this.setState({message:text})}
         value={this.state.message}/>
         <TouchableNativeFeedback
        onPress={this._onPressButton}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={{width: 150, height: 100, backgroundColor: 'red'}}>
        <Text style={{margin: 30}}>傳送</Text>
      </View>
      </TouchableNativeFeedback>
      </View>
    );
  },
  _onPressButton: function(){
    this.pushMessage(this.state.to,this.state.message);
  },
  pushMessage: function( to , message) {
    fetch(url+'push',{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: to,
        message: message,
      })
    }).then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  },
  componentDidMount: function() {
    DeviceEventEmitter.addListener('registration_complete', function(e: Event) {
      console.log("DeviceEventEmitter" + e.deyu);
    });
    this.checkRegState();
  },
  checkRegState:function(){
    fetch(url + 'isDeviceReg?'+'deviceId=' + DeviceInfo.getUniqueID())
      .then((response) => response.json())
      .then((responseData) => {
        console.log("isDeviceReg responseData " + responseData);
        if(responseData.isReg){
          this.setState({userId:responseData.userId.userId});
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
  inputText: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    flex: 1,
    fontSize: 13,
  },
});

AppRegistry.registerComponent('GcmReactSample', () => GcmReactSample);
