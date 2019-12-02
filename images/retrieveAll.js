const connection =require('../system/db_connection')

const retrieve = (req, res) => {
    var sql = "SELECT * from `accounts`, `images` WHERE accounts.id = images.account_id";
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