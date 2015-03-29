var Gitter = require('node-gitter'),
    format = require('string-format'),
    config = require('./config'),
    calc = require('./calc'),
    strings = require('./strings'),
    args = process.argv.slice(2),
    errorHandler = function (err) {
        console.log(format(strings.preErrorText, err));
    },
    gitter,
    token,
    roomId,
    userId;

if (args.length) {
    for (var i = args.length; i--;) {
        var arg = args[i];
        if (strings.tokenPattern.test(arg)) {
            token = arg.replace(strings.tokenPattern, '');
        } else if (strings.roomPattern.test(arg)) {
            roomId = arg.replace(strings.roomPattern, '');
        }
    }
}
if (!token) {
    console.log(format(strings.defaultParamText, 'token'));
    token = config.defaultToken;
}
if (!roomId) {    
    console.log(format(strings.defaultParamText, 'room ID'));
    roomId = config.defaultRoom;
}

gitter = new Gitter(token);

gitter.currentUser().then(function (user) {
    console.log(format(strings.authText, user.username));
    userId = user.id;
}).fail(errorHandler);

gitter.rooms.join(roomId).then(function (room) {
    console.log(format(strings.enterRoomText, room.name));
    room.streaming().chatMessages().on('chatMessages', function (message) {
        var fromUser = message.model.fromUser;
        if (fromUser && fromUser.id != userId) {
            var text = message.model.text,
                textFormatted = calc.getFormattedText(text),
                userName = fromUser.username,
                userDisplayName = fromUser.displayName,
                reply;
            console.log(format(strings.receivedMessageText, userDisplayName));
            try {
                if (textFormatted || textFormatted === 0) {
                    var result = calc.calculate(textFormatted);
                    if (isNaN(result)) {
                        throw new Error(strings.errorMessageText);
                        reply = format(strings.errorReplyText, userName);
                    } else {
                        reply = format(strings.resultReplyText, userName, textFormatted, result);
                    }
                } else {
                    reply = format(strings.errorReplyText, userName);
                }
            } catch (err) {
                errorHandler(err);
                reply = format(strings.errorReplyText, userName);
            } finally {
                room.send(reply);
                console.log(format(strings.replySentText, userDisplayName));
            }          
        }
    });
}).fail(errorHandler);