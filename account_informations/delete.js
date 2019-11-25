const connection = require('../system/db_connection')

let remove = (req, res) => {
    const account_id = req.params.account_id;
    const deleted_at = new Date().toISOString();

    let stmt =
        "UPDATE `accounts_informations` SET `deleted_at`='" +
        deleted_at +
        "' WHERE `account_id`='" +
        account_id +
        "'";
    connection.query(stmt, function (error, results, fields) {
        if (error) {
            res.status(401).send(error);
            return;
        }
        if (results[0] == undefined) {
            res.status(200).json({
                message: "Successfully deleted!"
            });
        }
    });
}

module.exports = {remove}