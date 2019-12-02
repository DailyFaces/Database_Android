const connection =require('../system/db_connection')

const retrieve = (req, res) => {
    var sql = "SELECT * from `accounts`, `feed_images` WHERE accounts.id = feed_images.account_id";
    connection.query(sql, function (err, rows) {
        if (err) {
            res.send(err)
        } else {
            console.log(rows)
            res.send(rows);
        }
    })
}

module.exports = {retrieve}