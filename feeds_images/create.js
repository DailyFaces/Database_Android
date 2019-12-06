const connection =require('../system/db_connection')

const create = (req, res) => {
    let url = '/images/' + req.body.filename;
    var sql = "INSERT INTO `feed_images`(`account_id`, `feed_id`, `url`,` created_at`, `updated_at`) VALUES ('"+req.body.account_id+"','"+req.body.feed_id+"','" + url + "','" + new Date().toISOString() + "','" + new Date().toISOString() + "')";
    connection.query(sql, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    })
}

module.exports = {create}