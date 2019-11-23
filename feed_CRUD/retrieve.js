const connection = require('../system/db_connection')
let feeds_retrieve=(req,res)=>{
    let stmt = "SELECT * FROM feeds"
    connection.query(stmt, function (error, results, fields) {
        if (error)
            throw error;
        res.send(results);
        return;
    });
}
module.exports ={feeds_retrieve}