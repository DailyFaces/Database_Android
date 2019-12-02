const connection = require('../system/db_connection')
let Response = require("../helpers/response");
let response = new Response(); //response object
let feeds_delete = (req, res) => {
    const id = req.body.id;
    const deleted_at = new Date().toISOString();
    const updated_at = new Date().toISOString();
    let deleteStmt = "UPDATE `feeds` SET     updated_at = '" + updated_at + "',`deleted_at`='" + deleted_at +"' WHERE `id`='" +
    id + "'";;
    connection.query(deleteStmt, function (error, results, fields) {
        if (error) {
            response.setRespose(null, { message: "Error encountered!!!", body: error }, new Date().toISOString());
            return res.status(404).send(response);
        } else {
            response.setRespose({ message: "Success!!!.", details: results }, null, new Date().toISOString());
            return res.status(200).send(response);
        }
    });
}
module.exports = { feeds_delete }
