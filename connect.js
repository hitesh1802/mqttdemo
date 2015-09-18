var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://m11.cloudmqtt.com:17101',{ username : "hitesh", password : "test123"});

var express = require("express");
var bodyParser = require('body-parser')
var app     = express();
fs = require('fs');
fs.readFile("views/database.txt", "utf8", function(err, data){ 
	if(!err)
		credential = module.exports = data.split(",");
});

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.engine('.html', require('ejs').__express);
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views'));

app.get('/', function (req, res) {
  res.render('login.html');
});


app.post('/validate', function(req,res){ 
	if(req.body.username == credential[0] && req.body.password == credential[1])
	{
		res.send({error : 0, valid : 1});
	}
	else
		res.send({error : 1, msg : "Invalid username password combination."});
});

//stating to listen connection on socket.
io.on('connection', function (socket) {
 
	//subscribe to mqtt topic with hiteshTest
	client.subscribe('hiteshTest');
	  
	socket.on('clientMessage', function (data) {
		  client.publish('hiteshTest', JSON.stringify(data));
	});
  
    client.on('message', function (topic, message) {
 	  	  // message is Buffer 
		  socket.emit("responseMessage", message);
	});
});

server.listen(3000);
 

client.on("error", function(error){ 
	console.log(error);
});