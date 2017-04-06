const path = require("path");
const express = require("express");
const http = require("http");
const app = express();
const socketIO = require("socket.io");
const publicPath = path.join(__dirname, '../public');

var port = process.env.PORT || 3000;
app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
   console.log('new user connected');
   
   socket.on('disconnect', () => {
   console.log('user disconnect from server'); 
   });
   
   socket.on('createMessage', (message) => {
      io.emit('newMessage', {
       from: message.from,
       text: message.text,
       date: new Date().getTime()
      });
   });
});


app.get('/', (req, res) => {
   res.render('index'); 
});



server.listen(port, () => {
    console.log('server running on port : ', port);
});