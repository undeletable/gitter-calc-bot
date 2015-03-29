module.exports = {
    resultReplyText: '@{0} {1} = {2}',
    errorReplyText: '@{0} I can\'t calculate this',
    errorMessageText: 'Unable to calculate the expression',
    preErrorText: 'Something went wrong. {0}',
    defaultParamText: 'Using default {0} specified in config.js',
    authText: 'Authorized as {0}',
    enterRoomText: 'Entered room {0}',
    receivedMessageText: 'Message from {0} received',
    replySentText: 'Reply to {0} sent',
    tokenPattern: /^token=/,
    roomPattern: /^room=/,
    messagePattern: /^\s*calc\s*[0-9\.e\s\(\)\*\/\+\-]+$/,
    keyWordPattern: /\s*calc\s*/,
    leftBracketPattern: /\(/g,
    rightBracketPattern: /\)/g
}