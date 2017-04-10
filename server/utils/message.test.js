var expect = require("expect");

var {generateMessage, generateLocationMessage} = require("./message");

describe('generate Message', () => {
    it('should create correct message object', () => {
        var text = 'hello everyone';
        var from = 'mahmood';
        var message = generateMessage(from, text);
        
        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');
    });
});

describe('generate location message', () => {
   it('should get user location', () => {
     var latitude = 1111;
     var longitude = 2222;
     var from = 'mahmood';
     var url = `https://www.google.com/maps?q=1111,2222`;
     var message = generateLocationMessage(from, latitude, longitude);
     
     expect(message).toInclude({from, url});
     expect(message.createdAt).toBeA('number');
   });
   
});