import './sass/app.scss';
require('./bootstrap');
require('iot-timer.min.js');

let socket = io();
let socketio = io.connect('http://localhost:3000');

$('input.kitchen').change(function (event) {
	console.log('event clicked');
    var data;
    if ($(this).prop('checked')) {
        data = 'on';
    } else {
        data = 'off';
    }

    socket.emit('led-kitchen', data);
});

$('input.bathroom').change(function (event) {
  console.log('event clicked');
    var data;
    if ($(this).prop('checked')) {
        data = 'on';
    } else {
        data = 'off';
    }

    socket.emit('led-bath', data);
});

$('input.bedroom').change(function (event) {
  console.log('event clicked');
    var data;
    if ($(this).prop('checked')) {
        data = 'on';
    } else {
        data = 'off';
    }

    socket.emit('led-bed', data);
});

socket.on('thread', function(data) {
	console.log('The server is receiving data from the client');
	
	$('#nhietdo').text(function() {
		$('#nhietdo').text('');
		$('#nhietdo').text(data.nhietdo);
	});

    $('#doam').text(function() {
      $('#doam').text('');
      $('#doam').text(data.doam);
    });
})

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	// add a zero in front of numbers<10
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
	let t = setTimeout(function() {
	startTime()
	}, 500);
}

startTime();

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!

var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
} 
if (mm < 10) {
  mm = '0' + mm;
} 
var today = dd + '/' + mm + '/' + yyyy;
$('#date').text(today);

let request = require('request');

let apiKey = '04ad194105df612969a24075f76a6a3f';
let city = 'Ha Noi, VN';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body)
    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    console.log(message);
  }
});