var Import = require('./Import');
var config = Import.getConfig();
var gcm = Import.getGCM();

var Push_key = config.getPushAPIKey();
var Message_key = 'message';
var sender = new gcm.Sender(Push_key);

  module.exports = {
  	push :  function(regIds , message) {
  		push(regIds , message);
  	}
}

var push = function(regIds , message) {
	var Push_message = new gcm.Message();
	Push_message.addData(Message_key, message);
	sender.send(Push_message, regIds, function (err, result) {
		if(err) {
			console.error(err);
		} else {
			console.log(result);
		}
	});
}