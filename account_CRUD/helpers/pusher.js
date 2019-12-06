var Pusher = require('pusher');

let pusher = (data) => {
    var pusher = new Pusher({
        appId: '900069',
        key: '5e71cf67fedab567924b',
        secret: '55191581d3346b071963',
        cluster: 'ap1'
    });

    pusher.trigger('chat-channel-notification', 'chats', data);
}

module.exports = { pusher }