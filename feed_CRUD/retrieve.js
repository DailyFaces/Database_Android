const connection = require('../system/db_connection')
let Response = require("../helpers/response");
let response = new Response(); //response object
let feeds_retrieve=(res)=>{
    let stmt2 ="Select e.id, u.id, e.details, e.created_at FROM feeds AS e JOIN accounts AS u ON e.account_id = u.id WHERE e.deleted_at IS NULL"
    connection.query(stmt2, function (error, results, fields) {
        if (error) {
            response.setRespose(null, { message: "Error encountered!!!", body: error }, new Date().toISOString());
            return res.status(404).send(response);
        } else {
            response.setRespose({ message: "Success!!!.", details: results }, null, new Date().toISOString());
            return res.status(200).send(response);
        }
    });
}
module.exports ={feeds_retrieve}