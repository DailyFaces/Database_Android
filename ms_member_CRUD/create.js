//config db connection
const connection = require('../system/db_connection')

let create_ms_member = (req, res) => {
    const ms_group_id = req.params.id;
    const account_id = req.body.account_id;
    const status = req.body.status;
    const created_at = new Date().toISOString();

    let stmt =
        "INSERT INTO `ms_members`(`ms_group_id`,`account_id`, `status`, `created_at`) VALUES ('" +
        ms_group_id +
        "','" +
        account_id +
        "','" +
        status +
        "','" +
        created_at +
        "')";

    connection.query(stmt, (error, results) => {
        if (error) {
            res.status(401).json({
                message: error
            });
            return;
        }
        if (results[0] == undefined) {
            results.message = "ms_member Successfully registered!"
            res.status(200).json({
                data: results,
            });
        }
    });
}

module.exports = { create_ms_member }