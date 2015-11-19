var Import = require('./Import');
var config = Import.getConfig();
var Sequelize = Import.getSequelize();
var PushDBName = config.getPushDBName();
var DBUserName = config.getDBUserName();
var DBUserPassword = config.getDBUserPassword();


module.exports = {
  getUser : function() {return User}
}

var sequelize = new Sequelize(PushDBName, DBUserName, DBUserPassword, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

var User = sequelize.define('PushUser', {
  deviceId: {
    type: Sequelize.STRING,
    field: 'dev_id'
  },
  userId: {
    type: Sequelize.STRING,
    field: 'user_id' 
  },
  pushId:{
  	type: Sequelize.STRING,
  	field: 'push_id'
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});
