var Import = require('./Import');
var baseSql = Import.getBaseSQL();
var User = baseSql.getUser();
module.exports = {
	upsert : function(devid , userid , pushid ) {
		User.upsert({
			deviceId: devid,
			userId : userid,
			pushId: pushid
		});
	},
	getPushIds : function(userid){
		return new Promise(function(resolve, reject) {
			User.findAll({ where: { userId: userid} }).then(function(users) {
				if(users.length<=0){
					reject("No This User");
					return;
				}
				pushids = [];
				users.forEach(function(entry) {
					pushids[pushids.length] = entry.pushId;
				});
				resolve(pushids);
			});
		});
	},
}

