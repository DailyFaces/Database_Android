const connection = require('../system/db_connection')
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let create = (req, res) => {
  const account_id = parseInt(req.body.account_id, 10);
  const status = req.body.status;
  const created_at = new Date().toISOString();

  let stmt =
    "INSERT INTO `accounts_status`(`account_id`, `status`, `created_at`) VALUES ('" +
    account_id +
    "','" +
    status +
    "','" +
    created_at +
    "')";
  connection.query(stmt, function (error, results, fields) {
    if (error) {
      res.status(401).json({
        error : error,
        data : null
      });
    }
    if (results[0] == undefined) {
      connection.query("SELECT * FROM `accounts_status` WHERE `account_id`='" + account_id + "'", function (error, results, fields) {
        if (error) {
          res.status(401).json({
            error : error,
            data : null
          });
            return;
        }
        if (results[0] == undefined) {
          res.status(401).json({
            error : error,
            data : null
          });
        } else {
          res.status(401).json({
            error : null,
            data : results[0],
            message : "Successfully created."
          });
        }
    });
    }
  });
}

module.exports = { create }