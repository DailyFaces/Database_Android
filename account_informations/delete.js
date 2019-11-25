const connection = require('../system/db_connection')

let remove = (req, res) => {
    const account_id = req.params.account_id;
    const deleted_at = new Date().toISOString();
    const updated_at = deleted_at;

    let stmt =
        "UPDATE `accounts_informations` SET `deleted_at`='" +
        deleted_at +
        "', `updated_at`='" +
        updated_at +
        "' WHERE `account_id`='" +
        account_id +
        "'";
    connection.query(stmt, function (error, results, fields) {
        if (error) {
            res.status(401).send(error);
            return;
        }
        if (results[0] == undefined) {
            connection.query("SELECT * FROM `accounts_informations` WHERE `account_id`='"+ account_id +"'", function(error, results, fields) {
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

module.exports = {remove}