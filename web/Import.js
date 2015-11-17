module.exports = {
	getConfig : function() {return require('./Config')},
	getBaseSQL: function() {return require("./BaseSQL")},
	getGCM : function() {return require('node-gcm')},
	getBodyParser  : function() {return require('body-parser');},
	getExpress  : function() {return require('express');},
	getPushUser : function() {return require('./PushUser');},
	getPush : function() {return require('./Push');},
	getSequelize : function() {return require('sequelize');}
}