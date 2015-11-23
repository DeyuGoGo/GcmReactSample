'use strict';

var React = require('react-native');
var { requireNativeComponent, PropTypes, View } = React;

var DeyuButton = requireNativeComponent('DeyuButton', DeyuBB, {
  nativeOnly: {onChange: true}
});
class DeyuBB extends React.Component {
    constructor() {
    	super();
    this._onChange = this._onChange.bind(this);
  }
  _onChange(event: Event) {
  	  	console.log("_onChange_onChange");
    if (!this.props.onChange) {
      return;
    }
    this.props.onChange(event.nativeEvent.message);
  }
  render() {
    return <DeyuButton 
     {...this.props} onChange={this._onChange}/>;
  }
}

DeyuBB.propTypes = {
  onChangeMessage: React.PropTypes.func
};


module.exports = DeyuButton;
