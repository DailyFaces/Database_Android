//config db connection
var connection = require('../system/db_connection');
let Response = require("../account_CRUD/helpers/response");
let response = new Response(); //response object

let create_ms_message = (req, res) => {
    const ms_group_id = req.body.id;
    const account_id = req.body.account_id;
    const message = req.body.message;
    const created_at = new Date().toISOString();

    let stmt =
        "INSERT INTO `ms_messages`(`ms_group_id`,`account_id`, `message`, `created_at`) VALUES ('" +
        ms_group_id +
        "','" +
        account_id +
        "','" +
        message +
        "','" +
        created_at +
        "')";

    connection.query(stmt, (error, results) => {
        if (error) {
            response.setRespose(null, { message: "An error occured!", err: error }, new Date().toISOString());
            return res.status(401).json(response);
        }
        if (results[0] == undefined) {
            response.setRespose({ message: "ms_message Successfully Added!" },null, new Date().toISOString());
            return res.status(200).json(response);
        }
    });
}

module.exports = { create_ms_message }