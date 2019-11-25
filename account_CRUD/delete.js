const connection = require('../system/db_connection')
const bcrypt = require("bcryptjs");

let account_delete = (req, res) => {
  const username = req.headers.username;
  const deleted_at = new Date().toISOString();
  const updated_at = deleted_at;

  let stmt2 =
    "UPDATE `accounts` SET `deleted_at`='" +
    deleted_at + "' and `updated_at` = '" + updated_at +
    "' WHERE `username`='" +
    username +
    "'";
  connection.query(stmt2, function (error, results2, fields) {
    if (error) {
      res.status(401).send(error);
      return;
    }
    if (results2[0] == undefined) {
      connection.query("SELECT * FROM `accounts` WHERE `username`='" +username +"'", function(error, results, fields) {
        if (error) {
          res.status(401).send(error);
          return;
        }
        if (results[0] == undefined) {
          res.status(401).json({
            success: false        
          });
        } else {
          res.status(200).send(results[0])
        }
      });
    }
  });
}

module.exports = { account_delete }