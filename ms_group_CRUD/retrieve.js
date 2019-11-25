//config db connection
var connection = require('../system/db_connection');
let Response = require("../account_CRUD/helpers/response");
let response = new Response(); //response object


//all created group chat
let all_retrieve_ms_group = (req, res) => {

    let stmt = "SELECT * FROM `ms_groups`"
    // let stmt = "SELECT * FROM `ms_groups` JOIN accounts AS a ON a.id = ms_groups.account_id"

    connection.query(stmt, (error, results) => {
        if (error) {
            response.setRespose(null, { message: "An error occured!", err: error }, new Date().toISOString());
            return res.status(401).json(response);
        }
        if (results.length != 0) {
            response.setRespose({ message: "All_ms_groups_ Successfully Retrieved!", data: results }, null, new Date().toISOString());
            return res.status(200).json(response);
        }
    });
}

//active group chats
let retrieve_ms_group = (req, res) => {
    let stmt = "SELECT * FROM `ms_groups`"
    connection.query(stmt, (error, results) => {
        if (error) {
            response.setRespose(null, { message: "An error occured!", err: error }, new Date().toISOString());
            return res.status(401).json(response);
        }
        let filtered_results = []
        results.forEach(data => {
            if (data.deleted_at == null) {
                filtered_results.push(data);
            }
        });

        if (filtered_results.length != 0) {
            response.setRespose({ message: "Active ms_groups Successfully Retrieved!", data: filtered_results }, null, new Date().toISOString());
            return res.status(200).json(response);
        }
    });
}


module.exports = { all_retrieve_ms_group, retrieve_ms_group }