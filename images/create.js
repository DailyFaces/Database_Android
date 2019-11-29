const connection =require('../system/db_connection')

const create = (req, res) => {
    let url = '/images/' + req.file.filename;
    var sql = "INSERT INTO `images`(`account_id`,`url`,`created_at`, `updated_at`) VALUES ('"+req.body.account_id+"','" + url + "','" + new Date().toISOString() + "','" + new Date().toISOString() + "')";
    connection.query(sql, function (err, rows) {
        if (err) {
            res.send(err)
        } else {
            console.log(rows)
            res.send(rows);
        }
    })
}

module.exports = {create}