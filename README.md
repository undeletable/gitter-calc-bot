# Gitter calc bot
Bot for [Gitter](https://gitter.im) service that calculates arithmetic expressions.
Task for [UA Web Challenge VII](http://uawebchallenge.com/) (Front-End Developer nomination, qualifying stage).
## How to use
Expression should be posted as a message in Gitter chat room starting with ```calc```. Allowed operators: ```()```, ```*```, ```/```, ```+```, ```-```. For example:
```
calc (2 + 2) * 0.2
```
## How to launch
```
$ npm install
$ node index.js [token=yourGitterToken] [room=pathToRoom]
```
If Gitter token and room ID values aren't passed via command line options they will be taken from [config.js](https://github.com/undeletable/gitter-calc-bot/blob/master/config.js) file.