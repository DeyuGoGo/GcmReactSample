var DBUserName =  YOURUSERNAME;
var DBUserPassword = YOURPASSWORD;
var PushAPIKey = YOURAPIKEY;
var PushDBName = YOURDBNAME;

module.exports = {
	getDBUserName : function() {return DBUserName},
	getDBUserPassword : function() {return DBUserPassword},
	getPushAPIKey : function() {return PushAPIKey},
	getPushDBName : function() {return PushDBName}
}


