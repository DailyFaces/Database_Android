var Pusher = require('pusher');

let pusher = (data) => {
    var pusher = new Pusher({
        appId: 'APP_ID',
        key: 'APP_KEY',
        secret: 'APP_SECRET',
        cluster: 'APP_CLUSTER'
    });

    pusher.trigger('my-channel', 'my-event', data);
}

module.exports = { pusher }