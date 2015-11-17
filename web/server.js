var Import = require('./Import');
var express = Import.getExpress();
var bodyParser = Import.getBodyParser();
var PushUser = Import.getPushUser();
var Push = Import.getPush();

var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.post('/push', function(req, res) {

    var user_id = req.body.userId,
    message = req.body.message;
    PushUser.getPushIds(user_id).then(function(ids) {
      Push.push(ids,message);
      res.end('Push Go');
    });
});

app.post('/reg', function(req, res) {
  // 
	  var dev_id = req.body.deviceId;
	  var user_id = req.body.userId;
	  var push_id = req.body.pushId;

	  PushUser.upsert(dev_id,user_id,push_id);
    res.end('oo');
});

app.post('/delete', function(req, res) {
  var dev_id = req.body.deviceId;
  PushUser.deletePushId(dev_id);
  res.end('deletePushId');
});

app.listen(3000);
