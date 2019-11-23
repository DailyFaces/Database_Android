//config db connection
const connection = require('../system/db_connection')

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

  connection.query(stmt, function (error, results, fields) {
    if (error) {
      res.status(401).json({
        message: error
      });
      return;
    }
    if (results[0] == undefined) {
      results.message = "ms_groups_ Successfully registered!"
      res.status(200).json({
        data: results,
      });
    }
  });
}

module.exports = { create_ms_group }