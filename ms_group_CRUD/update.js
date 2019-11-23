//config db connection
const connection = require('../system/db_connection')

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


  connection.query(stmt, function (error, results, fields) {
    if (error) {
      res.status(401).json({
        message: error
      });
      return;
    }
    if (results[0] == undefined) {
      results.message = "ms_groups_ Successfully Updated!"
      res.status(200).json({
        data: results,
      });
    }
  });
}

module.exports = { update_ms_group }