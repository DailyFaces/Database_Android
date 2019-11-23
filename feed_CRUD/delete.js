const connection = require('../system/db_connection')
let feeds_delete = (req, res) => {
    const username = req.headers.username;
    const deleted_at = new Date().toISOString();
    let deleteStmt = "UPDATE `feeds` SET `deleted_at`='" +
        deleted_at +
        "' WHERE `username`='" +
        username +
        "'";
    connection.query(deleteStmt, function (error, results2, fields) {
        if (error) {
            res.status(401).send(error);
            return;
        }
        if (results2[0] == undefined) {
            res.status(200).json({
                message: "Feed successfully deleted!"
            });
        }
    });
}
module.exports = { feeds_delete }
