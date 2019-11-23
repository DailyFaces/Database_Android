const connection = require('../system/db_connection')
const created_at = new Date().toISOString()
let feeds_create = (req, res) => {
    let createStmt = "INSERT INTO `feeds` (`account_id`,`details`,`type`,`created_at`) VALUES('" + req.headers.id + "','" + req.headers.details + "','" + req.headers.type + "','" +
        created_at + "')"
    connection.query(createStmt, function (error, results, fields) {
        if (error)
            throw error;
        res.send("Posted By Id #: " + req.headers.account + "\nPost Details: " + req.headers.details);
        return;
    })
}
module.exports = { feeds_create }