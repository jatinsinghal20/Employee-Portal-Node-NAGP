var events = require('events');
var eventEmitter = new events.EventEmitter();

var sendCloseProjectNotification = function (id) {
   console.log('Closing the project opening for id ' + id);
}

var sendProjectApplicationtNotification = function (id, user) {
   console.log(user + ' applied for the project opening ' + id);
}

registerEvents = function () {
   eventEmitter.on('closeProject', sendCloseProjectNotification);
   eventEmitter.on('applyForProject', sendProjectApplicationtNotification);
}

module.exports = {
   registerEvents,
   eventEmitter
}