
var socket = io();
            
    socket.on('connect', function () {
        console.log('connect to server');
    });
    
    socket.on('disconnect', function () {
       console.log('disconnected from server'); 
    });

    socket.on('newMessage', (message) => {
      console.log(`from : ${message.from} >> ${message.text} >>> ${message.createdAt}`); 
   });
 