
var socket = io();
            
    socket.on('connect', function () {
        console.log('connect to server');
    });
    
    socket.on('disconnect', function () {
       console.log('disconnected from server'); 
    });

    socket.on('newMessage', (message) => {
      console.log(`from : ${message.from} >> ${message.text} >>> ${message.createdAt}`);
      var li = $('<li></li>');
      li.text(`${message.from} : ${message.text} `);
      $('#messages').append(li);
      $('[name=message]').val('');
   });
   
   $('#message-form').on('submit', (e) => {
       e.preventDefault();
       
       socket.emit('createMessage', {
           from: 'User',
           text: $('[name=message]').val()
       }, () => {
        
       });
     });
 
     
    