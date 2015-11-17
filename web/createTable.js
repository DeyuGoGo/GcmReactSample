var Import = require('./Import');
var baseSql = Import.getBaseSQL();
var User = baseSql.getUser();
User.sync();