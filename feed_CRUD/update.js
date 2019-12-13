const connection = require('../system/db_connection')
let Response = require("../helpers/response");
let response = new Response(); //response object
let feeds_update = (req, res) => {
    const updated_at = new Date().toISOString();
    let sql = "UPDATE feeds SET details = '" + req.body.new_details + "',`updated_at`='" + updated_at + "' WHERE id = '" + req.body.id + "'";
    connection.query(sql, function (error, results, fields) {
        if (error) {
            response.setRespose(null, { message: "Error encountered!!!", body: error }, new Date().toISOString());
            return res.status(404).send(response);
        } else {
            response.setRespose({ message: "Success!!!.", details: results }, null, new Date().toISOString());
            return res.status(200).send(response);
        }
    });
}
module.exports = { feeds_update }