var Import = require('./Import');
var express = Import.getExpress();
var bodyParser = Import.getBodyParser();
var PushUser = Import.getPushUser();
var Push = Import.getPush();

var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.post('/push', function(req, res) {
        console.log("body userid : " + req.body.userId + "body message : " + req.body.message);
    var user_id = req.body.userId,
    message = req.body.message;
          console.log("userid : " + user_id + "message : " + message);
    PushUser.getPushIds(user_id).then(
      function(ids) {
      Push.push(ids,message);
      res.json({isSuccess:true})
      res.end();
    },function(err){
      res.json({isSuccess:false})
      res.end();
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
    var user_id = req.query.userId;
    console.log("userId : " + user_id );
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
app.get('/isDeviceReg' ,(req , res) =>{
  var deviceId = req.query.deviceId;
  console.log("deviceId : " + deviceId );
  PushUser.getUserId(deviceId).then(
    (userid)=>{
      res.json({isReg:true,userId:userid});
      res.end();
    },
    (err)=>{
      res.json({isReg:false});
      res.end();
    })
});

app.post('/delete', function(req, res) {
  var dev_id = req.body.deviceId;
  PushUser.deletePushId(dev_id);
  res.end('deletePushId:' + dev_id);
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
