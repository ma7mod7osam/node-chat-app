
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
   
   socket.on('newLocationMessage', (message) => {
      var li = $('<li></li>');
      var a = $('<a target="_blank">My Current Location</a>');
      
      li.text(`${message.from}: `);
      a.attr('href', message.url);
      li.append(a);
      $('#messages').append(li);
      
   });
   
   $('#message-form').on('submit', (e) => {
       e.preventDefault();
       
       socket.emit('createMessage', {
           from: 'User',
           text: $('[name=message]').val()
       }, () => {
        
       });
     });
     
     var locationButton = $('#send-location');
     
     locationButton.on('click', () => {
        if(!navigator.geolocation) {
            return alert('Sorry .. geolocation it\'s not supported by your browser');
        }
        
        navigator.geolocation.getCurrentPosition((position) => {
            socket.emit('createLocationMessage', {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            });
        }, () => {
           alert('Unable to fetch your location'); 
        });
     });
 
     
    