const connection = require('../system/db_connection')
let Response = require("../helpers/response");
let response = new Response(); //response object
let reactions_retrieve = (req, res) => {
    let retrieve = "select reaction.id, reaction.feed_id, reaction.account_id, account.username, reaction.type, reaction.created_at FROM accounts AS account JOIN reactions AS reaction ON account.id = reaction.id WHERE reaction.deleted_at IS NULL"
    connection.query(retrieve, function (error, results, fields) {
        if (error) {
            response.setRespose(null, { message: "Error encountered!!!", body: error }, new Date().toISOString());
            return res.status(404).send(response);
        } else {
            response.setRespose({ message: "Success!!!.", details: results }, null, new Date().toISOString());
            return res.status(200).send(response);
        }
    });
}
module.exports = { reactions_retrieve }