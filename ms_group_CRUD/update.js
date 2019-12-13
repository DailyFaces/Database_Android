//config db connection
var connection = require('../system/db_connection');
let Response = require("../helpers/response");
let response = new Response(); //response object

let update_ms_group = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const updated_at = new Date().toISOString();

  let stmt =
    "UPDATE `ms_groups` SET `title`='" +
    title +
    "',`updated_at`='" +
    updated_at +
    "' WHERE `id`='" +
    id + "'";

  connection.query(stmt, (error, results) => {
    if (error) {
      response.setRespose(null, { message: "An error occured!", err: error }, new Date().toISOString());
      return res.status(401).json(response);
    }
    if (results[0] == undefined) {
      response.setRespose({ message: "ms_groups_ Successfully Updated!", err: error }, null, new Date().toISOString());
      return res.status(200).json(response);
    }
  });
}

module.exports = { update_ms_group }