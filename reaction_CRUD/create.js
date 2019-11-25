// account_id	feed_id	type	created_at	updated_at	deleted_at
const connection = require('../system/db_connection')
const created_at = new Date().toISOString()
let feeds_create = (req, res) => {
    let createStmt = "INSERT INTO `reactions` (`account_id`,`feed_id`,`type`,`created_at`) VALUES('" + req.headers.id + "','" + req.headers.feedId + "','" + req.headers.type + "','" +
        created_at + "')"
    connection.query(createStmt, function (error, results, fields) {
        if (error)
            throw error;
        res.send("Reaction successfully inserted!!!");
        return;
    })
}
module.exports = { feeds_create }