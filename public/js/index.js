
var socket = io();

    function scrollToBottom () {
        var messages = $('#messages');
        var newMessage = messages.children('li:last-child');
        
        var clientHeight = messages.prop('clientHeight');
        var scrollTop = messages.prop('scrollTop');
        var scrollHeight = messages.prop('scrollHeight');
        var newMessageHeight = newMessage.innerHeight();
        var lasMessageHeight = newMessage.prev().innerHeight();
        
        if (clientHeight + scrollTop + newMessageHeight + lasMessageHeight >= scrollHeight) {
            // messages.scrollTop(scrollHeight);
            messages.animate({scrollTop:scrollHeight}, 600);
            return false;
        }
    }
            
    socket.on('connect', function () {
        console.log('connect to server');
    });
    
    socket.on('disconnect', function () {
      console.log('disconnected from server'); 
    });

    socket.on('newMessage', (message) => {
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = $('#message-template').html();
        var html = Mustache.render(template, {
            text: message.text,
            from: message.from,
            date: formattedTime
        });
        $('#messages').append(html);
         scrollToBottom();
   });
   
   socket.on('newLocationMessage', (message) => {
       var formattedTime = moment(message.createdAt).format('h:mm a');
       var template = $('#location-message-template').html();
        var html = Mustache.render(template, {
            url: message.url,
            from: message.from,
            date: formattedTime
        });
        $('#messages').append(html);
        scrollToBottom();
   });
   
   var messageTextBox = $('[name=message]');
   $('#message-form').on('submit', (e) => {
       e.preventDefault();
       socket.emit('createMessage', {
           from: 'User',
           text: messageTextBox.val()
       }, () => {
        messageTextBox.val('');
       });
     });
     
     var locationButton = $('#send-location');
     
     locationButton.on('click', () => {
        if(!navigator.geolocation) {
            return alert('Sorry .. geolocation it\'s not supported by your browser');
        }
        
        locationButton.attr('disabled', 'disabled').text('Sending location...');
        
        navigator.geolocation.getCurrentPosition((position) => {
            
            locationButton.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage', {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            });
        }, () => {
            locationButton.removeAttr('disabled').text('Send location');
           alert('Unable to fetch your location'); 
        });
     });
 
     
    