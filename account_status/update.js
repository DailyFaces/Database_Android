const connection = require('../system/db_connection')
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let update = (req, res) => {
    const account_id = parseInt(req.body.account_id, 10);
    const status = req.body.status;
    const updated_at = new Date().toISOString();

    let stmt1 =
        "UPDATE `accounts_status` SET `status`='" +
        status + "' and `updated_at` = '" + updated_at +
        "' WHERE `account_id`='" +
        account_id +
        "'";

    let stmt2 = "SELECT * FROM `accounts_status` WHERE `account_id`='" +
        account_id +
        "'";

    connection.query(stmt1, function (error, results1, fields) {
        if (error) {
            res.status(401).send(error);
            return;
        }
        if (results1[0] == undefined) {
            connection.query(stmt, function (error, results2, fields) {
                if (error) {
                    res.status(401).send(error);
                    return;
                }
                if (results2[0] == undefined) {
                    res.status(401).json({
                        success: false
                    });
                } else {
                    res.status(200).send(results2[0])
                }
            });
        } else {
            res.status(401).json({
                success: false
            });
        }
    });
}

module.exports = {update}