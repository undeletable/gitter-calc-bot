var format = require('string-format'),
    strings = require('./strings');

module.exports = {
    getFormattedText: function (text) {
        var isValidExpression = strings.messagePattern.test(text) &&
            text.match(strings.leftBracketPattern).length == text.match(strings.rightBracketPattern).length;
        return isValidExpression ? text.replace(strings.keyWordPattern, '') : '';
    },
    calculate: function (expr) {
        var calc = new Function(format('return {0};', expr));
        return calc();
    }
}