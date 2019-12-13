//config db connection
var connection = require('../system/db_connection');
let Response = require("../helpers/response");
let response = new Response(); //response object

let delete_ms_messages = (req, res) => {
    const deleted_at = new Date().toISOString();

    let stmt2 =
        `UPDATE ms_messages SET deleted_at='${deleted_at}'` ;

    connection.query(stmt2, (error, results) => {
        if (error) {
            response.setRespose(null, { message: "An error occured!", err: error }, new Date().toISOString());
            return res.status(401).json(response);

        }
        if (results[0] == undefined) {
            response.setRespose({ message: "Successfully deleted!" }, null, new Date().toISOString());
            return res.status(200).json(response);
        }
    });
}

module.exports = { delete_ms_messages }