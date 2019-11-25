const connection = require('../system/db_connection')
let feeds_retrieve=(req,res)=>{
    let stmt = "SELECT * FROM feeds WHERE `deleted_at` IS NULL"
    let stmt2 ="Select e.id, u.id, e.details, e.created_at FROM feeds AS e JOIN accounts AS u ON e.account_id = u.id"
    connection.query(stmt2, function (error, results, fields) {
        if (error)
            throw error;
        res.send(results);
        return;
    });
}
module.exports ={feeds_retrieve}