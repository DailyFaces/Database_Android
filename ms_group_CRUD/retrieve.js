//config db connection
var connection = require('../system/db_connection');
// let Response = require("../account_CRUD/helpers/response");
// let response = new Response(); //response object


//all created group chat
let all_retrieve_ms_group = (req, res) => {

    // let stmt = "SELECT * FROM `ms_groups`"
    let stmt = "SELECT m.id, a.username, a.type, m.title FROM `ms_groups` AS m JOIN accounts AS a ON a.id = m.account_id"

    connection.query(stmt, (error, results) => {
        if (error) {
            response.setRespose(null, { message: "An error occured!", err: error }, new Date().toISOString());
            return res.status(401).send(response);
        }
        if (results.length != 0) {
            response.setRespose({ message: "All_ms_groups_ Successfully Retrieved!", data: results }, null, new Date().toISOString());
            return res.send(response);
        }
    });
}

//active group chats
let retrieve_ms_groups = (req, res) => {
    console.log(req.body);

    let account_id = req.body.account_id
    let data = {}
    let stmt_ms_accounts = "SELECT username,email,type FROM `accounts`"
    connection.query(stmt_ms_accounts, (error, users) => {
        if (error) {
            data.ms_users = null
            return;
        }
        else {
            data.ms_users = users
            let stmt_ms_group = `SELECT mg.* FROM ms_groups AS mg LEFT JOIN ms_members AS mm ON mm.account_id = mg.account_id WHERE mg.account_id = '${account_id}'`
            connection.query(stmt_ms_group, (error, results) => {
                if (error) {
                    data.ms_groups = error
                    // response.setRespose(null, { message: "An error occured!", err: error }, new Date().toISOString());
                    return res.send({ message: "An error occured!", err: error });
                }

                //all ms_groups
                data.ms_groups = results

                if (results.length != 0) {
                    //get users in specific group
                    let stmt_ms_group_members = `SELECT * FROM ms_members `
                    connection.query(stmt_ms_group_members, (error, members) => {
                        // data.ms_members = members;
                        //check ms_group_id of ms_members
                        tempMembers = []
                        members.forEach(ms_member => {
                            data.ms_groups.forEach(ms_group => {
                                ms_group["ms_member"] = []
                                if (ms_member.ms_group_id == ms_group.id) {
                                    ms_group["ms_member"].push(ms_member)
                                    return;
                                }
                            });
                        });
                        // data.ms_groups = results
                        // return res.send({ data: members });
                        return res.send({ message: "Active ms_groups Successfully Retrieved! Here", data: data });

                    })


                    // return res.send({ message: "Active ms_groups Successfully Retrieved! Here", data: data });
                }

                else {
                    // response.setRespose(null, { message: "No Group Exist!", data: data }, new Date().toISOString());
                    return res.send({ error: false, message: "No Group Exist!", data: data });
                }
            });
            return;
        }
    });


}


//active group chats
let retrieve_ms_group = (req, res) => {
    console.log(req.body);
    let account_id = req.body.account_id
    let data = {}
    let stmt_ms_accounts = "SELECT username,email,type FROM `accounts`"
    connection.query(stmt_ms_accounts, (error, users) => {
        if (error) {
            data.ms_users = null
            return;
        }
        else {
            data.ms_users = users
            let stmt_ms_group = `SELECT mg.* FROM ms_groups AS mg LEFT JOIN ms_members AS mm ON mm.account_id = mg.account_id WHERE mg.account_id = '${account_id}'`
            connection.query(stmt_ms_group, (error, results) => {
                if (error) {
                    data.ms_groups = error
                    // response.setRespose(null, { message: "An error occured!", err: error }, new Date().toISOString());
                    return res.send({ message: "An error occured!", err: error });
                }
                //all ms_groups
                data.ms_groups = results
                if (data.ms_groups.length != 0) {
                    return res.send(
                        { message: "Active ms_groups Successfully Retrieved! Here", data: data }
                    );
                }
                else {
                    // response.setRespose(null, { message: "No Group Exist!", data: data }, new Date().toISOString());
                    return res.send({ error: false, message: "No Group Exist!", data: data });
                }
            });
            return;
        }
    });


}
module.exports = { all_retrieve_ms_group, retrieve_ms_group, retrieve_ms_groups }