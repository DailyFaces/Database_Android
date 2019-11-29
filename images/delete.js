const connection =require('../system/db_connection')

const remove = (req, res) => {
    var sql = "UPDATE `images` SET `updated_at`='" + new Date().toISOString() + "',`deleted_at`='" + new Date().toISOString() + "' WHERE `id` = '" + req.body.id + "'";
    connection.query(sql, function (err, rows) {
        if (err) {
            res.send(err)
        }
        console.log(rows[0])
        res.send(rows);

    })
}

module.exports = {remove}