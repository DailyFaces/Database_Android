const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../config');
let Response = require("../helpers/response");
let response = new Response(); //response object
var connection = require('../system/db_connection');

let auth = (req, res) => {
    const username = req.body.username;
    const type = req.body.type;
    let stmt = `SELECT 'password' FROM 'accounts' WHERE 'username'= '${username}' and 'type'= '${type}'`;
    connection.query(stmt, (error, results, fields) => {
        if (error) {
            response.setRespose(null, err, new Date().toISOString())
            return res.status(401).send(response);
        }
        if (!results.length) { //length == 0 since it is an array
            response.setRespose(null, { message: "Validation failed. Given username and password aren't matching." }, new Date().toISOString());
            return res.status(404).send(response);

        } else {
            if (bcrypt.compareSync(req.body.password, results[0].password)) {
                var token = jwt.sign({
                    username: username
                }, config.secret, {
                    expiresIn: '12h' // expires in 24 hours
                })

                response.setRespose({
                    success: true,
                    message: "Validation successful.",
                    token: token
                }, null, new Date().toISOString());
                return res.send(response);
            } else {
                response.setRespose(null, { message: "Validation failed. Given username and password aren't matching." }, new Date().toISOString());
                return res.status(404).send(response);
            }
        }
    });
}

module.exports = { auth }