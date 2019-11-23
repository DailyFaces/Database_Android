//config db connection
const connection = require('../system/db_connection')
//all created group chat
let all_retrieve_ms_group = (req, res) => {

    let stmt = "SELECT * FROM `ms_groups`"

    connection.query(stmt, function (error, results, fields) {
        if (error) {
            res.status(401).json({
                message: error
            });
            return;
        }
        if (results.length != 0) {
            res.status(200).json({
                message: "All_ms_groups_ Successfully Retrieved!",
                data: results
            });
        }
    });
}
//active group chats
let retrieve_ms_group = (req, res) => {
    let stmt = "SELECT * FROM `ms_groups`"
    connection.query(stmt, function (error, results, fields) {
        if (error) {
            res.status(401).json({
                message: error
            });
            return;
        }
        let filtered_results = []
        results.forEach(data => {
            if (data.deleted_at == null) {
                filtered_results.push(data);
            }
        });

        if (filtered_results.length != 0) {
            res.status(200).json({
                message: "Active ms_groups Successfully Retrieved!",
                data: filtered_results
            });
        }
    });
}


module.exports = { all_retrieve_ms_group, retrieve_ms_group }