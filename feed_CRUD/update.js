const connection = require('../system/db_connection')
let feeds_update = (req, res) => {
    const updated_at = new Date().toISOString();
    let sql = "UPDATE feeds SET details = '" + req.headers.new_details + "',`updated_at`='" + updated_at + "' WHERE id = '" + req.headers.id + "'";
    connection.query(sql, function (error, results1, fields) {
        if (error)
            throw error;
        res.send("Feeds successfully updated!!!\n"+ results1);
        return;
    });
}
module.exports = { feeds_update }