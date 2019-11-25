const connection =require('../system/db_connection')

let retrieve = (req, res) => {
	const account_id = req.headers.account_id;

  let stmt =
    "SELECT * FROM `accounts_informations` WHERE `account_id`='" +
    account_id +
    "'";

  connection.query(stmt, function(error, results, fields) {
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

module.exports = {retrieve}