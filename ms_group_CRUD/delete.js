const connection = require('../system/db_connection')

let delete_ms_group = (req, res) => {
    const id = req.params.id;
    const deleted_at = new Date().toISOString();

    let stmt2 =
        "UPDATE `ms_groups` SET `deleted_at`='" +
        deleted_at +
        "' WHERE `id`='" +
        id +
        "'";

    connection.query(stmt2, (error, results) => {
        if (error) {
            res.status(401).send(error);
            return;
        }
        if (results[0] == undefined) {
            results.message = "Successfully deleted!"
            res.status(200).json({
                data: results
            });
        }
    });
}

module.exports = { delete_ms_group }