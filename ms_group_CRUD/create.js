//config db connection
var connection = require('../system/db_connection');
let Response = require("../account_CRUD/helpers/response");
let response = new Response(); //response object


let create_ms_group = (req, res) => {
  const account_Id = req.params.id;
  const title = req.body.title;
  const created_at = new Date().toISOString();

  let stmt =
    "INSERT INTO `ms_groups`(`account_Id`, `title`, `created_at`) VALUES ('" +
    account_Id +
    "','" +
    title +
    "','" +
    created_at +
    "')";

  connection.query(stmt, (error, results) => {
    if (error) {
      response.setRespose(null, { message: "An error occured!" }, new Date().toISOString());
      return res.status(401).json(response);
    }
    if (results[0] == undefined) {
      response.setRespose({ message: "ms_groups_ Successfully registered!" }, null, new Date().toISOString());
      return res.status(200).json(response);
    }
  });
}

module.exports = { create_ms_group }