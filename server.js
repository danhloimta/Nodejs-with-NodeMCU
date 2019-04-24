require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var ip = require('ip');
var path = require('path');


var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var colors = require('colors');
var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + port)
});

var indexRouter = require('./routes/index.route');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

io.on('connection', function (socket) {
    console.log('New client connect'.gray);

    socket.on('led-kitchen', function(data) {
        console.log('led kitchen ' + data);
        socket.broadcast.emit('led-kitchen', data);
    });

    socket.on('led-bath', function(data) {
        console.log('led bathroom ' + data);
        socket.broadcast.emit('led-bath', data);
    });

    socket.on('led-bed', function(data) {
        console.log('led bedroom ' + data);
        socket.broadcast.emit('led-bed', data);
    });

    socket.on('info_sensor', function(data) {
    	console.log('du lieu nhan duoc. nhiet do: ' + data.nhietdo + ' do am: ' + data.doam);
    	socket.emit('thread', data);
    	socket.broadcast.emit('thread', data);
    });

    socket.on('disconnect', function () {
        console.log('Client disconnect'.gray);
    });
});
