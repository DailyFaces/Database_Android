const connection = require('../system/db_connection')
let feeds_update = (req, res) => {
    const updated_at = new Date().toISOString();
    let updateStmt1 =
        "SELECT `details` FROM `feeds` WHERE `account_id`='" +
        req.headers.acc +
        "' and `type`='" +
        req.headers.type +
        "'";
    let updateStmt2 = "UPDATE `feeds` SET `details`='" + req.headers.new_details + "',`updated_at`='" + updated_at + "' WHERE `account_id`='" + req.headers.acc + "'";
    connection.query(updateStmt1, function (error, results1, fields) {
        if (results1[0] == 0) {
            res.status(401).send(error);
            return;
        } else {
            connection.query(updateStmt2, function (error, results2, fields) {
                if (results2[0] == undefined) {
                    res.status(200).json({
                        message: "Feeds successfully updated!"
                    });
                }
            });
        }

    });
}
module.exports = { feeds_update }