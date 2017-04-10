const path = require("path");
const express = require("express");
const http = require("http");
const app = express();
const socketIO = require("socket.io");
const publicPath = path.join(__dirname, '../public');

var {generateMessage, generateLocationMessage} = require("./utils/message");
var port = process.env.PORT || 3000;
app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
   console.log('new user connected');
   socket.emit('newMessage', generateMessage('Admin', 'WELCOME TO THE CHAT APP'));
   
   socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined'));
   
   socket.on('disconnect', () => {
   console.log('user disconnect from server'); 
   });
   
   socket.on('createMessage', (message, callback) => {
       io.emit('newMessage', generateMessage(message.from, message.text));
       callback('this is from server side');
   });
   
   socket.on('createLocationMessage', (coords) => {
      io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude)); 
   });
   
});


app.get('/', (req, res) => {
   res.render('index'); 
});



server.listen(port, () => {
    console.log('server running on port : ', port);
});