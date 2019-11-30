// account_id	feed_id	type	created_at	updated_at	deleted_at
const connection = require('../system/db_connection')
const created_at = new Date().toISOString()
const updated_at = new Date().toISOString()
let Response = require("../helpers/response");
let response = new Response(); //response object
let reactions_create = (req, res) => {
    let createStmt = `INSERT INTO reactions (account_id, feed_id , type , created_at ) VALUES (${req.body.account_id},${req.body.feedId},'${req.body.type}','${created_at}') `
    connection.query(createStmt, function (error, results, fields) {
        if (error) {
            response.setRespose(null, { message: "Error encountered!!!", body: error }, new Date().toISOString());
            return res.status(404).send(response);
        } else {
            response.setRespose({ message: "Success!!!.", details: req.body }, null, new Date().toISOString());
            return res.status(200).send(response);
        }
    })
}
let reactions_update = (req, res) => {
    // (account_id, feed_id , type , updated_at ) VALUES
    let updateStmt = `UPDATE reactions SET account_id =${req.body.account_id}, feed_id=${req.body.feedId},type='${req.body.type}',updated_at='${updated_at}' `
    connection.query(updateStmt, function (error, results, fields) {
        if (error) {
            response.setRespose(null, { message: "Error encountered!!!", body: error }, new Date().toISOString());
            return res.status(404).send(response);
        } else {
            response.setRespose({ message: "Success!!!.", details: req.body }, null, new Date().toISOString());
            return res.status(200).send(response);
        }
    })
}

let reactions_handler = (req, res) => {
    let walapa = `SELECT *  FROM reactions WHERE 'account_id' = ${req.body.account_id}  AND 'feed_id' = ${req.body.feedId}`
    connection.query(walapa, function (error, results, fields) {
        if (error) {
            response.setRespose(null, { message: "Error encountered!!!", body: error }, new Date().toISOString());
            return res.status(404).send(response);
        } else {    
            if (results.length === 0) {
                console.log("to insert");
                return reactions_create(req, res)
            } else {
                console.log("to update");
                return reactions_update(req, res);
            }
        }
    })
    // account_id, feed_id , type 
    // if naa na sya sa db update else create
}
module.exports = { reactions_handler }