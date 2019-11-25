var Pusher = require('pusher');

var pusher = new Pusher({
    appId: '901639',
    key: '0635cce56c05162df332',
    secret: 'dc270faf64d20b5d72f4',
    cluster: 'eu',
    encrypted: true
});

module.exports = pusher