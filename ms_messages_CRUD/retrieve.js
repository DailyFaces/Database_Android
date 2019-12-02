//config db connection
var connection = require('../system/db_connection');
let Response = require("../account_CRUD/helpers/response");
let response = new Response(); //response object


//all created group chat
let all_retrieve_ms_message = (req, res) => {

    let stmt = `SELECT * FROM ms_messages`
    // let stmt = "SELECT * FROM `ms_groups` JOIN accounts AS a ON a.id = ms_groups.account_id"

    connection.query(stmt, (error, results) => {
        if (error) {
            response.setRespose(null, { message: "An error occured!", err: error }, new Date().toISOString());
            return res.status(401).json(response);
        }
        if (results.length != 0) {
            response.setRespose({ message: "All ms_message Successfully Retrieved!", data: results }, null, new Date().toISOString());
            return res.status(200).json(response);
        }
    });
}

//active group chats
let retrieve_ms_message = (req, res) => {
    let stmt = "SELECT * FROM `ms_messages`"
    connection.query(stmt, (error, results) => {
        if (error) {
            response.setRespose(null, { message: "An error occured!", err: error }, new Date().toISOString());
            return res.status(200).json(response);
        }
        let filtered_results = []
        results.forEach(data => {
            if (data.ms_group_id == req.body.ms_group_id) {
                if (data.deleted_at == null) {
                    filtered_results.push(data);
                }
            }
        });

        if (filtered_results.length != 0) {
            response.setRespose({ message: "Active ms_message Successfully Retrieved!", data: filtered_results }, null, new Date().toISOString());
            return res.status(200).json(response);
        }
        else {
            response.setRespose({ message: "NO Active ms_message Retrieved!", data: filtered_results }, null, new Date().toISOString());
            return res.status(200).json(response);
        }
    });
}


module.exports = { all_retrieve_ms_message, retrieve_ms_message }