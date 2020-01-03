const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(6969);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

  socket.on('send', (data)=>{
	socket.broadcast.emit('recieve', data)
  })

  socket.emit('blue', { hello: 'blue' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('fart', ()=>{
	  console.log('fart');
	  socket.broadcast.emit('fart');
  })
  
  socket.on('ferret', function (name, word, fn) {
    fn(name + ' says ' + word);
  });
});

//======================================
app.get('/chess', (req,res)=>{
    res.sendFile(__dirname + '/u.html');
});

app.get('/msg', (req, res)=>{
	res.sendFile(__dirname + '/appeartext.html')
})