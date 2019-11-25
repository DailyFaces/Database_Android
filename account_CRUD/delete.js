let account_delete = (req, res) => {
    const username = req.headers.username;
    const type = req.headers.type;
    const deleted_at = new Date().toISOString();

    let stmt2 = `UPDATE 'accounts' SET 'deleted_at' = '${deleted_at}' WHERE 'username' = '${username}'`
    connection.query(stmt2, function(error, results2, fields) {
        if (error) {
            res.status(401).send(error);
            return;
        }
        if (results2[0] == undefined) {
            res.status(200).json({
                message: "Successfully deleted!"
            });
        }
    });
}

module.exports = { account_delete }