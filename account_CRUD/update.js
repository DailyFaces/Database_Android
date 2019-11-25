const connection =require('../system/db_connection')
const bcrypt = require("bcryptjs");
const config = require('../config');const app = require("express")();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let update = (req, res) => {
	const username = req.body.username;
  const hash = bcrypt.hashSync(req.body.newpassword, 10);
  const updated_at = new Date().toISOString();

  let stmt1 =
    "SELECT `password` FROM `accounts` WHERE `username`='" +
    username +
    "'";
  let stmt2 =
    "UPDATE `accounts` SET `password`='" +
    hash +
    "',`updated_at`='" +
    updated_at +
    "' WHERE `username`='" +
    username +
    "'";
  connection.query(stmt1, function(error, results1, fields) {
    if (error) {
      res.status(401).send(error);
      return;
    }
    if (results1[0] == undefined) {
      res.status(401).json({
        message: "Invalid username!"
      });
    } else {
      if (bcrypt.compareSync(req.body.password, results1[0].password)) {
        connection.query(stmt2, function(error, results2, fields) {
          if (error) {
            res.status(401).send(error);
            return;
          }
          if (results2[0] == undefined) {
            res.status(200).json({
              message: "Successfully updated!"
            });
          }
        });
      } else {
        res.status(401).json({
          message: "Incorrect password!"
        });
      }
    }
  });
}

module.exports = {update}