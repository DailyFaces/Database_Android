const connection =require('../system/db_connection')
const app = require("express")();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../config');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var account = {};

let auth =  (req, res) => {
	const username = req.body.username;

  let stmt =
    "SELECT `id`, `password` FROM `accounts` WHERE `username`='" +
    username +
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
      if (bcrypt.compareSync(req.body.password, results[0].password)) {
        connection.query("SELECT * FROM `accounts` WHERE `id` = '" +results[0].id+"'", function(error, user, fields) {
          if (error) {
            res.status(401).json({
              error : error,
              data : null,
            });
            return
          }
          if (user[0] == undefined) {
            res.status(401).json({
              error : error,
              data : null,
              message : "No results found."
            })
          } else {
            jwt.sign({
              user
            }, config.secret, {
              expiresIn: 86400 // expires in 24 hours
            }, (err, token) => {
              if (err) { console.log(err)}
              res.status(200).json({
                success: true,
                message : "Validation successful.",
                token : token
              });
            })
          }
        })
      } else {
        res.status(401).json({
          error : error,
          data : null,
          message: "Validation failed. Given username and password aren't matching."
        });
      }
    }
  });
}

module.exports = {auth}