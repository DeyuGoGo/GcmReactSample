var Import = require('./Import');
var express = Import.getExpress();
var bodyParser = Import.getBodyParser();
var PushUser = Import.getPushUser();
var Push = Import.getPush();

var app = express();

app.set('port', (process.env.PORT || 3000));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.post('/push', function(req, res) {
  console.log("push userid : " + req.body.userId);
    var user_id = req.body.userId,
    var message = req.body.message;
    PushUser.getPushIds(user_id).then(
      function(ids) {
      Push.push(ids,message);
      res.end('Push Go');
    },function(err){
      res.end(err);
    }
    );
});

app.post('/reg', function(req, res) { 
	  var dev_id = req.body.deviceId;
	  var user_id = req.body.userId;
	  var push_id = req.body.pushId;
	  PushUser.upsert(dev_id,user_id,push_id);
    res.json({isSuccess:true})
    res.end();
});
app.get('/isUserReg', function(req, res) { 
    var user_id = req.body.userId;
    PushUser.getPushIds(user_id).then(
      (id)=>{
        res.json({isReg:true});
        res.end();
      },
      (err)=>{
        res.json({isReg:false});
        res.end();
      });
});

app.post('/delete', function(req, res) {
  var dev_id = req.body.deviceId;
  PushUser.deletePushId(dev_id);
  res.end('deletePushId:' + dev_id);
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
