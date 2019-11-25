const connection = require('../system/db_connection')
let feeds_delete = (req, res) => {
    const id = req.headers.id;
    const deleted_at = new Date().toISOString();
    let deleteStmt = "UPDATE `feeds` SET `deleted_at`='" +
    deleted_at +
    "' WHERE `id`='" +
    id +
    "'";;
    connection.query(deleteStmt, function (error, results2, fields) {
        if (error)
            throw error;
        res.send(results2);
        return;
    });
}
module.exports = { feeds_delete }
