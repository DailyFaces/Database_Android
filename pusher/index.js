var Pusher = require('pusher');

var pusher = new Pusher({
    appId: '901639',
    key: '0635cce56c05162df332',
    secret: 'dc270faf64d20b5d72f4',
    cluster: 'eu',
    encrypted: true
});

// feed - create
global.broadcast_create_post = (post) => {
    pusher.trigger('daily-faces', 'new-post', post);
}

// feed - delete
global.broadcast_delete_post = () => {
    pusher.trigger('daily-faces', 'delete-post', null);
}

// feed - update
global.broadcast_update_post = () => {
    pusher.trigger('daily-faces', 'update-post', null);
}
