// DeyuView.js
'use strict';
var React = require('react-native');
var { requireNativeComponent, PropTypes} = React;

var DeyuGo = requireNativeComponent('RCTDeyuView', DeyuGG ,{
  nativeOnly: {onChange: true}});


class DeyuGG extends React.Component {
  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
  }

  _onChange(event) {
  	console.log("DDD");
    if (this.props.onChange) {
      this.props.onChange(event.nativeEvent);
    }
  }

  render() {
    return (
      <DeyuGo
       onChange={this._onChange}
        {...this.props} />
    );
  }
}

DeyuGG.propTypes = { 
  DeyuColor: PropTypes.number
};

module.exports = DeyuGo;
