const connection = require('../system/db_connection')
const created_at = new Date().toISOString()
let Response = require("../helpers/response");
let response = new Response(); //response object
let feeds_create = (req, res) => {
    let createStmt = "INSERT INTO `feeds` (`account_id`,`details`,`type`,`created_at`) VALUES('" + req.body.id + "','" + req.body.details + "','" + req.body.type + "','" +
        created_at + "')"
        console.log(req.body)
    connection.query(createStmt, function (error, results, fields) {
        if (error) {
            response.setRespose(null, { message: "Error encountered!!!", body: error }, new Date().toISOString());
            return res.status(404).send(response);
        } else {
            response.setRespose({ message: "Success!!!.", details: results }, null, new Date().toISOString());
            return res.status(200).send(response);
        }
    })
}
module.exports = { feeds_create }