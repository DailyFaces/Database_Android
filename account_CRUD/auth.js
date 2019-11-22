const connection =require('../system/db_connection')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../config');

let auth =  (req, res) => {
	const username = req.headers.username;
  const type = req.headers.type;

  let stmt =
    "SELECT `password` FROM `accounts` WHERE `username`='" +
    username +
    "' and `type`='" +
    type +
    "'";
  connection.query(stmt, function(error, results, fields) {
    if (error) {
      res.status(401).send(error);
      return;
    }
    if (results[0] == undefined) {
      res.status(401).json({
        message: "Validation failed. Given username and password aren't matching."
      });
    } else {
      if (bcrypt.compareSync(req.headers.password, results[0].password)) {
        var token = jwt.sign({
          username : username
        }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        })
        res.status(200).json({
          success: true,
          message : "Validation successful.",
          token : token
        });
      } else {
        res.status(401).json({
          message: "Validation failed. Given username and password aren't matching."
        });
      }
    }
  });
}

module.exports = {auth}