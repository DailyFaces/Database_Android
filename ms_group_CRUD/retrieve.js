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
            return res.status(200).send(response);
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
                    return res.status(401).send({ message: "An error occured!", err: error });
                }

                //all ms_groups
                data.ms_groups = results
                if (data.ms_groups.length != 0) {
                    // response.setRespose({ message: "Active ms_groups Successfully Retrieved! Here", data }, null, new Date().toISOString());
                    //member in group
                    //loop all ms_group
                    // let ms_groups_id;
                    // let stmt_ms_group_members = `SELECT * FROM ms_members WHERE id = '${ms_groups_id}'`

                    data.ms_groups.forEach((element, index) => {
                        console.log("ele");
                        console.log(element.id);
                        console.log("end");

                        let stmt_ms_group_members = `SELECT * FROM ms_members WHERE ms_group_id = '${element.id}'`
                        var tempMembers = [];
                        connection.query(stmt_ms_group_members, (error1, members) => {
                            if (error1) {
                                console.log(error1);

                            }
                            else {
                                console.log("meme");
                                console.log(members);
                                tempMembers = members
                            }
                            data.ms_groups[index]['ms_members'] = tempMembers;

                            console.log(data);

                            return res.send({ message: "Active ms_groups Successfully Retrieved! Here", data: data });
                        })
                    });

                }

                else {
                    // response.setRespose(null, { message: "No Group Exist!", data: data }, new Date().toISOString());
                    return res.status(200).send({ error: false, message: "No Group Exist!", data: data });
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
                    return res.status(401).send({ message: "An error occured!", err: error });
                }
                //all ms_groups
                data.ms_groups = results
                if (data.ms_groups.length != 0) {
                    return res.status(200).send(
                        { message: "Active ms_groups Successfully Retrieved! Here", data: data }
                    );
                }
                else {
                    // response.setRespose(null, { message: "No Group Exist!", data: data }, new Date().toISOString());
                    return res.status(200).send({ error: false, message: "No Group Exist!", data: data });
                }
            });
            return;
        }
    });


}
module.exports = { all_retrieve_ms_group, retrieve_ms_group, retrieve_ms_groups }