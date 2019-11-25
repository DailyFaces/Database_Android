//config db connection
const connection =require('../system/db_connection')
const bcrypt = require("bcryptjs");
const app = require("express")();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let create_account = (req,res) => {
	const username = req.body.username;
  const hash = bcrypt.hashSync(req.body.password, 10);
  const created_at = new Date().toISOString();
  const updated_at = created_at;

  let stmt =
    "INSERT INTO `accounts`(`username`, `email`, `password`, `type`, `created_at`, `updated_at`) VALUES ('" +
    username +
    "','" +
    email +
    "','" +
    hash +
    "','" +
    "user" +
    "','" +
    created_at +
    "','" +
    updated_at +
    "')";
  connection.query(stmt, function(error, results, fields) {
    if (error) {
      res.status(401).json({
        error : error,
        data : null,
        message: "Username already existed."
      });
      return;
    }
    if (results[0] == undefined) {
      connection.query(stmt, function(error, results, fields) {
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
            data : null,
            message: "Registration not successfull."
          });
        } else {
          res.send(results[0])
        }
      });
    }
  });
}

module.exports = {create_account}