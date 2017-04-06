var expect = require("expect");

var {generateMessage} = require("./message");

describe('generate Message', () => {
    it('should create correct message object', () => {
        var text = 'hello everyone';
        var from = 'mahmood';
        var message = generateMessage(from, text);
        
        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');
    });
})